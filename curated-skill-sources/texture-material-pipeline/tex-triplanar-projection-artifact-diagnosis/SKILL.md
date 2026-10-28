---
name: tex-triplanar-projection-artifact-diagnosis
description: "Diagnose stretching, blending bands and projection transitions in triplanar materials. Use when world-space or tri-planar mapping looks smeared around corners or changes scale across faces."
---

# Triplanar Projection Artifact Diagnosis

## Purpose

Diagnose stretching, blending bands and projection transitions in triplanar materials.

## Trigger

Use when world-space or tri-planar mapping looks smeared around corners or changes scale across faces.

## Required inputs

Inputs: shader graph, object scale, world/object-space choice, texture frequency and screenshots.

## Workflow

1. 1. Confirm projection coordinates and object transforms use the intended space.
2. 2. Inspect blend sharpness and axis weights on a cube, sphere and angled surface.
3. 3. Check non-uniform object scaling and whether coordinates are normalized or scaled twice.
4. 4. Compare projection at corners, shallow angles and large world coordinates.
5. 5. Adjust one parameter at a time and preserve a test scene.

## Expected output

A symptom-to-cause table and a small reproducible material test.

## Guardrails

Do not hide projection seams by increasing blend softness if that destroys surface detail.

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
