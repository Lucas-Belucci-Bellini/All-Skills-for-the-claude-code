---
name: tex-albedo-color-space-validation
description: "Validate albedo/base-color texture encoding and prevent double gamma transforms. Use when colors look washed out, too dark, or inconsistent between an editor and runtime."
---

# Albedo Color-Space Validation

## Purpose

Validate albedo/base-color texture encoding and prevent double gamma transforms.

## Trigger

Use when colors look washed out, too dark, or inconsistent between an editor and runtime.

## Required inputs

Inputs: source image, file metadata, import settings, renderer color-management configuration and screenshots.

## Workflow

1. Determine whether the image represents color data or non-color data; albedo is normally color data.
2. Inspect embedded profile and engine import flag; document the expected transfer function.
3. Compare a known swatch through source viewer, DCC viewport and runtime under a neutral lighting setup.
4. Check for double sRGB decoding, linear interpretation of color textures, and accidental color grading baked into the map.
5. Re-import a copy with one controlled setting change and compare captures.

## Expected output

A color-space diagnosis with before/after evidence and the exact import setting to change.

## Guardrails

Do not destructively rewrite originals; preserve embedded profiles and distinguish texture errors from lighting or exposure errors.

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
