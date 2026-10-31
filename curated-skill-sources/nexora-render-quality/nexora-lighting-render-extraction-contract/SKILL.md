---
name: nexora-lighting-render-extraction-contract
description: "Defines the NEXORA boundary that extracts authoritative voxel and celestial lighting state into stable per-frame GPU data, with independent CPU reference checks and bounded chunk/resource lifecycles."
---

# NEXORA Lighting Render Extraction Contract

## Purpose

Use this workflow when NEXORA begins connecting authoritative world lighting to the renderer: sky/block light values, local emitters, ambient contribution, directional sun/moon inputs, or later shadow visibility.

This workflow owns the boundary from lighting state to render extraction and GPU consumption. It does not implement voxel light propagation, material BRDF semantics, or shadow-map algorithms.

## Reuse before creating

- `nexora-chunk-lighting-propagation-budget` for bounded voxel propagation queues, chunk-boundary convergence, and reference solvers.
- `engine-voxel-light-propagation-invalidation` for dirty-state invalidation and propagation lifecycle.
- `nexora-pbr-material-render-bridge` for material scalars/maps, colour-space rules, and the staged BRDF contract.
- `nexora-render-pass-state-contract` for pass ownership and ordering.
- `nexora-rhi-conformance-evidence` for backend-neutral bindings, NullRhi validation, and native GPU proof.
- `nexora-shader-reflection-contract` and `engine-shader-reflection-layout-contract` for shader binding/layout parity.
- `nexora-render-target-resize-transaction` for render-target lifecycle; do not conflate target resize with lighting-resource invalidation.
- `nexora-surface-acquisition-recovery` for surface failure recovery, which is independent of light data.
- `engine-voxel-transparency-sort-policy` and `nexora-cutout-layer-integration` for separate transparent and cutout draw contracts.

This skill owns lighting render extraction and consumption only. Propagation, PBR material shading, and shadow-map implementation remain separate concerns.

## Verified NEXORA snapshot

Re-check the active checkout before applying these facts. They describe the inspected 2026-10-30 snapshot.

- `docs/plans/LIGHTING SYSTEM.md` describes the intended ownership chain: voxel changes → chunk engine → lighting invalidation → lighting → chunk lighting state → renderer.
- The same plan describes renderer integration as `Lighting State → Render Extraction → Light Buffers / Textures → Shader`; it also names separate sky-light, block-light, dynamic-light, and dimension-lighting concepts.
- `docs/plans/RENDERER and GRAPHICS.md` treats `ShadowSystem`, sun/moon, sky, atmosphere, and fog as renderer subsystems. The plan lists shadow maps, cascaded shadow maps, contact shadows, and virtual shadow maps as candidate techniques, not implemented guarantees.
- `engine/world/src/lib.rs` exposes chunk, persistence, recovery, region, terrain, voxel, and world modules; no lighting module is exposed there in the inspected snapshot.
- `engine/simulation/src/lib.rs` exposes commands, content, controls, interaction, occupants, persistence, player, queries, residency, spawn, surfaces, and terrain; no lighting module is exposed there in the inspected snapshot.
- `engine/render/src/lib.rs` currently owns a checkable chunk pass and sky/textured rendering. Its inspected module has no lighting-state input, light buffer/texture binding, dynamic-light list, or shadow pass.
- `engine/render/src/reference.rs` independently computes the current sky, face shade, corner AO, mip choice, and haze. ADR-0044 requires the CPU reference to compute visual effects independently rather than sharing shader/mesher code.
- ADR-0044 documents the current sky as a directional background gradient and haze as a distance blend. These are not a physical sky-light field, a world light query, or a shadow solution.
- The existing renderer module comment still lists lighting as future work in the inspected snapshot.

These findings describe the inspected paths, not every file in the repository. Do not claim a runtime lighting system exists until a concrete owner, data contract, and tests are found.

## Required inputs

- Pinned NEXORA commit, target backend, renderer mode, and target hardware class.
- Current world/chunk lighting owner, if one has since been implemented; otherwise the relevant plan/ADR and explicit design assumptions.
- Light value ranges, source types, dimension profiles, propagation/invalidation semantics, and unloaded-neighbour behavior.
- `RenderFrame`, `CameraState`, render origin, chunk residency, GPU buffer/texture abstractions, RHI binding descriptors, and shader reflection.
- PBR material contract and colour-space conventions for combining material response with lighting.
- Independent CPU reference, golden scenes, performance baseline, and target memory/VRAM budgets.

## Workflow

1. **Re-audit the source of truth.** Locate the actual owner of sky light, block light, local emitters, and directional celestial inputs. Separate implemented runtime data from the aspirational lighting plan. If no runtime owner exists, report a design gap instead of fabricating a source.
2. **Keep simulation authoritative.** World/simulation own light state and propagation. The renderer receives an immutable frame/chunk snapshot; it must not mutate authoritative voxel light values or run world propagation inside a render pass.
3. **Define a versioned extraction snapshot.** Specify which chunks, light fields, source lists, dimension profile, world-time values, and revisions are captured for a frame. The snapshot must be internally consistent when chunk updates occur concurrently.
4. **Separate light domains.** Keep sky contribution, block-emitted contribution, directional sun/moon illumination, ambient/environment contribution, and shadow visibility semantically distinct. Do not collapse all of them into one undocumented byte or multiply sky light twice.
5. **Choose representation by measured access pattern.** Compare per-vertex packed values, per-voxel/chunk light textures, 3D textures, clustered light lists, and structured buffers. State update frequency, filtering, precision, memory, bandwidth, and sampling cost before choosing.
6. **Preserve voxel-to-render alignment.** The chosen representation must map the exact world cell/face/vertex to its light sample across greedy-meshed quads. Define interpolation and sampling at chunk borders; avoid seams when a quad spans cells with different light values.
7. **Define deterministic packing.** Specify integer/float format, bit ranges, normalization, saturation, colour encoding, and quantization error. Preserve linear-light intensity; do not store linear light values in sRGB channels.
8. **Keep coordinates camera-relative.** Convert large world/chunk coordinates to the renderer's established relative origin before GPU upload. Never encode huge absolute world coordinates in low-precision shader floats and expect stable lighting at far distances.
9. **Bound dynamic-light extraction.** Select active local lights using deterministic visibility/range/priority rules, per-view caps, and stable tie-breaks. Aggregate or demote distant sources rather than allowing thousands of emitters to create unbounded per-frame work.
10. **Separate lighting from shadow visibility.** A light contributes radiance; a shadow term modulates visibility. Do not bake shadow maps into voxel propagation or assume a point light requires a full shadow map. Shadow algorithms and caster policies remain a separate renderer workflow.
11. **Integrate with the PBR contract.** Combine extracted light with the material BRDF in linear space. Keep material albedo, metallic/roughness, normal, AO, emissive, and lighting contributions distinct; do not replace material parameters with baked light colours.
12. **Treat sky background and sky illumination separately.** ADR-0044's sky gradient colours rays that hit no geometry. Sky-light contribution illuminates surfaces and needs its own field/input and CPU reference. A background gradient alone is not ambient lighting.
13. **Define dimension/time transitions.** World time, sun/moon direction, weather, and dimension profile changes must update the extraction snapshot coherently. Avoid one frame mixing new sky direction with stale chunk light or vice versa.
14. **Track dirty versions.** Map chunk-light revisions to GPU resource revisions. Update only affected chunks/regions; coalesce repeated changes and avoid re-uploading unchanged light data.
15. **Handle chunk residency explicitly.** Define what happens when a visible chunk has no light cache, a neighbour is unloaded, or a chunk is evicted while an in-flight frame references its light resource. Never sample stale light from a previous chunk generation.
16. **Retire GPU resources safely.** Light buffers/textures follow explicit ownership and fence-based retirement. A chunk unload or light revision must not free data still referenced by submitted commands.
17. **Keep the CPU reference independent.** Implement light sampling, interpolation, quantization, dimension/time inputs, and shading contribution independently from WGSL. Compare the same extracted snapshot and material fixture; do not call shader helpers from the reference.
18. **Create deterministic test scenes.** Cover a sky-lit surface, enclosed dark cave, torch-lit room, two overlapping emitters, chunk-boundary light gradient, unloaded neighbour, dimension transition, day/night transition, and far-origin scene.
19. **Test NullRhi and native GPU behavior.** NullRhi proves descriptor/layout/order and deterministic command construction. A native backend test proves actual light sampling and pixel output. Report the two evidence types separately.
20. **Profile extraction and rendering independently.** Record CPU snapshot build time, dirty-chunk count, bytes uploaded, dynamic-light count, GPU buffer/texture memory, shader cost, and frame-time percentiles. Compare full upload to dirty-region updates.
21. **Define degradation behavior.** Under budget pressure, lower dynamic-light count, update frequency, or shadow quality using documented priorities. Preserve stable base sky/block light and avoid flickering caused by nondeterministic eviction.
22. **Report evidence honestly.** Mark each field as implemented, planned, fallback-only, or unverified. Separate propagation tests, extraction tests, shader tests, CPU/GPU image comparison, platform smoke tests, and performance runs.

## Validation checklist

- [ ] Every extracted field has one authoritative owner and a documented version/revision.
- [ ] Sky, block, directional, ambient, emissive, and shadow visibility contributions are not conflated.
- [ ] Render extraction is immutable and frame-consistent.
- [ ] Greedy-mesh sampling preserves per-cell light gradients and chunk-boundary continuity.
- [ ] Light data is packed in linear space with explicit quantization bounds.
- [ ] Dynamic-light selection is deterministic and bounded per view.
- [ ] World coordinates are converted through the established render origin.
- [ ] Dirty chunk revisions update only the correct GPU resources.
- [ ] Unloaded chunks, cache misses, eviction, and in-flight frame references have defined behavior.
- [ ] Shader bindings, reflection, RHI descriptors, and NullRhi validation agree.
- [ ] Independent CPU reference agrees with native GPU pixels on deterministic fixtures.
- [ ] Extraction time, upload bandwidth, GPU memory, and frame cost are measured.

## Validation matrix

| Scenario | Required invariant |
|---|---|
| Open sky | Surface illumination is distinct from the sky background gradient. |
| Enclosed cave | No stale sky contribution leaks through fully occluded paths. |
| Torch-lit room | Local block-light contribution reaches the correct voxels and pixels. |
| Two emitters | Combination rule is explicit, deterministic, and bounded. |
| Greedy quad gradient | Per-cell light variation is not flattened by merged geometry. |
| Chunk boundary | Adjacent chunks agree on edge samples and revision ownership. |
| Missing light cache | Documented fallback/rebuild behavior; no stale prior-generation sample. |
| Day/night transition | Celestial and chunk-light snapshot revisions remain coherent. |
| Dimension transition | Lighting profile changes without one-frame mixed-state artifacts. |
| Far origin | Relative coordinates preserve stable light sampling. |
| Chunk eviction | In-flight frames retain referenced GPU data until safe retirement. |
| CPU/GPU reference | Independent paths agree within declared linear/channel tolerances. |

## Required output

Produce a lighting-render extraction report containing: pinned commit; authoritative source owners; implemented/planned state per light domain; snapshot/revision contract; chosen GPU representation and rejected alternatives; packing/precision rules; voxel-face and chunk-boundary sampling; dynamic-light caps; dimension/time integration; GPU resource lifecycle; CPU reference and golden-scene results; NullRhi/native backend evidence; extraction/upload/render performance; and unresolved risks.

## Boundaries and failure handling

- Do not claim the lighting runtime exists based only on `LIGHTING SYSTEM.md`.
- Do not implement propagation inside the renderer or make rendering authoritative for world light state.
- Do not confuse the ADR-0044 sky background gradient with sky-light illumination.
- Do not conflate material PBR response, ambient occlusion, emissive output, and shadow visibility.
- Do not choose per-vertex, texture, or clustered-buffer storage without a measured trade-off.
- Do not flatten light gradients when greedy meshing merges faces.
- Do not allow chunk unload/revision to invalidate GPU resources still in flight.
- Do not claim shadows work because a light buffer or shadow interface exists.
- Do not claim CPU/GPU parity or performance without commit-scoped test output.

## Trigger examples

- **Positive:** Connect NEXORA's future sky/block light state to the textured voxel pass through a bounded render-extraction snapshot.
- **Positive:** Design GPU light buffers/textures that preserve per-cell gradients across greedy-meshed chunk faces.
- **Positive:** Add day/night and dimension lighting inputs while keeping the CPU pixel reference independent.
- **Positive:** Debug stale light samples after chunk reload, dirty revision, or GPU resource retirement.
- **Negative:** The task is propagation queue correctness or invalidation; use the lighting propagation skills.
- **Negative:** The task is material BRDF, normal maps, or roughness/metallic sampling; use `nexora-pbr-material-render-bridge`.
- **Negative:** The task is shadow-map algorithms, cascades, or caster selection; use a dedicated shadow-rendering workflow.
