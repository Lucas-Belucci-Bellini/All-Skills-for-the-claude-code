---
name: engine-voxel-transparency-sort-policy
description: "Define and validate the invariants, lifecycle behavior, compatibility rules and regression coverage for voxel transparency sort policy. Use when voxel transparency sort policy must be implemented, audited, debugged or made reliable across supported engine configurations."
---

# Voxel Transparency Sort Policy

## Purpose

Define and validate the invariants, lifecycle behavior, compatibility rules and regression coverage for voxel transparency sort policy.

## Goal

Define and validate the invariants, lifecycle behavior, compatibility rules and regression coverage for voxel transparency sort policy.

## When to use

Use when voxel transparency sort policy must be implemented, audited, debugged or made reliable across supported engine configurations.

## Required inputs

Inspect implementation, owning subsystem interfaces, configuration and version metadata, relevant logs or traces, target platforms, and existing regression fixtures. Identify the source of truth before proposing a change.

## Workflow

1. Map the subsystem boundary and list the state, resources, dependencies and external contracts that influence **Voxel Transparency Sort Policy**.
2. State required invariants, ordering rules, ownership boundaries and failure behavior; distinguish documented guarantees from assumptions.
3. Reproduce the normal path and edge cases, including teardown, cancellation, invalid input and version/platform variation where applicable.
4. Add a focused fixture or automated assertion for **Voxel Transparency Sort Policy**; capture the smallest deterministic reproducer for any failure.
5. Measure correctness, performance and recovery behavior; compare with a baseline and document trade-offs before selecting a fix.
6. Re-run targeted regression checks and summarize remaining unknowns rather than treating missing evidence as success.

## NEXORA case study — transparent voxel pass and DEBT-0056

Re-check the active checkout before applying these observations. They describe the NEXORA snapshot inspected on 2026-10-30.

- `engine/mesh/src/mesh.rs` defines `RenderLayer::Transparent` as blended geometry that must be drawn last and sorted back-to-front. `LayeredMesh` keeps transparent geometry separate from opaque and cutout geometry.
- `engine/render/src/lib.rs` creates a transparent pipeline with `Blend::Over`, reverse-Z `Compare::Greater`, depth testing enabled, and depth writes disabled.
- `ChunkPass::upload_layers` uploads opaque and transparent vertices into separate buffers. `ChunkPass::record` draws all visible opaque chunks first, then iterates transparent buffers in the caller-provided `chunks` order. The transparent pass currently has no explicit depth sort.
- `engine/render/src/atlas.rs` supports translucent tiles through `Atlas::add_see_through`; their alpha is retained through the tile-local mip chain. This is distinct from geometry ordering.
- ADR-0051 validates the static sea case: opaque geometry first, then a transparent water layer blended source-over in linear light. The ADR explicitly records DEBT-0056 for a ray that crosses two see-through surfaces (for example water → air pocket → water).
- `engine/render/src/reference.rs` currently stops judging a ray when it encounters a second see-through face; it reports that case as outside/unjudged because it does not model the pass's multi-layer draw order.
- `engine/render/tests/pass.rs::every_pixel_seen_through_water_is_the_water_blended_over_the_ground` validates one transparent water layer over opaque ground. It does not establish correctness for multiple overlapping transparent layers.

### Required NEXORA design workflow

1. **Keep the pass contract explicit.** Draw opaque geometry before transparent geometry; preserve source-over blending in linear light, depth test on, depth writes off. Do not let sorting reorder opaque work.
2. **Choose the sorting primitive deliberately.** Compare chunk-level, material-batch, quad-level, and triangle-level ordering. Chunk-only ordering is insufficient if transparent surfaces inside one chunk can overlap in depth. Do not claim a granularity is correct without a counterexample suite.
3. **Define a deterministic depth key.** Specify view-space depth sign for the engine's reverse-Z camera, far-to-near ordering, stable tie-breaks (chunk origin and stable primitive identity), and behavior for equal/invalid/non-finite depths. Never sort by raw reverse-Z depth without proving the ordering direction.
4. **Preserve immutable mesh ownership.** Build a per-frame sorted index/order or transient draw list; do not mutate the authoritative chunk mesh or invalidate upload lifetimes merely to sort.
5. **Handle intersections honestly.** Back-to-front sorting is order-dependent and cannot solve every intersecting transparent surface. If exact ordering is impossible, document the artifact and evaluate an order-independent method only after confirming the RHI can express its blend/attachment requirements and measuring memory/bandwidth cost. Do not assume weighted blended OIT is already supported.
6. **Extend the CPU reference.** Replace the single-veil assumption with a bounded ordered collection of transparent intersections and composite each layer in the exact order the renderer promises, in linear light, before the first opaque hit. Define the bound/overflow policy; never silently mark a relevant pixel as correct when it was not judged.
7. **Keep alpha and ordering separate.** Validate tile alpha, mip-chain alpha averaging, transparent material classification, and source-over math independently from depth sorting. Opaque/cutout data must not be accidentally sent through the blended pass.
8. **Test multiple layers.** Cover two and three transparent faces on one ray, water-air-water pockets, different transparent materials, same/different chunks, chunk-order permutations, camera rotation, equal-depth ties, opaque occlusion, alpha 0/partial/1, and no-transparent geometry.
9. **Prove determinism.** Re-run the same scene with different chunk enumeration/insertion order and verify the chosen sort result and rendered pixels are stable. Pin tie-break behavior with a deterministic test.
10. **Measure the cost.** Record visible transparent primitive count, sort time, CPU allocations, draw count, GPU time where available, and frame-time percentiles. Compare candidate granularities on representative flooded scenes; do not optimize based on a single frame.
11. **Close the debt with evidence.** Update ADR-0051/DEBT-0056 and the reference tests only after the multi-layer GPU frame matches the independent CPU composite. Until then, preserve the debt and state exactly which scenes remain unsupported.

## Validation checklist

- [ ] Inputs, assumptions, supported versions and platform scope are recorded.
- [ ] Boundary and failure paths are tested, not only the happy path.
- [ ] A regression fixture protects the main invariant.
- [ ] Performance or resource impact is measured when relevant.
- [ ] For NEXORA, DEBT-0056 is either preserved as open or closed with multi-layer reference and GPU evidence.
- [ ] Compatibility, recovery and rollback implications are documented.

## Required output

An evidence-backed assessment of **Voxel Transparency Sort Policy**, the relevant invariants, a prioritized implementation or fix plan, a regression fixture/checklist, and unresolved assumptions.

## Boundaries and failure handling

Do not apply broad refactors or destructive migrations without a baseline and rollback path. Do not claim tests, benchmarks or runtime checks passed unless their outputs were observed. If repository evidence is incomplete, state exactly what is missing and avoid presenting an assumption as verified fact.

## Trigger examples

- **Positive:** The engine task involves voxel transparency sort policy and needs validation of lifecycle, compatibility or correctness.
- **Negative:** The request is unrelated to engine implementation or asks for unsupported claims without repository evidence.
