---
name: nexora-content-diff-review
description: "Explains semantic changes between content-pack revisions before applying them to a world."
---

# nexora content diff review

## Purpose

Use this workflow for NEXORA-scale engine work when mod content updates and world compatibility review. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Compare stable IDs and schema-aware records rather than raw file order.
2. classify added, removed, renamed, and changed assets.
3. detect recipe, block-state, entity, and worldgen changes.
4. identify references affected in existing worlds.
5. estimate migration risk and resource impact.
6. generate a human-readable diff.
7. test the diff against representative saves.
8. require confirmation for destructive changes.
9. archive the review report.

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

The update report identifies user-visible and persisted-world impact before content changes are applied.

Do not assume textual similarity means semantic compatibility. Flag unknown effects rather than marking them safe.

## Trigger examples

- **Positive:** A code change or incident directly involves mod content updates and world compatibility review and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
