---
name: nexora-feature-flag-retirement-report
description: "Summarizes feature flags and fallback paths that are ready for retirement or still required for safety."
---

# nexora feature flag retirement report

## Purpose

Use this workflow for NEXORA-scale engine work when engine feature flag cleanup and release maintenance. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Inventory flags and their call sites.
2. identify persisted or network-visible behavior.
3. measure actual use where safe.
4. classify obsolete, transitional, and safety-critical flags.
5. verify fallback coverage.
6. check downstream mod and build consumers.
7. propose a removal sequence.
8. add tests for removed and retained paths.
9. document migration and rollback.
10. require owner review.

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

Flag retirement is based on usage and compatibility evidence with a safe removal sequence.

Do not remove safety fallbacks solely because a flag is rarely used.

## Trigger examples

- **Positive:** A code change or incident directly involves engine feature flag cleanup and release maintenance and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
