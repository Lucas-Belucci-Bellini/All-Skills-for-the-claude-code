---
name: voxel-meshing-seam-validation
description: Validate voxel chunk meshes at seams for neighbor sampling, face ownership, LOD boundaries, and updates after edits.
---

# Voxel Meshing Seam Validation

## Goal

Eliminate cracks, duplicate faces and stale borders where independently generated voxel chunks meet.

## Inputs to inspect

Voxel mesher, chunk neighbor cache, greedy-meshing rules, LOD transitions, edit invalidation, ambient occlusion and reference renders.

## Workflow

1. Specify boundary sampling rules for each of the six faces and determine how missing, unloaded and newly arriving neighbors are represented.
2. Generate fixture chunks with solid/air transitions, thin walls, checkerboards, corner intersections and materials that change at the boundary.
3. Compare mesh topology and visible output on both sides of every seam, checking winding, face ownership, normals, UV continuity and greedy merge rules.
4. Edit voxels next to seams and stream the neighboring chunk in/out; verify the correct chunks are remeshed and old buffers are retired safely.
5. Test differing LODs or chunk resolutions separately and add a deterministic seam regression suite with boundary snapshots.

## Validation checklist

- [ ] A shared face is neither missing nor emitted twice when both chunks are present.
- [ ] Unknown neighbor data cannot be mistaken for confirmed air unless that is the declared streaming policy.
- [ ] Border edits invalidate every chunk whose mesh samples the changed voxel.
- [ ] LOD seam stitching preserves watertight geometry and does not hide gaps with permanent overdraw.

## Required output

A seam fixture suite, per-face sampling rules, captured topology/visual diffs, and remesh invalidation coverage.

## Boundaries and failure handling

Do not fix cracks by expanding every chunk mesh blindly; verify winding, culling, lighting and collision consequences.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
