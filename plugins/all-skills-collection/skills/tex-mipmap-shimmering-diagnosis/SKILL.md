---
name: tex-mipmap-shimmering-diagnosis
description: "Identify texture shimmer, moiré and unstable detail under camera movement. Use when fine texture patterns flicker at distance or during motion."
---

# Mipmap Shimmering Diagnosis

## Purpose

Identify texture shimmer, moiré and unstable detail under camera movement.

## Trigger

Use when fine texture patterns flicker at distance or during motion.

## Required inputs

Inputs: texture, camera path, mip settings, anisotropy and recorded runtime video.

## Workflow

1. 1. Reproduce the issue with a fixed camera path and capture frame-by-frame evidence.
2. 2. Check mip chain generation, source frequency and texture compression artifacts.
3. 3. Compare point, bilinear, trilinear and anisotropic settings within the engine's supported options.
4. 4. Test whether the issue is UV aliasing, shader noise, temporal sampling or geometry shimmer.
5. 5. Validate proposed changes at multiple distances and camera angles.

## Expected output

A ranked diagnosis with capture settings and a regression camera path.

## Guardrails

Do not treat higher texture resolution as the default fix; it can increase memory while leaving aliasing intact.

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
