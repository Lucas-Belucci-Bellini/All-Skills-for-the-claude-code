---
name: tex-material-variant-naming-contract
description: "Define predictable names and metadata for material variants and texture sets. Use when multiple biomes, damage states, seasons or quality tiers share material assets."
---

# Material Variant Naming Contract

## Purpose

Define predictable names and metadata for material variants and texture sets.

## Trigger

Use when multiple biomes, damage states, seasons or quality tiers share material assets.

## Required inputs

Inputs: asset taxonomy, naming conventions, engine lookup rules and current examples.

## Workflow

1. 1. Define stable tokens for domain, material family, variant, resolution and channel.
2. 2. Separate semantic identity from export version and platform encoding.
3. 3. Test names against case-sensitive paths and automated asset discovery.
4. 4. Detect ambiguous aliases and collisions across folders.
5. 5. Publish examples for base, variant, packed map and generated outputs.

## Expected output

A naming grammar, examples and collision checks suitable for CI.

## Guardrails

Do not rename published assets without a migration map for references and saves.

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
