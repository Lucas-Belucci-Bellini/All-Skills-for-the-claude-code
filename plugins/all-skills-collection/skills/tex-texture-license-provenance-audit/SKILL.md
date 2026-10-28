---
name: tex-texture-license-provenance-audit
description: "Record origin, license, attribution and modification history for texture assets. Use before sharing, publishing, selling or bundling texture packs with a game or engine."
---

# Texture License and Provenance Audit

## Purpose

Record origin, license, attribution and modification history for texture assets.

## Trigger

Use before sharing, publishing, selling or bundling texture packs with a game or engine.

## Required inputs

Inputs: asset inventory, source URLs or creator records, license texts, receipts and modification history.

## Workflow

1. 1. Enumerate textures and link each asset to a source record or mark it as original work.
2. 2. Capture license version, attribution requirements, commercial-use terms and redistribution limits.
3. 3. Record edits, generated intermediates and any third-party base material.
4. 4. Flag missing provenance, incompatible terms or unclear AI-generated asset rights for human review.
5. 5. Produce a release manifest and block unresolved assets from the distributable package.

## Expected output

A per-asset provenance manifest, attribution checklist and unresolved-risk list.

## Guardrails

Do not infer permission from public availability; do not copy restricted assets into examples or test fixtures.

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
