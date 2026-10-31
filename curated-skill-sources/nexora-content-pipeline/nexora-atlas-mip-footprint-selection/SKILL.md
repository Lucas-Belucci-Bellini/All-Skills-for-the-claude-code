---
name: nexora-atlas-mip-footprint-selection
description: "Validate how NEXORA's voxel atlas chooses mip levels from screen-space texel footprint while keeping each tile's mip data isolated from neighboring tiles."
---

# NEXORA Atlas Mip Footprint Selection

## Purpose

Keep minified voxel surfaces stable and prevent atlas-neighbor contamination by validating the mapping from projected pixel footprint to the atlas's packed per-tile mip levels.

## Verified NEXORA facts

- The inspected `engine/render/src/atlas.rs` defines the atlas tile size, cell width, mip-level selection and mip slack in one module.
- The atlas documentation states that smaller levels are generated from each tile alone and packed beside it so a level does not read a neighboring tile.
- The current renderer uses integer-coordinate texture loads; do not assume sampler filtering or anisotropy is active in this pass.

## Required inputs

- Pinned NEXORA commit and the exact `atlas.rs` constants/functions used by the active renderer.
- Representative camera projections, viewport sizes, chunk distances and face dimensions.
- Atlas generation fixtures, known mip-chain bytes and CPU/GPU reference captures.

## Workflow

1. Trace the path from projected face size to texel footprint, mip-level selection and packed atlas-cell coordinates; record every unit conversion.
2. Verify the selected level around integer and fractional footprint boundaries, including the configured mip slack, with deterministic table-driven tests.
3. For each tile, verify that every generated mip level reads only that tile's source texels and that packed cell offsets cannot cross into an adjacent tile.
4. Exercise faces at near, mid and far distances, steep viewing angles, thin geometry and rapidly changing viewport dimensions.
5. Compare the CPU-selected level and texel coordinates with the WGSL path for identical camera/face inputs; classify rounding differences explicitly.
6. Capture a high-contrast atlas fixture whose neighboring tiles use visibly different colors so a single cross-tile sample is obvious.
7. Record the memory cost of the packed per-tile mip layout and compare it with the visual stability gained; do not change the layout based on intuition alone.

## Validation checklist

- [ ] Mip selection is monotonic with increasing projected texel footprint and stable at boundary values.
- [ ] A tile's mip chain cannot sample texels belonging to a neighboring tile.
- [ ] CPU and shader choose equivalent levels/coordinates for the same inputs.
- [ ] The documented sampling model matches the active shader; sampler-based assumptions are not introduced into an integer `textureLoad` path.

## Required output

A mip-selection boundary table, per-tile isolation proof/fixture, CPU-vs-shader comparison, memory estimate, and explicit PASS/FAIL/UNVERIFIED results.

## Boundaries and failure handling

Do not claim that the atlas is sampler-filtered if the active shader uses integer texture loads. Do not change `MIP_SLACK`, cell packing or mip generation without a pinned before/after fixture and pixel evidence.

## Trigger examples

- **Positive:** Distant voxel textures shimmer or select visibly incorrect detail levels.
- **Positive:** An atlas change modifies tile mip packing or footprint-to-level selection.
- **Negative:** The issue is atlas packing fragmentation or repacking; use the dedicated atlas fragmentation workflow.
- **Negative:** The issue is device format compatibility or compressed-format fallback.
