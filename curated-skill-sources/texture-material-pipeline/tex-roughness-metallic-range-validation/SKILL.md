---
name: tex-roughness-metallic-range-validation
description: "Check roughness and metallic maps for value-range errors and incorrect material assumptions. Use when a material looks uniformly glossy, plasticky, or metallic in unexpected regions."
---

# Roughness and Metallic Range Validation

## Purpose

Check roughness and metallic maps for value-range errors and incorrect material assumptions.

## Trigger

Use when a material looks uniformly glossy, plasticky, or metallic in unexpected regions.

## Required inputs

Inputs: maps, channel packing, material parameters, intended material class and runtime screenshots.

## Workflow

1. Confirm roughness and metallic channels are wired to the correct inputs and interpreted as linear data.
2. Sample representative regions and inspect histograms for clipped whites/blacks or unintended flat values.
3. Verify metallic is used for conductive surfaces rather than as a generic darkness control.
4. Review roughness transitions at seams and across mip levels.
5. Compare against calibrated lighting and a reference material, changing one parameter at a time.

## Expected output

A per-map range report, sampled regions, and recommended corrections with evidence.

## Guardrails

Do not prescribe universal numeric values without knowing the material, lighting and renderer.

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
