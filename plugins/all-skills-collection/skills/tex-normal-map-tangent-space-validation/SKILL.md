---
name: tex-normal-map-tangent-space-validation
description: "Find tangent basis, channel orientation and green-channel convention mismatches in normal maps. Use when bevels appear inverted, seams light differently, or a normal map looks correct in one renderer but wrong in another."
---

# Tangent-Space Normal Map Validation

## Purpose

Find tangent basis, channel orientation and green-channel convention mismatches in normal maps.

## Trigger

Use when bevels appear inverted, seams light differently, or a normal map looks correct in one renderer but wrong in another.

## Required inputs

Inputs: mesh, UVs, normal map, tangent-generation method, renderer and import settings.

## Workflow

1. Verify the map is imported as non-color data and uses the expected tangent-space convention.
2. Inspect the green-channel orientation and engine-specific DirectX/OpenGL convention without changing multiple variables at once.
3. Confirm the mesh and bake used compatible tangent basis and triangulation.
4. Test a simple sphere and hard-edge test mesh under a moving key light.
5. Check UV splits, vertex normals and mirrored islands; record whether the defect is texture-side or mesh-side.

## Expected output

A diagnosis matrix separating channel inversion, tangent mismatch, UV seams and mesh-normal causes.

## Guardrails

Never flip channels blindly on the only source file; validate the change in the actual target renderer.

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
