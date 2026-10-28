---
name: tex-world-space-material-blending
description: "Validate world-space material blending across slope, height and biome boundaries. Use when terrain layers show abrupt bands, coordinate drift or inconsistent blend width."
---

# World-Space Material Blend Validation

## Purpose

Validate world-space material blending across slope, height and biome boundaries.

## Trigger

Use when terrain layers show abrupt bands, coordinate drift or inconsistent blend width.

## Required inputs

Inputs: terrain shader, world coordinates, slope/height rules, masks and representative terrain samples.

## Workflow

1. 1. Map each blend input to a documented physical or gameplay meaning.
2. 2. Test flat ground, steep slopes, cliffs, shorelines and world-origin boundaries.
3. 3. Verify blend widths remain stable under chunk boundaries and object transforms.
4. 4. Inspect normal and roughness continuity as well as color blending.
5. 5. Capture deterministic seed and coordinates for any boundary artifact.

## Expected output

A terrain test matrix with affected coordinates and blend-rule recommendations.

## Guardrails

Do not couple visual blending to unstable per-frame random values or chunk-local coordinates unintentionally.

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
