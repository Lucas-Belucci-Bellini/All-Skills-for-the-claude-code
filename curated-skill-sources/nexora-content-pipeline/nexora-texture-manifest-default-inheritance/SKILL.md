---
name: nexora-texture-manifest-default-inheritance
description: Audit and author NEXORA Texture Forge batch manifests where shared defaults, per-material overrides, identifiers, and schema validation must remain predictable.
---

# nexora-texture-manifest-default-inheritance

## When to use

Audit and author NEXORA Texture Forge batch manifests where shared defaults, per-material overrides, identifiers, and schema validation must remain predictable.

## Required inputs

- The current NEXORA checkout and exact material, manifest, recipe, or generated output under review.
- Current source files named below; inspect the active revision before relying on implementation details.
- Intended output and acceptance criteria. Mark missing evidence unknown rather than assuming capabilities.

## Procedure

1. Inspect `tools/texture-forge/src/manifest.rs` and current format docs. Confirm schema and allowed top-level, defaults, and entry fields from source.
2. Distinguish a batch manifest from a build plan: manifests declare materials inline; build plans reference existing definition files and apply policy and seed overrides. Route plan-specific work to `nexora-texture-forge-build-plan-integrity`.
3. Resolve each entry in order: baseline defaults, manifest defaults, then explicit entry overrides. For PBR, verify a partial override changes only the named parameter.
4. Unknown fields at every nesting level are input errors; do not silently ignore typos.
5. Verify namespace and prefix identifier construction. Prefix is a path segment; equal leaf names under distinct prefixes are distinct, while duplicate fully-qualified identifiers must fail.
6. Reject unsupported newer schemas rather than guessing or downgrading.
7. Recheck implementation constants. Current source declares schema 1, at most 4,096 materials, default seed zero, and default author NEXORA; do not generalize these values to other tools.
8. Keep manifest parsing separate from Forge batch execution. A malformed manifest can fail before generation; once parsed, batch execution records per-entry outcomes and failures.
9. Return a table of resolved identifier, inherited values, explicit overrides, and validation result, with the exact manifest path and command used.
- Evidence: `tools/texture-forge/src/manifest.rs`, `tools/texture-forge/src/forge.rs`, `docs/plans/TEXTURE FORGE.md`.

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

- Evidence: `tools/texture-forge/src/manifest.rs`, `tools/texture-forge/src/forge.rs`, `docs/plans/TEXTURE FORGE.md`.
