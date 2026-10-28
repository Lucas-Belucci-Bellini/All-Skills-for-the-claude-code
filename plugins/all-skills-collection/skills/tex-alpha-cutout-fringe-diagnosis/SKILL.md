---
name: tex-alpha-cutout-fringe-diagnosis
description: "Diagnose halos, dark fringes and coverage loss in alpha-tested textures. Use when foliage, fences, sprites or decals show outlines against contrasting backgrounds."
---

# Alpha Cutout Fringe Diagnosis

## Purpose

Diagnose halos, dark fringes and coverage loss in alpha-tested textures.

## Trigger

Use when foliage, fences, sprites or decals show outlines against contrasting backgrounds.

## Required inputs

Inputs: RGBA source, alpha mode, mip chain, compression format and runtime screenshots.

## Workflow

1. 1. Inspect RGB values in transparent pixels and whether the pipeline preserves or discards them.
2. 2. Compare straight and premultiplied alpha assumptions at import and shader stages.
3. 3. Review alpha cutoff and coverage at several mip levels.
4. 4. Test against light and dark backgrounds to expose fringe colors.
5. 5. Separate source-edge contamination from compression and shader blending.

## Expected output

A fringe diagnosis with a reproducible background test and corrective import or authoring steps.

## Guardrails

Do not flatten transparency or change the global alpha mode without checking other assets.

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
