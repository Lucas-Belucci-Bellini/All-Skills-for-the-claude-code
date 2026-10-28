---
name: tex-material-import-preset-validation
description: "Validate import presets for texture types, compression, mipmaps and platform overrides. Use when imports vary between developers or builds, or when a texture silently uses the wrong settings."
---

# Material Texture Import Preset Validation

## Purpose

Validate import presets for texture types, compression, mipmaps and platform overrides.

## Trigger

Use when imports vary between developers or builds, or when a texture silently uses the wrong settings.

## Required inputs

Inputs: engine version, import preset, asset classes, platform targets and build logs.

## Workflow

1. 1. List required presets for color, normal, mask, HDR, UI and pixel-art textures.
2. 2. Compare preset values with actual imported asset metadata.
3. 3. Verify platform overrides, alpha handling, mip generation and streaming flags.
4. 4. Reimport a small representative fixture set and compare generated artifacts.
5. 5. Add a machine-checkable rule or CI report for recurring drift.

## Expected output

A preset conformance matrix and a minimal regression fixture set.

## Guardrails

Avoid mass reimporting the entire project until the preset diff and rollback path are reviewed.

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
