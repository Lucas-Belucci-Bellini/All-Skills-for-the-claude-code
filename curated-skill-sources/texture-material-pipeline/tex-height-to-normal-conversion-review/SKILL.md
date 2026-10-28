---
name: tex-height-to-normal-conversion-review
description: "Review height-map interpretation and conversion settings for stable normal detail. Use when converting grayscale height maps into normal maps for runtime materials."
---

# Height-to-Normal Conversion Review

## Purpose

Review height-map interpretation and conversion settings for stable normal detail.

## Trigger

Use when converting grayscale height maps into normal maps for runtime materials.

## Required inputs

Inputs: height map, physical feature scale, conversion tool, strength, filter and tangent convention.

## Workflow

1. 1. Confirm whether height is linear data and identify its intended physical range.
2. 2. Choose a feature scale and texel step consistent with the target surface size.
3. 3. Generate a preview normal map using documented conversion settings.
4. 4. Inspect seams, exaggerated ridges, noise amplification and channel orientation under grazing light.
5. 5. Compare against geometry or a known reference before accepting the conversion.

## Expected output

A conversion settings record and visual acceptance checklist.

## Guardrails

Avoid maximizing strength to make details visible; excessive gradients create unstable lighting.

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
