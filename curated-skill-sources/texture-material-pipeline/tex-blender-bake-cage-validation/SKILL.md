---
name: tex-blender-bake-cage-validation
description: "Validate bake cage distances, ray misses and projection artifacts before texture export. Use when baking normals, ambient occlusion or curvature from high-poly to low-poly meshes in Blender."
---

# Blender Texture Bake Cage Validation

## Purpose

Validate bake cage distances, ray misses and projection artifacts before texture export.

## Trigger

Use when baking normals, ambient occlusion or curvature from high-poly to low-poly meshes in Blender.

## Required inputs

Inputs: high/low meshes, cage, UV map, bake settings and target tangent convention.

## Workflow

1. 1. Verify transforms, triangulation assumptions, normals and UV overlap policy.
2. 2. Inspect cage coverage around thin parts, cavities and intersecting surfaces.
3. 3. Run a diagnostic bake with clear miss colors or equivalent evidence.
4. 4. Check skewing, gradients, seams and ray projection at hard edges.
5. 5. Re-bake after a single controlled cage or mesh adjustment and compare outputs.

## Expected output

A bake-readiness checklist and annotated artifact report.

## Guardrails

Keep original high/low meshes and bake settings; do not compensate for a bad cage by painting over every artifact.

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
