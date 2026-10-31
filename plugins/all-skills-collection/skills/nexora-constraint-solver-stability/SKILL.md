---
name: nexora-constraint-solver-stability
description: "Audits rigid-body constraint solver convergence and stability under difficult contacts."
---

# nexora constraint solver stability

## Purpose

Use this workflow for NEXORA-scale engine work when physics constraints and solver instability. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. List constraints and expected invariants.
2. verify mass, inertia, and parameter ranges.
3. define solver iteration and warm-start policy.
4. ensure stable constraint identities where required.
5. test stacked bodies and extreme mass ratios.
6. track residuals and energy drift.
7. compare repeatable seeds.
8. profile iteration cost.
9. document tolerances and backend limitations.

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

Constraint behavior stays within declared error bounds with repeatable regression fixtures.

Do not hide instability by increasing iterations without diagnosis. Reject non-finite parameters before solver entry.

## Trigger examples

- **Positive:** A code change or incident directly involves physics constraints and solver instability and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
