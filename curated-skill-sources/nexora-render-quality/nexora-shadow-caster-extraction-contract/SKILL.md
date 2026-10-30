---
name: nexora-shadow-caster-extraction-contract
description: "Defines how NEXORA selects, versions, culls, and submits voxel/entity shadow casters to sun cascades and budgeted local shadow passes without coupling lighting authority to renderer implementation."
---

# NEXORA Shadow Caster Extraction Contract

## Purpose

Use this workflow when designing or implementing NEXORA's shadow system: caster/receiver eligibility, voxel and entity extraction, camera-relative sun cascades, local-light shadow budgets, shadow LOD, or invalidation after world changes.

The workflow owns shadow-caster selection and submission contracts. It does not own authoritative light propagation, general light render extraction, material BRDF, or the choice of final shadow-filtering algorithm.

## Reuse before creating

- `nexora-lighting-render-extraction-contract` for immutable frame light snapshots, light domains, dynamic-light budgets, and render extraction.
- `nexora-pbr-material-render-bridge` for material response and normal/albedo semantics.
- `nexora-cutout-layer-integration` for alpha-tested foliage/geometry; shadow alpha testing must use the same documented cutoff semantics.
- `nexora-render-pass-state-contract` for pass ownership, attachment transitions, and ordering.
- `nexora-render-target-resize-transaction` for shadow-atlas/target resize and replacement lifecycle.
- `nexora-gpu-resource-retirement` and `engine-resource-lifetime-ledger` for in-flight shadow resource retirement.
- `nexora-rhi-conformance-evidence` for backend-neutral depth pipeline and native GPU evidence.
- `nexora-surface-acquisition-recovery` for window surface recovery; shadow target failures are a separate offscreen-resource concern.
- `nexora-chunk-lighting-propagation-budget` and `engine-voxel-light-propagation-invalidation` for world lighting state, not shadow rasterization.

This skill owns caster extraction, eligibility, invalidation, and shadow-pass input. Cascaded shadow maps, PCF/EVSM/VSM filtering, and per-light projection mathematics require separately measured implementation decisions.

## Verified NEXORA snapshot

Re-check the active checkout before applying these facts. They describe the inspected 2026-10-30 snapshot.

- `docs/plans/LIGHTING SYSTEM.md` explicitly separates lighting authority from visual shadows: Lighting provides light sources/direction/intensity; Renderer owns shadow maps, filtering, and rendering.
- The same plan proposes `castShadow` and `receiveShadow` flags for blocks, entities, vehicles, structures, and vegetation.
- The plan proposes sun shadows with cascades, LOD, and camera-relative shadowing because the world is large.
- The plan proposes local shadows for nearby lights and a priority order: Sun highest, large nearby lights high, medium lights normal, tiny distant lights low or none.
- `docs/plans/RENDERER and GRAPHICS.md` names a separate `ShadowSystem` and lists shadow maps, cascaded shadow maps, contact shadows, and virtual shadow maps as possible techniques. These are candidates, not implementation evidence.
- `engine/render/src/lib.rs` currently exposes a chunk pass and sky/textured rendering. The inspected source contains no shadow pass, shadow map/atlas, caster extraction API, cascade data, or shadow resource binding.
- The current chunk renderer uses reverse-Z depth conventions in its existing depth state. A future shadow pass must explicitly choose and test its own depth convention rather than copying a compare op without checking the light projection and clear value.
- The renderer's current chunk pass draws camera-visible chunk meshes; camera-frustum visibility is not sufficient to determine shadow-caster visibility because a caster can lie outside the camera frustum while casting into the visible region.
- `engine/mesh/src/mesh.rs` describes opaque, cutout, and transparent render layers. Shadow submission must define per-layer policy: opaque casters, alpha-tested Cutout casters, and whether blended transparent surfaces cast any approximation.
- No shadow implementation was found in the inspected renderer/mesh paths. Do not infer runtime support from the plans.

## Required inputs

- Pinned NEXORA commit, target backend, camera/render-origin contract, and GPU capabilities.
- Authoritative light snapshot and per-light type/direction/range/priority from the lighting extraction contract.
- World/chunk residency, chunk mesh generation/revision, entity/vehicle/vegetation transform snapshots, and material flags.
- `RenderLayer`, Cutout threshold contract, opaque geometry, and transparent-material policy.
- RHI depth texture formats, compare conventions, render-target lifecycle, and GPU resource retirement rules.
- Target shadow quality, memory budget, scene scale, frame-time budget, and reference captures.

## Workflow

1. **Confirm the source of truth.** Resolve light direction/range and caster transforms from immutable frame snapshots. The renderer must not query or mutate authoritative world simulation while recording a shadow pass.
2. **Define caster and receiver semantics.** Specify whether each object type casts, receives, or does neither. Treat `castShadow` and `receiveShadow` as independent flags; a receiver need not be a caster and vice versa.
3. **Define material-layer policy.** Opaque geometry casts depth normally. Cutout geometry must reproduce the same alpha cutoff and texture selection as its color pass. Blended transparency needs an explicit policy (no shadow, opaque approximation, alpha-to-coverage, or another measured method); never silently write a solid shadow for glass/water.
4. **Separate camera visibility from light visibility.** Build caster candidates against each light's shadow volume/cascade, not only the camera frustum. Keep receiver visibility and camera-visible draw lists independent.
5. **Choose extraction granularity.** Compare whole chunk, per-meshlet/section, per-object, and per-caster bounds. Include chunk revision, mesh revision, transform revision, and material shadow flags in cache identity.
6. **Cull conservatively.** Use light-space frustum tests, cascade bounds, distance/priority limits, and optional occlusion only when the occluder test is valid for the light view. Avoid camera occlusion results being reused as shadow-view truth.
7. **Build camera-relative sun cascades.** Choose split distances from camera near/far and scene scale; compute light-space bounds for each cascade; stabilize projection against camera movement (e.g. texel snapping) and define overlap/blend between adjacent cascades. Measure split choices rather than hardcoding a universal formula.
8. **Handle large-world precision.** Transform caster bounds relative to the current render origin before light-space projection. Recompute or shift cascade matrices safely when the render origin changes; do not use huge absolute world coordinates in low-precision shader matrices.
9. **Define shadow LOD.** Select caster mesh detail by cascade distance and projected texel footprint. Keep silhouettes stable and ensure LOD transitions do not make distant objects flicker in/out of shadows.
10. **Budget local-light shadows.** Rank local lights deterministically using importance, screen influence, range, source class, and hysteresis. Cap the number of shadowed local lights and total shadow pixels; low-priority lights may illuminate without casting shadows.
11. **Specify depth convention per pass.** Document depth format, clear value, compare operation, projection handedness, clip-space range, bias sign, and face culling. Existing camera reverse-Z settings do not automatically define the light-space shadow depth convention.
12. **Control acne and peter-panning.** Measure constant/slope-scaled depth bias, normal offset, and receiver bias against thin voxel geometry. Avoid solving acne with bias so large that contact shadows detach from casters.
13. **Keep pass resources explicit.** Define shadow depth target/atlas allocation, per-cascade viewport/scissor, light matrices, caster buffers, and bind groups. Shadow passes must not accidentally inherit color blending, transparent state, or camera depth attachments.
14. **Invalidate by dependency.** A caster chunk mesh change, voxel edit, entity transform, material cast flag, Cutout alpha/map revision, light direction, cascade split, or render-origin shift must invalidate the correct shadow cache. Coalesce repeated changes and avoid rebuilding every cascade for an unrelated update.
15. **Handle residency and retirement.** If a caster chunk unloads or a mesh revision changes while a frame is in flight, retain the old GPU buffer until its fence retires. Missing caster data must follow a documented conservative fallback; never sample a stale prior chunk generation.
16. **Keep receiver shading separate.** Shadow visibility multiplies the lighting contribution; it is not a material albedo, AO, or propagation value. Avoid double-darkening by applying the same shadow term in both baked light and direct-light BRDF.
17. **Add deterministic geometric fixtures.** Include a single cube over a plane, thin fence/cutout foliage, chunk-boundary wall, large terrain ridge, moving entity, overlapping cascades, and a local lamp near the priority threshold.
18. **Test camera/light movement.** Move camera across cascade texel boundaries, rotate sun direction, move render origin, move caster and receiver independently, and cross cascade split distances. Detect shimmering, popping, missing casters, and detached shadows.
19. **Test CPU and GPU evidence.** Build analytic small-scene tests for cascade bounds, caster selection, light-space transforms, and depth comparisons. Native GPU tests must verify actual shadow visibility and depth output; NullRhi alone cannot prove rasterized shadows.
20. **Profile separately.** Measure caster extraction CPU time, per-cascade candidate counts, draw calls, shadow atlas occupancy, depth bandwidth, GPU pass time, cache invalidation frequency, and local-light shadow budget. Compare quality and cost per technique.
21. **Define fallback and failure modes.** When shadow resources are unavailable or a light exceeds budget, use a deterministic no-shadow or lower-quality path. Do not fail the whole frame for an optional shadow cache unless the renderer contract explicitly requires it.
22. **Report evidence honestly.** Distinguish caster-selection tests, projection math tests, NullRhi descriptors, native depth/pixel tests, platform coverage, and performance captures.

## Validation checklist

- [ ] Caster/receiver eligibility is independent and explicit for every object/material class.
- [ ] Camera frustum culling is not reused as the only shadow-caster culling test.
- [ ] Opaque, Cutout, and blended transparent shadow policies are documented and tested.
- [ ] Sun cascade splits, overlap, stabilization, and render-origin behavior are deterministic.
- [ ] Local-light shadow selection is bounded and stable under small score changes.
- [ ] Depth format, clear value, compare operation, projection, bias, and culling agree.
- [ ] Caster revisions and transform/material changes invalidate only dependent shadow data.
- [ ] GPU buffers/atlases remain alive until in-flight shadow commands retire.
- [ ] CPU geometric reference and native GPU shadow output agree on deterministic scenes.
- [ ] Shadow extraction, pass time, memory, bandwidth, and quality are measured.
- [ ] Optional shadow failure degrades predictably without stale or undefined sampling.

## Validation matrix

| Scenario | Required invariant |
|---|---|
| Opaque cube | Casts and receives shadow according to independent flags. |
| Cutout foliage | Holes remain holes in the shadow depth pass using the same cutoff. |
| Blended water/glass | Follows explicit policy; no accidental opaque silhouette. |
| Off-camera caster | Still casts when it intersects the visible receiver's light-space region. |
| Cascade boundary | No gap, hard pop, or unstable overlap at split transitions. |
| Camera texel movement | Stabilized cascades do not shimmer beyond declared tolerance. |
| Render-origin shift | Caster and receiver remain aligned in light space. |
| Chunk edit/unload | Correct cascade cache invalidates; no stale mesh generation is sampled. |
| Moving entity | Transform revision updates its shadow without rebuilding unrelated casters. |
| Local-light budget | Priority and hysteresis remain deterministic at cap boundaries. |
| Depth bias | Thin surfaces avoid acne without visibly detached shadows. |
| Native GPU | Actual shadow depth and receiver visibility are proven on the target backend. |

## Required output

Produce a shadow-caster extraction report containing: pinned commit; object/material cast/receive matrix; light snapshot inputs; caster bounds and extraction granularity; camera-vs-light culling rules; cascade split/stabilization decisions; local-light shadow budget; depth format/convention/bias; Cutout/transparent policy; cache invalidation and GPU retirement; deterministic geometry tests; native backend pixel evidence; shadow memory/performance metrics; fallback behavior; and unresolved risks.

## Boundaries and failure handling

- Do not claim shadow maps or cascades exist because they appear in planning documents.
- Do not derive caster visibility solely from the camera frustum.
- Do not conflate light propagation, extracted radiance, material BRDF, AO, and shadow visibility.
- Do not treat transparent materials as opaque casters without an explicit policy.
- Do not reuse camera reverse-Z state without defining and testing the shadow pass depth convention.
- Do not let render-origin changes introduce light-space precision loss.
- Do not invalidate or free shadow resources still referenced by in-flight frames.
- Do not claim GPU shadow correctness from NullRhi descriptor tests alone.
- Do not claim performance or visual quality without commit-scoped measurements.

## Trigger examples

- **Positive:** Build NEXORA's first shadow pass and determine which voxel chunks cast into each sun cascade.
- **Positive:** Add cast/receive shadow flags for blocks, entities, vehicles, structures, and vegetation.
- **Positive:** Prevent cutout leaves from producing solid rectangular shadows.
- **Positive:** Stabilize camera-relative sun cascades and budget local-light shadow maps.
- **Negative:** The task is light propagation or render extraction of sky/block light values; use the lighting propagation/extraction workflows.
- **Negative:** The task is PBR material shading or normal-map response; use `nexora-pbr-material-render-bridge`.
