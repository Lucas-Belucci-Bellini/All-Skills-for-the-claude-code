---
name: tex-distance-field-texture-validation
description: "Validate signed or unsigned distance-field textures for edge quality and scale behavior. Use when fonts, decals or stylized outlines show ringing, thickening or disappearing edges."
---

# Distance-Field Texture Validation

## Purpose

Validate signed or unsigned distance-field textures for edge quality and scale behavior.

## Trigger

Use when fonts, decals or stylized outlines show ringing, thickening or disappearing edges.

## Required inputs

Inputs: generation method, spread/range, resolution, shader threshold and target display scale.

## Workflow

1. 1. Identify the distance-field type and expected encoded range.
2. 2. Verify the shader decodes the same range used during generation.
3. 3. Test small and large on-screen sizes, rotations and minified views.
4. 4. Inspect edge thresholds, outline width and multi-channel assumptions if applicable.
5. 5. Compare against a high-resolution reference and record safe scale bounds.

## Expected output

A scale-dependent edge-quality report and matching generator/shader settings.

## Guardrails

Do not mix SDF and MSDF assets without matching shader decode paths.

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
