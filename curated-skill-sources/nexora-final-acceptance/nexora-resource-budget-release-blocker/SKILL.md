---
name: nexora-resource-budget-release-blocker
description: "Defines evidence and thresholds for performance or memory regressions that make a build unsafe for target machines."
---

# nexora resource budget release blocker

## Purpose

Use this workflow for NEXORA-scale engine work when runtime resource regressions and release gates. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. List target workload and hardware assumptions.
2. measure CPU, RAM, GPU memory, frame/tick tails, and load latency.
3. compare with a versioned baseline.
4. account for variance and background noise.
5. define hard ceilings and warning bands.
6. reproduce suspected regressions.
7. distinguish correctness failure from performance degradation.
8. require rollback or mitigation for hard-limit breaches.
9. archive raw results.

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

Resource gates are measurable and tied to declared workloads rather than arbitrary single-run numbers.

Do not invent target-hardware limits. If the runner is not representative, label results inconclusive.

## Trigger examples

- **Positive:** A code change or incident directly involves runtime resource regressions and release gates and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
