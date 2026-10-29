---
name: nexora-editor-save-dirty-state
description: "Tracks unsaved editor changes accurately across assets, scenes, and world data."
---

# nexora editor save dirty state

## Purpose

Use this workflow for NEXORA-scale engine work when editor dirty state and save prompts. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define which edits mark each resource dirty.
2. propagate changes through dependency relationships.
3. clear dirty flags only after durable save success.
4. handle concurrent edits during save with revision checks.
5. distinguish generated caches from user-authored content.
6. test save failures and edits arriving mid-save.
7. expose per-resource dirty reasons.
8. ensure close prompts reflect unsaved durable state.
9. document auto-save semantics.

## Validation checklist

- [ ] The invariant and measurable acceptance criteria are explicit.
- [ ] Ownership, lifecycle, and failure handling are documented.
- [ ] Tests cover normal, boundary, repeated, and failure cases.
- [ ] Changes preserve source/plugin byte parity and catalog uniqueness.
- [ ] Focused tests, formatting, and applicable static checks pass; skipped checks are listed.
- [ ] Performance and reliability claims include reproducible evidence.

## Required output

Provide the decision and scope, invariants, code paths reviewed or changed, tests and results, compatibility implications, and unresolved risks.

## Boundaries and failure handling

Dirty state cannot clear for changes that were not successfully persisted.

Do not clear all dirty flags after a partial save. Avoid prompting for regenerated cache files unless user-authored data is at risk.

## Trigger examples

- **Positive:** A code change or incident directly involves editor dirty state and save prompts and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
