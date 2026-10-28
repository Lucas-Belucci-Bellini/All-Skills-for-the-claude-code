---
name: tex-texture-compression-budget-planning
description: "Plan texture formats and memory cost against platform budgets and visual requirements. Use when selecting texture compression, channel packing or resolution tiers for a release."
---

# Texture Compression Budget Planning

## Purpose

Plan texture formats and memory cost against platform budgets and visual requirements.

## Trigger

Use when selecting texture compression, channel packing or resolution tiers for a release.

## Required inputs

Inputs: texture dimensions, format support, platform memory budget, alpha needs and quality targets.

## Workflow

1. 1. Inventory textures by dimensions, channel count, alpha usage and runtime importance.
2. 2. Estimate uncompressed and candidate compressed memory, including mip-chain overhead.
3. 3. Confirm platform format support and fallback behavior.
4. 4. Inspect representative assets for block artifacts, banding and normal-map damage.
5. 5. Prioritize changes by memory saved per measured quality loss.

## Expected output

A format/resolution matrix with estimated memory and visual-risk notes.

## Guardrails

Use measured engine data when available; label estimates and do not silently drop mip levels or alpha.

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
