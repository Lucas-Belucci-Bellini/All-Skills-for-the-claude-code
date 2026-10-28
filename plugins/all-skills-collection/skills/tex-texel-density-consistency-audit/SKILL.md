---
name: tex-texel-density-consistency-audit
description: "Compare texture pixels per world unit across meshes and material sets. Use when assets appear blurry or excessively sharp beside neighboring objects."
---

# Texel Density Consistency Audit

## Purpose

Compare texture pixels per world unit across meshes and material sets.

## Trigger

Use when assets appear blurry or excessively sharp beside neighboring objects.

## Required inputs

Inputs: mesh dimensions, UV area, texture resolution and target world scale.

## Workflow

1. 1. Define the project texel-density convention in pixels per meter or equivalent.
2. 2. Measure representative UV islands and world-space surface areas.
3. 3. Identify outliers caused by stretched UVs, inconsistent scale or shared atlas assumptions.
4. 4. Check hero assets separately from background props if the project uses tiered density.
5. 5. Propose targeted UV or resolution changes and recheck memory budget.

## Expected output

An outlier list with measured density, expected range and remediation options.

## Guardrails

Do not force every asset to identical density when platform budgets or artistic priorities differ.

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
