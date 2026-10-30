---
name: nexora-texture-preview-seam-review
description: Use the NEXORA Texture Forge lit 2×2 preview and seam validator to review tile boundaries and catch normal, roughness, and occlusion defects.
---

# nexora-texture-preview-seam-review

## When to use

Use the NEXORA Texture Forge lit 2×2 preview and seam validator to review tile boundaries and catch normal, roughness, and occlusion defects.

## Required inputs

- The current NEXORA checkout and exact material, manifest, recipe, or generated output under review.
- Current source files named below; inspect the active revision before relying on implementation details.
- Intended output and acceptance criteria. Mark missing evidence unknown rather than assuming capabilities.

## Procedure

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

## Validation and expected output

- Record source revision, files inspected, commands/tests actually executed, and resulting evidence.
- Separate source inspection, automated validation, visual review, and runtime integration; one does not imply another.
- Report failures with affected material identifier and reproducible input. Do not silently normalize invalid content.
- Deliver accepted, rejected, or blocked status with concrete reasons and follow-up work.

## Failure modes and limits

- Do not hand-edit generated assets or registry outputs when derived from source definitions.
- Do not claim tests were run merely because instructions or fixtures exist.
- Do not expand this workflow into unrelated renderer, gameplay, or authoring concerns.

## Source evidence

- Evidence: `tools/texture-forge/src/preview.rs`, `tools/texture-forge/src/validator.rs`, `tools/texture-forge/src/pbr.rs`, `docs/plans/TEXTURE FORGE.md`.
