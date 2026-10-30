---
name: nexora-atlas-face-texel-orientation-contract
description: "Verify the exact voxel-face-to-atlas coordinate mapping, vertical orientation and mirror behavior used by NEXORA's renderer and CPU reference."
---

# NEXORA Atlas Face Texel Orientation Contract

## Purpose

Prevent face-dependent texture flips, rotations, seams and disagreement between greedy-meshed geometry and the voxel atlas lookup.

## Verified NEXORA facts

- The inspected `engine/render/src/atlas.rs` centralizes `texel_of` and documents the per-axis face coordinate mapping.
- Faces across X read `(z, y)`, across Y read `(x, z)`, and across Z read `(x, y)`; the vertical coordinate counts down from the top.
- A greedy rectangle repeats its tile once per block; mirroring reverses the texel column only and never rotates the tile.

## Required inputs

- Pinned `atlas.rs` implementation and the active vertex/face encoding path.
- A deterministic atlas fixture with asymmetric corner markers and non-repeating directional patterns.
- All six face orientations, block-local coordinates and greedy rectangle dimensions.

## Workflow

1. Build an orientation matrix for all six face directions, recording the expected local axes, handedness and vertical origin for each.
2. Use asymmetric test tiles with unique corner markers, a directional arrow and a non-symmetric pattern; symmetric checkerboards are insufficient to detect flips.
3. Probe texels at all four corners, edge midpoints and interior coordinates for each face; include negative/positive axes and top/bottom faces.
4. Verify that a greedy rectangle spanning multiple blocks repeats the tile in block-local coordinates instead of stretching one tile across the full rectangle.
5. Test mirrored variants independently and prove that mirroring changes only the column coordinate, never row order or tile rotation.
6. Compare the CPU `texel_of` result with the shader's coordinate transcription for the same face and local point.
7. Record any coordinate convention changes as an explicit compatibility decision because existing assets may rely on the current orientation.

## Validation checklist

- [ ] All six face directions have explicit expected coordinate mappings.
- [ ] Asymmetric corner markers appear in the intended orientation with no accidental rotation or vertical inversion.
- [ ] Greedy rectangles repeat per block with stable seams.
- [ ] Mirror behavior is column-only and matches CPU/shader implementations.

## Required output

A six-face orientation matrix, asymmetric fixture, CPU/shader coordinate comparison, and compatibility note for any proposed mapping change.

## Boundaries and failure handling

Do not infer orientation from a symmetric texture or a single face. Do not fix a visual flip by changing UVs, mesh winding and atlas coordinates simultaneously; isolate the responsible transform first.

## Trigger examples

- **Positive:** A block texture appears rotated or mirrored on only some faces.
- **Positive:** A greedy-meshed wall stretches one tile across several blocks instead of repeating it.
- **Negative:** The task changes material identity or PBR scalar-to-binding mapping.
- **Negative:** The issue is a neighbor-chunk face-culling or mesh-topology defect.
