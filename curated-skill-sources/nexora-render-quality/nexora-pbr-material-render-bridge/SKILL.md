---
name: nexora-pbr-material-render-bridge
description: "Designs and validates the missing NEXORA bridge from SurfaceMaterial PBR parameters and texture-map roles to deterministic GPU material indices, voxel-face tangent frames, shader bindings, and CPU/GPU reference evidence."
---

# NEXORA PBR Material Render Bridge

## Purpose

Use this workflow when connecting NEXORA's asset/material system to the voxel renderer for normal, roughness, metallic, ambient-occlusion, or height maps, or when replacing the current stylized albedo/face-shade path with staged physically based rendering.

The material schema already describes PBR values and six map roles, but the inspected renderer currently samples only albedo. This workflow defines the missing contract between material identity, texture resources, per-vertex/per-draw material selection, shader bindings, lighting, and the independent CPU reference.

## Reuse before creating

- `nexora-material-schema-versioning` for material documents, migrations, revisions, appearance hashes, and stable identifiers.
- `nexora-color-space-pipeline-contract` for sRGB albedo versus linear data maps and mip generation.
- `nexora-shader-reflection-contract` and `engine-shader-reflection-layout-contract` for WGSL binding/vertex layout parity.
- `nexora-shader-cache-key-contract` and `nexora-shader-compile-failure-recovery` for shader variants and diagnostics.
- `nexora-rhi-conformance-evidence` for native binding, resource, backend, and pixel proof.
- `nexora-render-pass-state-contract` for pass ordering and render target ownership.
- `nexora-cutout-layer-integration` for alpha-tested material rendering; Cutout is not a PBR blending mode.
- `engine-voxel-transparency-sort-policy` for the separate blended transparent pass.
- `nexora-texture-atlas-fragmentation` and `nexora-texture-format-fallback` for atlas packing and format support.

This skill owns the NEXORA PBR material-to-renderer bridge. It does not replace material authoring, general shader reflection, texture import, or transparent ordering.

## Verified NEXORA snapshot

Re-check the active checkout before applying these facts. They describe the inspected 2026-10-30 snapshot.

- `engine/asset/src/texture.rs` defines six `MapRole` values: Albedo, Normal, Roughness, Metallic, Height, and AmbientOcclusion.
- Albedo is sRGB and naturally RGBA. All other map roles are linear; Normal is naturally RGB and the other data maps are grayscale. Only Albedo is required by `MapRole::is_required`.
- `engine/asset/src/material.rs` defines `PbrParameters`: metallic, roughness, normal_strength, and height_strength. Defaults are metallic 0, roughness 1, and both strengths 1; validation bounds metallic/roughness to 0..=1 and strengths to 0..=8.
- `SurfaceMaterial` is schema version 3. It stores material identity, category, physical scale, blend mode, PBR scalars, wanted map roles, recipe, and provenance. It does not store pixel bytes; texture maps are separate resources. The appearance hash includes PBR scalars and wanted map roles.
- `SurfaceMaterial::map_asset_id` derives stable texture asset identifiers from the material id and map role.
- `engine/simulation/src/surfaces.rs` resolves material registry handles into `SurfaceId` values and maps blend modes to render layers.
- `engine/render/src/lib.rs` currently binds one albedo atlas for the textured pass. `textured_wgsl` samples albedo, applies face-direction shade, corner AO and distance haze. It has no normal, roughness, metallic, height, or material-table binding and no PBR BRDF.
- The current vertex word packs albedo tile, face index, variant, mirror flag, and geometric corner-occlusion values. It does not carry a dedicated PBR material index.
- `textured_vertices` resolves `SurfaceId` through the albedo atlas's `FaceLook`, but the packed word contains the chosen tile rather than the material's full PBR identity.
- The current atlas is sampled with integer `textureLoad`; there is no sampler binding in the textured pass.
- `FACE_SHADE` is a stylized per-face multiplier, geometric corner AO is interpolated from vertex data, and `sky()` produces background colour/haze. Do not describe these as a complete physically based lighting environment.
- The renderer module still documents lighting as future work. No PBR runtime path was found in the inspected render crate.

These facts do not mean PBR maps are unsupported by the asset schema. They mean the renderer-to-material bridge is not implemented in this snapshot.

## Required inputs

- Pinned NEXORA commit, Rust toolchain, backend, target platform, and renderer mode.
- Material schema, JSON codec, registry, map roles, asset resolver/cache, generated texture formats, and provenance.
- `SurfaceTable`, `SurfaceId`, `textured_word`, vertex packing, `ChunkPass`, `GpuChunk`, WGSL, RHI binding descriptors, and CPU reference.
- Representative materials with known albedo, normal, roughness, metallic, AO, and height values.
- Current texture dimensions, atlas tile layout, mip chain, GPU memory budget, and fallback policy.
- Expected lighting model, colour space, normal convention, and pixel/golden reference scenes.

## Workflow

1. **Trace material identity end to end.** Map material identifier → registry handle → `SurfaceId` → `FaceLook`/atlas tile → GPU vertex or draw identity → material parameter/map lookup. Record every conversion and lifetime owner.
2. **Separate definition from resource bytes.** Keep `SurfaceMaterial` metadata in the registry and texture pixels in the asset/resource pipeline. Resolve map handles through the intended cache/resolver; do not copy large pixel arrays into material definitions.
3. **Define fallback semantics per map.** Albedo remains required. Define neutral fallbacks for absent Normal (flat tangent-space normal), Roughness (scalar material roughness), Metallic (scalar material metallic), AmbientOcclusion (neutral/no additional darkening), and Height (disabled). Missing optional maps must not bind stale handles or sample another material's tile.
4. **Choose a staged PBR scope.** Separate scalar metallic-roughness shading from normal mapping, packed data-map sampling, ambient-occlusion maps, and height/parallax. Do not introduce all six maps in one untestable shader rewrite.
5. **Design material identity for the GPU.** The current packed vertex word has no PBR material index. Choose a stable compact index in the vertex word, a separate vertex attribute, or per-material draw grouping. Prove the index maps to the same registry entry and cannot alias after registry rebuild/reload. Measure vertex bandwidth versus draw-call growth.
6. **Keep atlas roles aligned.** If using parallel atlases, the same material/tile/variant index must refer to the corresponding texel in every map. Define identical padding, tile-local mip layout, dimensions, residency, eviction, and fallback behavior. If using texture arrays/bindless resources instead, verify the RHI and target backend can express them.
7. **Preserve colour-space contracts.** Decode albedo from sRGB exactly once. Treat normal, roughness, metallic, height, and AO as linear data; never apply sRGB transfer to these maps. Generate each map's mip chain according to its semantics rather than using albedo filtering for all roles.
8. **Build voxel-face tangent frames.** Derive tangent, bitangent, and geometric normal from `Axis` and `Facing`. The frame must match the current UV axis selection, vertical flip, mirror flag, and face index. Validate all six faces and mirrored variants; a correct normal map in one orientation can be inverted on another.
9. **Decode normal maps correctly.** Convert packed RGB to signed tangent-space normal, apply `normal_strength` with a documented formula, normalize safely, transform through the face TBN frame, and handle degenerate/invalid texels. Do not treat a normal map as sRGB.
10. **Implement metallic-roughness semantics.** Combine scalar `PbrParameters` with optional map values using an explicit multiplication/override rule. Clamp and validate finite values; define what the channel means and do not swap roughness/metallic conventions between generator, asset file, shader, and reference.
11. **Define actual lighting inputs.** Specify direct lights, environment/ambient contribution, view vector, attenuation, and exposure. The sky gradient is a background, not an environment BRDF. Keep face shade/AO only if its role in the new lighting model is explicit; avoid double-darkening geometric AO and AO maps.
12. **Phase-gate height maps.** The material schema carries height strength and MapRole::Height, but the current renderer has no parallax/tessellation path. Treat height rendering as a separate design with screen-space derivatives, self-occlusion and performance tests; do not sample a height map and claim displacement.
13. **Update RHI layouts atomically.** Change WGSL bindings, vertex attributes, `PipelineDesc`, reflection metadata, NullRhi validation, wgpu bind groups, and shader cache keys together. Preserve backend-neutral contracts and test missing/extra/wrong-stage bindings.
14. **Extend the CPU reference independently.** Implement the same material lookup, map sampling, tangent frame, colour-space, BRDF, and fallback semantics in a CPU path that does not call the WGSL implementation. Compare pixels on deterministic scenes.
15. **Create golden material fixtures.** Include dielectric stone, fully metallic metal, rough wood, smooth ceramic, a tilted normal-map plane, absent optional maps, invalid map values, and every face orientation. Store source maps and expected output provenance.
16. **Test atlas and chunk boundaries.** Verify no map samples bleed into adjacent tiles/mips, material indices survive chunk rebuild and streaming, and the same material across blocks/chunks produces identical shading.
17. **Test reload and eviction.** Revisions and asset reloads must invalidate the correct GPU material/map entries without stale handles. Retire old textures only after submitted frames stop referencing them.
18. **Measure memory and performance.** Report bytes per map, atlas dimensions/mips, upload bandwidth, bind-group changes, vertex bandwidth, draw count, GPU time, CPU frame work, and frame percentiles. Compare albedo-only baseline to each PBR stage.
19. **Document support tiers.** State which roles are actually sampled, which use scalar fallbacks, which formats/backends are supported, and which are accepted by the asset schema but not yet rendered.
20. **Report evidence honestly.** Separate schema tests, asset validation, shader compile/reflection, NullRhi tests, native GPU tests, CPU/GPU pixel comparisons, physical-device smoke tests, and unexecuted features.

## Validation checklist

- [ ] Material identity resolves to the correct stable GPU material index or draw group.
- [ ] Albedo and data maps use the correct colour-space/channel semantics.
- [ ] Every optional map has a neutral fallback and no stale-resource path.
- [ ] All six voxel face orientations and mirror variants produce correct tangent frames.
- [ ] Normal, roughness, metallic, AO and height semantics are not conflated.
- [ ] Shader bindings, vertex layout, reflection, cache keys and RHI descriptors agree.
- [ ] CPU reference independently matches native GPU output on deterministic fixtures.
- [ ] Atlas tile/mip isolation and chunk reload/eviction are tested.
- [ ] Material revisions retire old GPU resources safely.
- [ ] Performance and memory costs are measured for each enabled map role.

## Validation matrix

| Case | Required invariant |
|---|---|
| Albedo-only legacy material | Renders with the current/default path and no missing-binding failure. |
| No normal map | Uses a flat tangent-space normal. |
| Normal map on each face | TBN orientation matches face/UV/mirror convention. |
| Roughness map absent/present | Scalar fallback and map override rule are stable. |
| Metallic map absent/present | Dielectric/conductor values map to documented channels. |
| AO map absent/present | Does not double-count geometric corner AO. |
| Height map present | Remains explicitly disabled until a tested parallax/displacement path exists. |
| Tile/mip boundaries | No cross-material or cross-map bleed. |
| Material reload | GPU index and resources update without stale handles. |
| NullRhi/wgpu | Descriptor and binding contracts match; native pixels prove shader behavior. |
| CPU/GPU golden | Independent reference agrees within declared channel tolerance. |

## Required output

Produce a PBR render-bridge report containing: pinned commit; supported MapRole list; scalar/map fallback table; material identity and GPU indexing strategy; vertex/binding layout; face TBN convention; atlas alignment/mip policy; colour-space rules; lighting/BRDF decision; CPU reference design; golden fixture matrix; resource reload/retirement rules; memory/performance measurements; platform/backend support; and explicit implemented/planned/unverified status for each map role.

## Boundaries and failure handling

- Do not claim PBR rendering because the asset schema contains PBR fields.
- Do not treat the sky gradient or face-shade multiplier as a complete lighting environment.
- Do not treat geometric corner AO and the AmbientOcclusion texture map as the same signal.
- Do not treat height-strength metadata as proof that parallax/tessellation exists.
- Do not add a material index without stable registry/reload semantics.
- Do not bind parallel map atlases with different tile or mip indices.
- Do not sample normal/roughness/metallic/height/AO as sRGB.
- Do not silently fall back to another material's texture when an optional map is missing.
- Do not update WGSL without updating reflection, RHI descriptors, NullRhi validation and shader cache identity.
- Do not claim physical-device or performance support without a commit-scoped run and measurements.

## Trigger examples

- **Positive:** Connect NEXORA `SurfaceMaterial` normal/roughness/metallic maps to the textured voxel shader.
- **Positive:** Design a stable material index so per-vertex PBR values can be looked up without per-material draw-call explosion.
- **Positive:** Add a voxel-face tangent frame that matches UV orientation on all six directions.
- **Positive:** Replace the current face-shade path with a measured metallic-roughness BRDF and an independent CPU reference.
- **Negative:** The task is only material JSON migration or PBR scalar validation; use `nexora-material-schema-versioning`.
- **Negative:** The task is only shader reflection or RHI conformance; use the shader/RHI skills.
- **Negative:** The task is only blended transparency or Cutout alpha testing; use their dedicated pass workflows.
