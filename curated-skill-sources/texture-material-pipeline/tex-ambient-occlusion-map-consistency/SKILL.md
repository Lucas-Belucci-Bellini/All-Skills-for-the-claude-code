---
name: tex-ambient-occlusion-map-consistency
description: "Check baked or authored AO maps for scale, channel wiring and double-darkening. Use when creases look black, surfaces appear dirty, or AO differs between DCC and runtime."
---

# Ambient Occlusion Map Consistency Review

## Purpose

Check baked or authored AO maps for scale, channel wiring and double-darkening.

## Trigger

Use when creases look black, surfaces appear dirty, or AO differs between DCC and runtime.

## Required inputs

Inputs: AO texture, material graph, lighting settings, bake source and runtime captures.

## Workflow

1. 1. Confirm AO is imported as non-color data and connected to the intended slot.
2. 2. Compare material-only, direct-light and indirect-light previews.
3. 3. Check whether AO is baked into albedo and also applied dynamically.
4. 4. Inspect AO radius and occlusion scale relative to object dimensions.
5. 5. Re-bake or adjust intensity only after isolating source, material and lighting causes.

## Expected output

A cause-separated report with recommended bake or shader changes.

## Guardrails

Do not remove AO globally to solve one asset's over-darkening.

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
