---
name: nexora-texture-preview-seam-review
description: Use the NEXORA Texture Forge lit 2×2 preview and seam validator to review tile boundaries and catch normal, roughness, and occlusion defects.
---

# nexora-texture-preview-seam-review

## Purpose

Use the NEXORA Texture Forge lit 2×2 preview and seam validator to review tile boundaries and catch normal, roughness, and occlusion defects.

## Required inputs

- The current NEXORA checkout and exact material, manifest, recipe, or generated output under review.
- Current source files named below; inspect the active revision before relying on implementation details.
- Intended output and acceptance criteria. Mark missing evidence unknown rather than assuming capabilities.

## Workflow

1. Inspect `tools/texture-forge/src/preview.rs` and `tools/texture-forge/src/validator.rs`; confirm constants and thresholds from current source.
2. Require an albedo map. Report missing input rather than substituting a blank image.
3. Review a 2×2 repetition: horizontal and vertical seams cross the center, exposing edge discontinuities hidden by a single-tile preview.
4. Keep lighting fixed across revisions. The preview uses constant light and a limited Lambert plus Blinn–Phong approximation in linear light; it is an inspection aid, not a production renderer.
5. Inspect normal orientation/strength, roughness variation, metallic response, and ambient occlusion. Record absent maps and any fallback to material PBR parameters or neutral occlusion.
6. Account for preview downsampling. Whole-number reduction bounds output dimensions; do not mistake preview filtering for source-map resolution.
7. Run numeric seam validation on underlying maps too. Current source documents a maximum seam ratio of 1.5; reread the constant and measurement method before using it as a release gate.
8. Compare visual and numeric evidence. A passing seam score does not prove correct material response; a convincing preview does not prove PNG/runtime compatibility.
9. Capture material ID, source map hashes, preview dimensions, findings, and tool revision. Classify findings as seam, map-content, shading approximation, or missing-input issues.
- Evidence: `tools/texture-forge/src/preview.rs`, `tools/texture-forge/src/validator.rs`, `tools/texture-forge/src/pbr.rs`, `docs/plans/TEXTURE FORGE.md`.

## Validation checklist

- [ ] Confirmed the current source contract and recorded the exact source revision.
- [ ] Validated representative inputs, including malformed or boundary cases relevant to this workflow.
- [ ] Recorded commands and results; distinguished checks actually run from proposed checks.
- [ ] Compared generated or reviewed output against the stated invariants and acceptance criteria.

## Required output

- A concise decision (accepted, rejected, or blocked), affected material identifiers, source revision, evidence paths, validation results, and actionable follow-up items.

## Boundaries and failure handling

- Do not hand-edit generated assets or registry outputs when derived from source definitions.
- Do not claim tests were run merely because instructions or fixtures exist.
- Do not expand this workflow into unrelated renderer, gameplay, or authoring concerns.

## Trigger examples

- **Positive:** A developer is authoring, diagnosing, or reviewing this exact Texture Forge concern in NEXORA.
- **Negative:** The task concerns unrelated game art direction, a generic image editor, or a renderer subsystem without this workflow's stated inputs.

## Source evidence

- Evidence: `tools/texture-forge/src/preview.rs`, `tools/texture-forge/src/validator.rs`, `tools/texture-forge/src/pbr.rs`, `docs/plans/TEXTURE FORGE.md`.
