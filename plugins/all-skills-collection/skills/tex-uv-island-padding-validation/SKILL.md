---
name: tex-uv-island-padding-validation
description: "Check UV island gutters against texture resolution and mip requirements. Use when texture bleeding appears around UV islands or at lower mip levels."
---

# UV Island Padding Validation

## Purpose

Check UV island gutters against texture resolution and mip requirements.

## Trigger

Use when texture bleeding appears around UV islands or at lower mip levels.

## Required inputs

Inputs: UV layout, output resolution, island spacing, mip count and target filtering.

## Workflow

1. 1. Measure island-to-island pixel gaps at the exported resolution.
2. 2. Include expected dilation/padding and mip reduction in the safety margin.
3. 3. Flag thin gaps, touching islands and islands near texture borders.
4. 4. Preview a high-contrast test bake with mipmaps enabled.
5. 5. Recommend UV repacking, dilation settings or texture-array isolation.

## Expected output

A UV padding report with minimum-gap measurements and risky island pairs.

## Guardrails

Do not change UV layout without checking animation, lightmap or downstream bake dependencies.

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
