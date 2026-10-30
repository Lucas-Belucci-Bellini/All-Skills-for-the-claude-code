---
name: nexora-procedural-texture-seed-repair-identity
description: Diagnose reproducibility drift in NEXORA Texture Forge generate, variant, and repair modes using the recorded effective seed and generator version.
---

# nexora-procedural-texture-seed-repair-identity

## Purpose

Diagnose reproducibility drift in NEXORA Texture Forge generate, variant, and repair modes using the recorded effective seed and generator version.

## Required inputs

- The current NEXORA checkout and exact material, manifest, recipe, or generated output under review.
- Current source files named below; inspect the active revision before relying on implementation details.
- Intended output and acceptance criteria. Mark missing evidence unknown rather than assuming capabilities.

## Workflow

1. Inspect `tools/texture-forge/src/procedural.rs`, generation trace types, and current generator version before reproducing output.
2. Identify the mode. Generate derives an effective seed from material identity, appearance hash, algorithm version, and requested seed. Variant derives from source identity, variant index, algorithm version, and requested seed. Repair reads the recorded seed from the original trace.
3. Never compare pixels using only the requested seed. The trace must record the seed actually used and retain requested-seed and appearance metadata.
4. For variants, verify source identity and index. Renaming the output material must not change pixels; changing source identity or index defines a different variant.
5. For repair, require a generation trace, matching generator identity, and compatible generator version. Stop on mismatch instead of mixing pixels from different algorithms.
6. Check recipe fingerprint metadata when a named recipe participates. The recipe file can change while the material keeps the same recipe identifier; surface this drift.
7. If an algorithm change alters pixels, increment the procedural generator version and document reproduction consequences.
8. Compare output maps and provenance together. Matching albedo alone does not prove full material equivalence when height-derived maps or pipeline versions differ.
9. Return mode, material/source ID, requested and effective/recorded seed, generator ID/version, recipe fingerprint, requested maps, and pixel/byte comparison results.
- Evidence: `tools/texture-forge/src/procedural.rs`, `tools/texture-forge/src/recipe_book.rs`, `engine/asset/src/provenance.rs`, `docs/plans/TEXTURE FORGE.md`.

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

## Trigger examples

- **Positive:** A developer is authoring, diagnosing, or reviewing this exact Texture Forge concern in NEXORA.
- **Negative:** The task concerns unrelated game art direction, a generic image editor, or a renderer subsystem without this workflow's stated inputs.

## Source evidence

- Evidence: `tools/texture-forge/src/procedural.rs`, `tools/texture-forge/src/recipe_book.rs`, `engine/asset/src/provenance.rs`, `docs/plans/TEXTURE FORGE.md`.
