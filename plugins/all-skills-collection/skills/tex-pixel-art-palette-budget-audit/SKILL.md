---
name: tex-pixel-art-palette-budget-audit
description: "Measure palette size, color ramps and contrast consistency in pixel-art textures. Use when creating low-resolution sprites, voxel textures or readable retro materials."
---

# Pixel-Art Palette Budget Audit

## Purpose

Measure palette size, color ramps and contrast consistency in pixel-art textures.

## Trigger

Use when creating low-resolution sprites, voxel textures or readable retro materials.

## Required inputs

Inputs: source image, palette constraints, target resolution and readability goals.

## Workflow

1. 1. Extract unique colors and identify accidental near-duplicates.
2. 2. Group colors into ramps and flag inconsistent hue/value progression.
3. 3. Preview at native scale and nearest-neighbor enlargement; avoid judging only at zoomed scale.
4. 4. Test silhouettes and value separation against likely backgrounds.
5. 5. Record intentional exceptions such as emissive accents or accessibility contrast needs.

## Expected output

A palette inventory, ramp suggestions and native-scale review notes.

## Guardrails

Do not auto-quantize the master image without preserving a source copy and artist intent.

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
