---
name: nexora-editor-undo-transaction
description: "Makes editor undo and redo operations atomic across multi-object and world edits."
---

# nexora editor undo transaction

## Purpose

Use this workflow for NEXORA-scale engine work when engine editor undo/redo and command history. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define command identity and reversible state delta.
2. group related edits into one transaction.
3. validate preconditions before applying undo or redo.
4. keep history bounded by memory budget.
5. handle deleted resources and changed world versions.
6. ensure derived systems receive invalidations.
7. test nested commands and repeated undo/redo.
8. persist history only if explicitly required.
9. report commands that can no longer be replayed.

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

Undo/redo restores the documented state and cannot leave partially applied edits.

Do not store unbounded full-world snapshots by default. Reject stale commands rather than applying them to changed state blindly.

## Trigger examples

- **Positive:** A code change or incident directly involves engine editor undo/redo and command history and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
