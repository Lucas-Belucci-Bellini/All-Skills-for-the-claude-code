---
name: nexora-ai-navigation-reference-tests
description: "Compares navigation results against a simple reference model for small generated worlds."
---

# nexora ai navigation reference tests

## Purpose

Use this workflow for NEXORA-scale engine work when NPC pathfinding correctness and navigation regression. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Generate small deterministic obstacle maps.
2. compute reference reachability or shortest paths with a simple trusted solver.
3. run engine navigation against the same graph.
4. compare reachability and path cost.
5. include negative coordinates and boundaries.
6. test dynamic obstacle updates.
7. shrink failing maps.
8. store seed and map fixture.
9. measure search expansions.
10. document differences caused by intended approximation.

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

Navigation agrees with reference invariants on bounded fixtures and failures are reproducible.

Do not compare exact path shape where multiple equal-cost paths are valid. Define tie-breaking and tolerance before comparing costs.

## Trigger examples

- **Positive:** A code change or incident directly involves NPC pathfinding correctness and navigation regression and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
