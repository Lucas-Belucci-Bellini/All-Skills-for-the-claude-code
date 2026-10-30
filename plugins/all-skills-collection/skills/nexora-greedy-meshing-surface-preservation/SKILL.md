---
name: nexora-greedy-meshing-surface-preservation
description: "Audits and evolves NEXORA's deterministic greedy voxel mesher while preserving visible surface area, neighbor-aware culling, and render-layer contracts."
---

# NEXORA greedy meshing and surface preservation

## Purpose

Use this workflow when changing NEXORA's voxel mesher, face culling, greedy rectangle merging, render-layer routing, or mesh-generation benchmarks. The goal is to reduce primitive count without creating, deleting, or misclassifying visible surfaces.

This skill is specific to the current NEXORA mesh architecture. Re-check the target commit before relying on implementation details below.

## Required inputs

- Exact NEXORA commit SHA and the proposed diff or defect reproduction.
- `engine/mesh/src/greedy.rs`, `view.rs`, and `mesh.rs`.
- Relevant accepted ADRs and the current mesh/voxel tests.
- Region dimensions, voxel fixture, material/surface identities, and expected render layers.
- Benchmark scenario and hardware details when performance is part of the request.

## Current implementation facts to re-verify

At the audited main-branch snapshot (2026-10-30):

- `mesh_region` sweeps all three axes and builds a `LayeredMesh`.
- `VoxelView` supplies world-position lookups, including cells outside the region so chunk-border faces can be culled against real neighbors.
- The greedy mask stores a face identity as `(SurfaceId, Occlusion)`; faces merge only when both values match.
- The sweep is deterministic: axes, planes and mask cells are traversed in a fixed order; the mask merge is row-major.
- `MAX_QUAD_SIDE` is currently 16 blocks. The region API separately caps each extent at `MAX_EXTENT = 512`.
- Render layers are currently opaque, cutout and transparent. Do not invent a water layer while the authoritative block/material data has no fluid identity.

These are snapshot-specific facts, not permanent guarantees. Read the current source and ADRs before changing code.

## Workflow

1. **Establish the baseline.** Record the commit, toolchain, relevant crate versions, existing tests and benchmark command. Read the current implementation rather than relying on this document alone.
2. **Separate visibility from merging.** First determine which unit faces exist. Only then evaluate whether adjacent faces can be represented by one rectangle.
3. **Preserve neighbor semantics.** Check both sides of every swept plane through `VoxelView`. Include cells immediately outside the requested extent; never treat a chunk boundary as empty merely because it belongs to another chunk.
4. **Preserve face identity.** A merge candidate must match the complete face key, including surface identity and corner occlusion. Do not merge across material/surface or occlusion differences.
5. **Preserve geometry area.** Compare the sum of merged quad areas with the independently counted visible unit-face count. Merging may change rectangle count, never total visible surface area.
6. **Preserve bounded rectangles.** Enforce the current maximum side length on both dimensions. If the cap changes, update tests and document the rendering/precision rationale rather than silently widening quads.
7. **Preserve deterministic output.** Keep a stable axis/plane/mask traversal and stable emission order. Do not make output depend on hash-map iteration, worker completion order or nondeterministic input ordering.
8. **Preserve render-layer routing.** Route each emitted rectangle through the surface's declared layer. Verify opaque, cutout and transparent behavior independently; do not flatten layers before renderer submission.
9. **Test boundaries and adversarial shapes.** Include adjacent solid chunks, unloaded/missing neighbors, empty regions, a single voxel, solid boxes, hollow shapes, checkerboards, transparent bodies and distinct transparent surfaces.
10. **Measure only after correctness passes.** Separate CPU mesh generation and allocation measurements from GPU upload/render measurements. Report the fixture, dimensions, warm-up, repetitions, hardware, baseline and variance; never invent a speedup ratio.

## Validation checklist

- [ ] The exact source commit and current mesh contracts are recorded.
- [ ] Empty space emits no geometry; a single solid voxel emits six unit faces.
- [ ] A solid region emits only its exterior shell, not interior faces.
- [ ] Merged quad area equals the unmerged visible-face count for solid, hollow and fragmented fixtures.
- [ ] Neighboring solid regions do not create seam walls or duplicate boundary faces.
- [ ] Distinct surfaces and differing corner-occlusion values never merge.
- [ ] Transparent surfaces do not generate internal faces against the same see-through surface.
- [ ] Every rectangle respects the current maximum width and height.
- [ ] Repeated identical inputs produce identical ordered geometry.
- [ ] Render-layer membership and draw ordering remain correct.
- [ ] Focused tests, formatting, linting and documented repository checks pass; skipped checks are listed.
- [ ] Benchmarks include reproducible inputs and do not conflate mesh construction with GPU presentation.

## Suggested focused checks

Start with the repository's current validation guide and CI workflow. For a focused crate check, verify that the current workspace still exposes the package as `nexora-mesh`, then run:

```bash
cargo test -p nexora-mesh
cargo fmt --all -- --check
cargo clippy -p nexora-mesh --all-targets
```

Do not report these commands as executed unless their output was observed on the target commit.

## Required output

Report:

- Commit SHA, files and invariants reviewed.
- Whether the change affected face visibility, merge eligibility, ordering, layer routing or only performance.
- Test fixtures and commands run, with pass/fail/blocked/not-run status.
- Merged rectangle count and preserved surface area for each fixture.
- Benchmark methodology and measured results, if applicable.
- Remaining rendering, GPU, chunk-lifecycle or hardware uncertainties.

## Boundaries and failure handling

- Do not add special-case chunk-edge behavior before checking the neighbor-aware view contract.
- Do not change authoritative world state from the meshing crate; it consumes a voxel view and returns geometry.
- Do not claim a mesh is visually correct solely because it compiles or has a lower quad count.
- Do not add a fluid/water render layer until the world/material model can authoritatively identify fluid surfaces.
- If a required neighbor, fixture, benchmark or renderer is unavailable, record the limitation and stop short of claiming full validation.

## Trigger examples

- **Positive:** A change to `mesh_region`, `merge_mask`, `VoxelView`, face occlusion, chunk-border meshing or mesh benchmarks.
- **Positive:** A report of missing faces, visible seams, flicker, over-merging, under-merging or nondeterministic mesh output.
- **Negative:** A task changes only texture authoring or Blender workflows without affecting mesh generation or mesh integration.
- **Negative:** A request asks for a performance claim without a reproducible fixture or baseline.
