---
name: tex-pbr-material-channel-audit
description: "Audit PBR texture channels and their material interpretation before an asset is accepted. Use when reviewing a physically based material set for a game engine or DCC pipeline."
---

# PBR Material Channel Audit

## Purpose

Audit PBR texture channels and their material interpretation before an asset is accepted.

## Trigger

Use when reviewing a physically based material set for a game engine or DCC pipeline.

## Required inputs

Inputs: texture files, material graph, renderer conventions, target platform and reference captures.

## Workflow

1. Inventory base color, roughness, metallic, normal, occlusion and optional height/emission maps.
2. Confirm each channel's semantic meaning, packed-channel layout and file naming against the target renderer.
3. Check that dielectric materials do not use arbitrary high metallic values and that color data is not accidentally treated as linear data or vice versa.
4. Render neutral-light and grazing-light previews; compare against the intended material response.
5. Record missing, misrouted or redundant maps and the smallest corrective action.

## Expected output

A channel-to-slot matrix, findings with severity, and a reproducible validation scene or checklist.

## Guardrails

Never infer physically correct values from a filename alone; preserve source assets and record renderer-specific assumptions.

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
