---
name: tex-seamless-tileability-review
description: "Detect visible borders, value discontinuities and pattern repetition in tiling textures. Use for terrain, voxel blocks, floors, walls or any material repeated across large surfaces."
---

# Seamless Texture Tileability Review

## Purpose

Detect visible borders, value discontinuities and pattern repetition in tiling textures.

## Trigger

Use for terrain, voxel blocks, floors, walls or any material repeated across large surfaces.

## Required inputs

Inputs: texture image, intended tile scale, repeat count and target filtering settings.

## Workflow

1. Create a 3×3 repeat preview at the intended in-world scale.
2. Inspect opposite edges for color, luminance, normal and height discontinuities.
3. Check diagonal and feature continuity; a matching border color alone does not guarantee a seamless tile.
4. Preview under mipmapping and anisotropic filtering at oblique angles.
5. Separate edge seams from obvious periodic motifs and recommend offset, clone, procedural or authored fixes.

## Expected output

A repeat-preview checklist with seam locations and a suggested non-destructive repair method.

## Guardrails

Avoid cloning identifiable copyrighted textures into a new asset; use authorized source material or original procedural work.

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
