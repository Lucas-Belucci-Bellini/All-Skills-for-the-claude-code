---
name: nexora-texture-recipe-periodic-tiling-contract
description: Review Texture Forge procedural recipes for tile-periodic structural layers, especially board strips, offset courses, and seamless material boundaries.
---

# nexora-texture-recipe-periodic-tiling-contract

## When to use

Review Texture Forge procedural recipes for tile-periodic structural layers, especially board strips, offset courses, and seamless material boundaries.

## Required inputs

- The current NEXORA checkout and exact material, manifest, recipe, or generated output under review.
- Current source files named below; inspect the active revision before relying on implementation details.
- Intended output and acceptance criteria. Mark missing evidence unknown rather than assuming capabilities.

## Procedure

1. Inspect `tools/texture-forge/src/recipe.rs` and recipe resolution before changing a family. Recipe parameters are art direction, not renderer-wide constants.
2. Inventory active layers: mottle, strips, courses, and speckle. Record palette ramp, contrast, quantisation levels, and relief separately from structural layer parameters.
3. For strips, verify an integer number of board periods spans the texture. Review gap clamping, edge darkening, per-board jitter, and grain orientation; a plausible board pattern can still break at horizontal wrap.
4. For courses, verify the even-row condition required for the alternating offset to meet itself at vertical wrap. Check columns and mortar width too; do not hide a seam by suppressing mortar at one edge.
5. Confirm every noise field used by a seamless recipe wraps consistently on both axes. Do not assume one periodic layer makes the whole composition periodic.
6. Generate representative textures at target resolution. Inspect all four edges and a 2×2 tiled view, then compare the numeric seam validator result.
7. Isolate a failure by disabling one layer at a time in a temporary fixture; restore the intended composition and rerun the full checks.
8. Keep style tuning separate from structural validity: palette, contrast, and relief cannot waive periodicity requirements.
9. Record category, recipe revision/fingerprint, seed, resolution, and seam findings.
- Evidence: `tools/texture-forge/src/recipe.rs`, `tools/texture-forge/src/noise.rs`, `tools/texture-forge/src/validator.rs`, `tools/texture-forge/src/preview.rs`.

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

- Evidence: `tools/texture-forge/src/recipe.rs`, `tools/texture-forge/src/noise.rs`, `tools/texture-forge/src/validator.rs`, `tools/texture-forge/src/preview.rs`.
