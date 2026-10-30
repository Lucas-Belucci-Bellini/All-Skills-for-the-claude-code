---
name: nexora-texture-manifest-default-inheritance
description: Audit and author NEXORA Texture Forge batch manifests where shared defaults, per-material overrides, identifiers, and schema validation must remain predictable.
---

# nexora-texture-manifest-default-inheritance

## Purpose

Audit and author NEXORA Texture Forge batch manifests where shared defaults, per-material overrides, identifiers, and schema validation must remain predictable.

## Required inputs

- The current NEXORA checkout and exact material, manifest, recipe, or generated output under review.
- Current source files named below; inspect the active revision before relying on implementation details.
- Intended output and acceptance criteria. Mark missing evidence unknown rather than assuming capabilities.

## Workflow

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

- Evidence: `tools/texture-forge/src/manifest.rs`, `tools/texture-forge/src/forge.rs`, `docs/plans/TEXTURE FORGE.md`.
