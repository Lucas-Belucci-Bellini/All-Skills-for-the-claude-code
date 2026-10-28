---
name: tex-atlas-sprite-bleed-test
description: "Test sprite atlases for neighbor-color bleed across scales and sampling modes. Use when UI icons, animated sprites or item icons show colored edges from adjacent atlas cells."
---

# Atlas Sprite Bleed Test

## Purpose

Test sprite atlases for neighbor-color bleed across scales and sampling modes.

## Trigger

Use when UI icons, animated sprites or item icons show colored edges from adjacent atlas cells.

## Required inputs

Inputs: atlas image, sprite rectangles, border policy, filtering mode and mip settings.

## Workflow

1. 1. Enumerate sprite rectangles and verify they match the source atlas dimensions.
2. 2. Build a diagnostic atlas with high-contrast neighboring cells.
3. 3. Test subpixel motion, scaling, rotation and mip transitions where applicable.
4. 4. Inspect transparent RGB, padding and sprite trim metadata.
5. 5. Compare padding, extrusion and atlas-layout options with a repeatable screenshot set.

## Expected output

A list of risky sprites and the padding or sampling change that resolves each case.

## Guardrails

Do not alter sprite trim or pivots without checking animation and UI layout references.

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
