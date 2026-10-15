---
name: voxel-meshing-optimization
description: "Profiles and improves voxel mesh generation while preserving geometry correctness. Use when chunk meshing time, vertex count, draw calls, or upload size limits world scale."
---

# Voxel Meshing Optimization

## Use when
Voxel surfaces are visually incorrect or meshing cost grows too quickly with block count and chunk complexity.

## Workflow
1. Create deterministic fixtures containing empty, solid, checkerboard, cave, and boundary-heavy chunks.
2. Measure baseline CPU time, vertices, indices, allocations, and upload bytes separately from rendering time.
3. Implement one meshing strategy at a time (face culling, greedy merging, or material-aware batching) behind a testable interface.
4. Compare generated surface coverage and normals against a simple reference mesher before evaluating speed.

## Required output
A reproducible benchmark table, correctness comparison, chosen optimization, and limitations by material/transparency type.

## Validation
- Adjacent chunks do not produce missing or duplicated boundary faces.
- Opaque, transparent, liquid, and special blocks follow explicit merge rules.
- Benchmarks use the same fixtures and build settings before and after.

## Guardrails
Do not report fewer vertices as a win if geometry, lighting, material boundaries, or update latency regresses.
