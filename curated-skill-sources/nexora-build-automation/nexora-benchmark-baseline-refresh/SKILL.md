---
name: nexora-benchmark-baseline-refresh
description: "Updates performance baselines only when workload and environment changes are justified."
---

# nexora benchmark baseline refresh

## Purpose

Use this workflow for NEXORA-scale engine work when benchmark baseline management. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Store baseline metadata with workload and hardware details.
2. detect runner or toolchain changes.
3. rerun baselines with repeated samples.
4. quantify variance and outliers.
5. compare correctness fixtures before accepting timing updates.
6. require review for threshold changes.
7. retain previous baseline history.
8. test threshold sensitivity.
9. document intentional performance trade-offs.
10. publish a baseline change summary.

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

Baseline changes are evidence-based and do not conceal regressions.

Do not refresh baselines automatically from a single run. Separate environment drift from actual performance improvement.

## Trigger examples

- **Positive:** A code change or incident directly involves benchmark baseline management and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
