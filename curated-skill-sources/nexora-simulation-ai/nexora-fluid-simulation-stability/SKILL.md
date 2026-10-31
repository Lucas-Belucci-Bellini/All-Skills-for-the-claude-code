---
name: nexora-fluid-simulation-stability
description: "Controls numerical and computational stability for fluid or gas simulation in voxel worlds."
---

# nexora fluid simulation stability

## Purpose

Use this workflow for NEXORA-scale engine work when fluid simulation and numerical instability. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Document update scheme, units, timestep, and conservation assumptions.
2. define per-cell and per-region bounds.
3. separate active from sleeping regions.
4. limit propagation work per tick deterministically.
5. define boundary conditions for unloaded neighbors.
6. detect non-finite values and impossible mass changes.
7. test closed systems and extreme flows.
8. measure worst-case update cost.
9. document approximation and persistence semantics.

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

Simulation remains within declared numerical bounds and conservation error is measured.

Do not claim exact conservation for a lossy approximation or let unloaded neighbors implicitly create/destroy quantities.

## Trigger examples

- **Positive:** A code change or incident directly involves fluid simulation and numerical instability and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
