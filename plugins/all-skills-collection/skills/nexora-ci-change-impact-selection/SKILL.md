---
name: nexora-ci-change-impact-selection
description: "Selects focused validation suites from changed engine subsystems without skipping required release gates."
---

# nexora ci change impact selection

## Purpose

Use this workflow for NEXORA-scale engine work when CI test selection and monorepo change impact. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Map source paths and crate dependencies to test suites.
2. define conservative fallback for unknown paths.
3. always run critical shared-contract checks.
4. detect generated file and schema changes.
5. validate selection rules against historical changes.
6. compare selective results with full-suite runs periodically.
7. record skipped suites and reasons.
8. measure time savings.
9. require full suite for release candidates.

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

Selective CI saves time while preserving mandatory checks and falls back safely when impact is uncertain.

Do not skip tests because a path pattern failed to match. Unknown or cross-cutting changes should trigger broader validation.

## Trigger examples

- **Positive:** A code change or incident directly involves CI test selection and monorepo change impact and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
