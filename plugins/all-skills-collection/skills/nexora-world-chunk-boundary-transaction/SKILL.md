---
name: nexora-world-chunk-boundary-transaction
description: "Ensures edits and derived-data updates spanning chunk borders are committed consistently."
---

# nexora world chunk boundary transaction

## Purpose

Use this workflow for NEXORA-scale engine work when cross-chunk world edits and boundary consistency. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Determine the full affected chunk set before mutation.
2. order chunk acquisition deterministically.
3. validate all chunks and neighbor revisions.
4. prepare a reversible edit plan.
5. apply authoritative changes atomically within declared scope.
6. propagate dirty state to every dependent neighbor.
7. handle unavailable neighbors explicitly.
8. test edits on corners and negative coordinates.
9. verify save/load preserves the transaction.
10. report partial-support limits.

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

Cross-border edits leave neighboring chunk data and derived caches consistent.

Do not lock chunks in incidental traversal order. If true atomicity is unavailable, define an explicit recoverable transaction protocol.

## Trigger examples

- **Positive:** A code change or incident directly involves cross-chunk world edits and boundary consistency and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
