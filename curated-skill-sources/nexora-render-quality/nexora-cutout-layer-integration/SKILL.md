---
name: nexora-cutout-layer-integration
description: "Integrates NEXORA's alpha-tested Cutout material layer from material schema and voxel meshing through the textured renderer and CPU pixel reference, without confusing cutout with blended transparency."
---

# NEXORA Cutout Layer Integration

## Purpose

Use this workflow when adding, completing, auditing, or debugging NEXORA materials whose texels are either fully present or fully absent according to an alpha threshold: foliage, fences, grates, decals, and other masked voxel surfaces.

Cutout is not blended transparency. A passing texel behaves as opaque and writes depth; a failing texel is discarded so geometry behind it remains visible. Cutout geometry does not require back-to-front sorting and must not be routed through the transparent blend pipeline.

## Reuse before creating

- `nexora-greedy-meshing-surface-preservation` for correct render-layer routing, face preservation, and greedy merge invariants.
- `nexora-material-schema-versioning` for any threshold field, schema migration, stable material identity, and appearance hashing.
- `nexora-color-space-pipeline-contract` for sRGB color versus linear alpha semantics.
- `nexora-texture-format-fallback` and `nexora-asset-import-golden-tests` for channel/format compatibility and importer regression fixtures.
- `engine-voxel-transparency-sort-policy` for the separate blended-transparent layer; cutout itself is not sorted.
- `nexora-rhi-conformance-evidence` for backend contract, shader validation, and native pixel evidence.

This skill owns the Cutout-specific contract from alpha threshold through depth-writing draw and CPU reference. It does not replace general atlas packing, color management, material migration, or transparent sorting.

## Verified NEXORA snapshot

Re-check the active checkout before applying these facts. They describe the inspected 2026-10-30 snapshot.

- `engine/asset/src/material.rs` defines `BlendMode::Cutout` as fully opaque or fully absent per texel, decided by an alpha threshold.
- `SurfaceMaterial` stores `blend: BlendMode` and is currently schema version 3. The inspected struct has no per-material alpha-cutoff field or accessor.
- `BlendMode::occludes()` returns true only for `Opaque`. Cutout does not occlude neighbouring faces because its holes must reveal geometry behind it.
- `engine/simulation/src/surfaces.rs::layer_of_blend` maps `BlendMode::Cutout` to `RenderLayer::Cutout`; tests pin the five blend modes to three render layers.
- `engine/mesh/src/mesh.rs` defines `RenderLayer::Cutout` as alpha-tested, with no sorting required. `LayeredMesh` has a separate `cutout` mesh, and the mesher routes faces into it.
- `engine/simulation/src/surfaces.rs` tests that cutout material routing creates non-empty cutout geometry and preserves total mesh area.
- `engine/render/src/lib.rs::ChunkPass` currently owns an opaque pipeline and, for textured passes, a transparent pipeline. It has no cutout pipeline or cutout buffer in `GpuChunk`; `upload_layers` accepts only opaque and transparent vertex data.
- `ChunkPass::record` draws opaque chunks and then transparent chunks. There is no cutout draw between them in the inspected snapshot.
- The inspected `textured_wgsl` path has no alpha-threshold discard branch. The CPU pixel reference handles a transparent veil, not a cutout texel that is discarded and lets the ray continue.
- `engine/render/src/atlas.rs::mip_chain` averages alpha linearly between levels. That is valid for blended alpha, but a binary cutout threshold can lose coverage as mip levels shrink unless coverage is preserved or the trade-off is explicitly accepted.
- The module-level “Not built yet” comment in `engine/render/src/lib.rs` still groups cutout and transparent as future work, even though the transparent water path was implemented by ADR-0051. Update stale wording when the cutout pass is actually integrated.

These observations do not mean the Cutout renderer is implemented. The mesher's Cutout layer is present; the textured render path is incomplete.

## Required inputs

- Pinned NEXORA commit, toolchain, target backend, and relevant platform.
- `BlendMode`, `SurfaceMaterial`, material JSON codec/registry, texture map roles, and validation rules.
- `SurfaceTable`, `layer_of_blend`, `RenderLayer`, `LayeredMesh`, and mesher tests.
- `ChunkPass`, `GpuChunk`, `upload_layers`, `record`, textured WGSL, atlas mip generation, and CPU reference.
- Existing material fixtures, alpha-bearing source textures, and the chosen cutoff/coverage acceptance criteria.
- GPU/backend output and a reproducible scene containing both cutout and opaque geometry behind it.

## Workflow

1. **Trace the complete data path.** Follow material document → registry → `SurfaceTable` → `RenderLayer::Cutout` → `LayeredMesh.cutout` → vertex encoding → GPU upload → cutout draw → CPU reference. Identify the first missing or lossy boundary.
2. **Choose threshold ownership explicitly.** Decide whether the cutoff is one documented engine-wide constant or a per-material value. Do not invent a default silently. If per-material, update schema version, builder/accessors, JSON read/write, migrations, validation, appearance hash, fixtures, and backwards-compatibility tests.
3. **Define alpha semantics.** Specify whether equality passes (`alpha >= cutoff`) or fails, how 8-bit alpha maps to shader precision, and whether alpha comes from the albedo map or a dedicated mask. Keep alpha linear; never apply sRGB transfer to alpha.
4. **Preserve material classification.** Keep `Cutout` separate from `Opaque`, `Transparent`, `Emissive`, and `Translucent`. The mesher must route the material to the cutout mesh; do not put it in the transparent pass just because the source image has alpha.
5. **Add a dedicated textured cutout pipeline.** Use the textured atlas/bindings, alpha test/discard in the fragment shader, no source-over blending, reverse-Z depth test, and depth writes enabled for passing fragments. A failed texel must not write color or depth.
6. **Place it in the correct draw order.** Draw sky/background as designed, then opaque, then cutout, then blended transparent. Cutout fragments that pass become depth-writing opaque samples; transparent surfaces are still drawn later with depth writes disabled and their own ordering policy.
7. **Extend chunk upload ownership.** Add a separate cutout vertex buffer/count to the GPU chunk contract and validate all-or-nothing creation/cleanup. Do not flatten cutout into opaque or transparent buffers and lose the pass identity.
8. **Handle atlas mip coverage.** Measure the fraction of texels passing the cutoff at every mip. Decide whether to preserve coverage by deterministic alpha remapping, use a per-material coverage scale, or accept a documented loss. A simple arithmetic alpha average is not automatically correct for foliage silhouettes.
9. **Keep texture sampling consistent.** The current atlas uses integer `textureLoad` coordinates and no sampler. If the cutout implementation changes filtering or atlas layout, update the CPU reference and atlas isolation tests at the same time.
10. **Extend the CPU reference.** When a ray reaches a cutout surface, sample the same tile/mip/texel as the GPU. If alpha fails, continue walking; if it passes, return that surface as the opaque visible hit. Do not store cutout as a blended veil.
11. **Preserve occlusion semantics.** Cutout surfaces do not occlude neighbouring geometry at the voxel/mesher level, so faces behind holes remain available. The depth buffer decides per pixel which passing cutout or opaque fragment wins. Test both sides of asymmetric occlusion.
12. **Keep sorting responsibilities separate.** Cutout draw order does not need back-to-front sorting because passing samples write depth. Only blended transparent geometry uses the transparency-sort policy. Do not make cutout inherit DEBT-0056 behavior.
13. **Add deterministic material fixtures.** Include fully opaque alpha, fully transparent alpha, checker masks, thin leaves, narrow bars, diagonal silhouettes, and textures whose coverage is near the cutoff. Pin threshold behavior at 0, cutoff−1, cutoff, cutoff+1, and 255 for 8-bit inputs.
14. **Test mip transitions.** Render the same mask at every mip level and at distances where the chosen level changes. Detect disappearing foliage, expanding silhouettes, halos, and unstable coverage.
15. **Test geometry interactions.** Cover cutout in front of opaque, opaque in front of cutout, adjacent cutout surfaces, two materials with different thresholds if supported, chunk boundaries, and camera movement.
16. **Compare CPU and GPU pixels.** The independent CPU reference must account for discarded cutout texels and continue to the next hit. Require explicit judged-pixel coverage and channel/alpha tolerances; never count discarded or unmodelled pixels as matches.
17. **Test both NullRhi and native backend.** NullRhi validates pipeline descriptors and command ordering; a native wgpu test proves fragment discard, depth writes, and actual pixel output. Report headless and physical-GPU evidence separately.
18. **Measure cost and quality.** Record cutout draw calls, vertices, fragment overdraw, alpha-test cost, mip coverage error, and frame-time percentiles on representative foliage scenes. Compare with a transparent-blended implementation only as a measured baseline, not as a reason to change semantics.
19. **Update documentation and decisions.** Correct the stale renderer module comment, document threshold ownership and mip policy, and add/update an ADR if schema or pass contracts change.
20. **Report evidence honestly.** Separate schema tests, material validation, mesher tests, NullRhi checks, native GPU pixel tests, platform smoke tests, and unexecuted cases.

## Validation checklist

- [ ] The cutoff source, comparison rule, and 8-bit-to-shader mapping are explicit.
- [ ] Cutout stays distinct from blended transparency and opaque material classification.
- [ ] Passing fragments write depth; discarded fragments write neither color nor depth.
- [ ] The renderer draws opaque → cutout → transparent in the documented order.
- [ ] Cutout vertices are uploaded and retired with explicit ownership and cleanup.
- [ ] CPU reference continues through discarded cutout texels and agrees with GPU output.
- [ ] Mip-level alpha coverage is measured and its preservation/loss policy is documented.
- [ ] Chunk borders, adjacent cutout surfaces, opaque occlusion, and cutoff boundary values are tested.
- [ ] Material schema/hash/migration changes are covered if the cutoff is per material.
- [ ] Runtime, backend, and performance claims distinguish executed from unexecuted evidence.

## Validation matrix

| Scenario | Required invariant |
|---|---|
| Alpha 0 | Fragment is discarded; no color/depth write. |
| Alpha below cutoff | Fragment is discarded; geometry behind remains visible. |
| Alpha exactly at cutoff | Follows the documented equality rule. |
| Alpha above cutoff | Fragment is opaque for this sample and writes depth. |
| Alpha 255 | Always passes for a valid cutout material. |
| Mip transition | Coverage loss stays within declared tolerance or is preserved by policy. |
| Opaque behind cutout | Visible only through discarded cutout texels. |
| Cutout behind opaque | Hidden by the opaque depth sample. |
| Two cutout materials | Each follows its documented threshold policy. |
| Cutout plus transparent | Cutout writes depth before the transparent blend pass. |
| Chunk boundary | No missing or duplicated faces at adjacent regions. |
| CPU/GPU reference | The reference skips discarded samples and matches the rendered result. |

## Required output

Produce a Cutout integration report containing: pinned commit; threshold ownership and exact comparison; schema/migration impact; material/asset validation; layer-routing proof; cutout pipeline and depth/blend state; chunk buffer lifecycle; mip coverage measurements; CPU reference changes; NullRhi and native GPU test output; representative scene images or pixel diffs; performance/overdraw measurements; documentation/ADR updates; and unresolved risks.

## Boundaries and failure handling

- Do not treat Cutout as blended transparency; do not sort it back-to-front.
- Do not treat Cutout as fully opaque in meshing; holes must leave geometry behind available.
- Do not assume an alpha threshold exists in the current material schema; verify and design it explicitly.
- Do not use a blended pipeline with depth writes disabled for cutout fragments.
- Do not let discarded fragments write depth or hide geometry behind them.
- Do not assume averaged mip alpha preserves binary silhouette coverage.
- Do not extend the CPU reference by silently ignoring pixels that cross cutout holes.
- Do not update material schema/hash without migration and compatibility tests.
- Do not claim the Cutout renderer is implemented until a native pixel test proves the pass.

## Trigger examples

- **Positive:** Implement NEXORA foliage/leaves or grates whose alpha mask must reveal geometry behind them.
- **Positive:** Route `BlendMode::Cutout` through the textured renderer and validate depth-write behavior.
- **Positive:** Add or revise a material alpha threshold and migrate the material schema safely.
- **Positive:** Fix foliage disappearing or changing silhouette across atlas mip levels.
- **Negative:** The task concerns smooth glass/water blending or back-to-front ordering; use the transparent pass and sort-policy workflow.
- **Negative:** The task concerns atlas packing or general sRGB color management; use the dedicated atlas/color-space workflows.
