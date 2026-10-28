---
name: tex-procedural-noise-scale-calibration
description: "Calibrate procedural noise frequency and amplitude to physical or in-game scale. Use when generated materials look too noisy, too smooth or inconsistent across object sizes."
---

# Procedural Texture Noise Scale Calibration

## Purpose

Calibrate procedural noise frequency and amplitude to physical or in-game scale.

## Trigger

Use when generated materials look too noisy, too smooth or inconsistent across object sizes.

## Required inputs

Inputs: node graph, world scale, material reference, target viewing distance and random seed.

## Workflow

1. 1. Identify coordinate source and convert desired feature size into coordinate frequency.
2. 2. Separate primary forms, secondary variation and microdetail into distinct scales.
3. 3. Fix a seed to make comparisons deterministic.
4. 4. Render close, gameplay and distant views under neutral lighting.
5. 5. Tune amplitude and frequency independently, then test tiling and repetition.

## Expected output

A scale table for each noise layer with deterministic preview settings.

## Guardrails

Avoid using random noise to disguise poor UVs or unresolved geometry problems.

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
