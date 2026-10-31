---
name: nexora-gameplay-balance-scenario-harness
description: "Runs repeatable gameplay scenarios to detect balance regressions across NPCs, items, and progression."
---

# nexora gameplay balance scenario harness

## Purpose

Use this workflow for NEXORA-scale engine work when gameplay balance regression and simulation experiments. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define measurable gameplay outcomes and scenario boundaries.
2. fix seed, content set, and simulation version.
3. separate random variation from code changes.
4. run repeated trials with recorded inputs.
5. collect survival, progression, resource, and performance metrics.
6. compare distributions rather than one run.
7. detect degenerate strategies or infinite loops.
8. preserve scenario fixtures.
9. document accepted variance.
10. review changes to scenario assumptions.

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

Balance comparisons are reproducible and include statistical variation and scenario context.

Do not claim balance from one deterministic seed. Avoid tuning to a test harness that does not represent actual gameplay.

## Trigger examples

- **Positive:** A code change or incident directly involves gameplay balance regression and simulation experiments and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
