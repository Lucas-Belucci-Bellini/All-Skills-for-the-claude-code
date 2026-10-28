---
name: tex-voxel-atlas-padding-validation
description: "Validate texture atlas gutters, UV bounds and mip-safe padding for voxel blocks. Use when adjacent atlas tiles bleed colors or show seams at distance."
---

# Voxel Atlas Padding Validation

## Purpose

Validate texture atlas gutters, UV bounds and mip-safe padding for voxel blocks.

## Trigger

Use when adjacent atlas tiles bleed colors or show seams at distance.

## Required inputs

Inputs: atlas dimensions, tile grid, UV coordinates, mip settings and renderer sampling mode.

## Workflow

1. 1. Verify atlas dimensions divide evenly into the declared tile grid.
2. 2. Inspect each UV rectangle for off-by-one boundaries and half-texel assumptions.
3. 3. Generate a repeat preview with contrasting neighbor tiles.
4. 4. Test mip levels and nearest/linear filtering expected by the engine.
5. 5. Choose duplicated-edge padding, per-tile mip generation or texture arrays when appropriate.

## Expected output

An atlas audit with affected tiles, UV bounds and a target-engine-safe fix.

## Guardrails

Do not change UVs globally without checking legacy assets and existing atlas contracts.

## Validation checklist

- [ ] Required inputs and target platform are recorded.
- [ ] Findings are backed by a reproducible test or capture.
- [ ] Source assets are preserved and any proposed change is reversible.
- [ ] Results are checked in the actual target renderer or engine.

## Required output

Deliver the evidence-backed artifact described above, including scope, assumptions, findings, severity, recommended next action and a regression check.

## Boundaries and failure handling

If inputs are missing or renderer conventions are unknown, stop short of a definitive diagnosis, list the missing evidence and provide a safe test plan. Do not overwrite source assets or apply bulk changes without review.

## Trigger examples

- Review this texture set before integrating it into the project.
- Diagnose this texture artifact using the target engine's import and rendering settings.

- **Positive:** The asset has a visible seam, incorrect material response, or a pipeline mismatch that needs evidence-based diagnosis.
- **Negative:** The task is to create an unrelated image from scratch or to change art direction without a texture-pipeline validation need.
