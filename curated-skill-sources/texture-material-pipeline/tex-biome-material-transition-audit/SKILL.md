---
name: tex-biome-material-transition-audit
description: "Audit texture transitions between biome-specific material sets for visible discontinuities. Use when procedural worlds or voxel terrain change abruptly across biome borders."
---

# Biome Material Transition Audit

## Purpose

Audit texture transitions between biome-specific material sets for visible discontinuities.

## Trigger

Use when procedural worlds or voxel terrain change abruptly across biome borders.

## Required inputs

Inputs: biome rules, material IDs, transition masks, world seed and screenshots at borders.

## Workflow

1. 1. Select deterministic border coordinates covering all relevant biome pairs.
2. 2. Compare albedo hue/value, roughness, normal strength and texture scale on both sides.
3. 3. Verify transition masks and material weights are normalized and stable across chunks.
4. 4. Test diagonal borders, narrow biomes and streaming boundaries.
5. 5. Propose authored transition variants or blend rules and record regression samples.

## Expected output

A biome-pair matrix with visual discontinuities and regression coordinates.

## Guardrails

Preserve deterministic world generation; visual fixes must not alter biome identity or saved world data.

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
