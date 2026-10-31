---
name: nexora-memory-budget-attribution
description: "Attributes resident and transient memory to engine subsystems so large-world growth stays within declared limits."
---

# nexora memory budget attribution

## Purpose

Use this workflow for NEXORA-scale engine work when engine memory budgets and growth regressions. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define memory categories and ownership boundaries.
2. capture baseline resident, committed, and peak transient memory.
3. sample allocations by subsystem and workload phase.
4. distinguish retained cache memory from leaks.
5. record asset/chunk/entity counts with measurements.
6. compare repeated load/unload cycles.
7. set warning and hard ceilings.
8. test worst-case worlds and mod sets.
9. publish top contributors and uncertainty.

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

Memory reports identify owners and distinguish expected caches from unexplained growth.

Do not equate process RSS alone with a leak. Avoid collecting high-cardinality allocation traces indefinitely.

## Trigger examples

- **Positive:** A code change or incident directly involves engine memory budgets and growth regressions and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
