---
name: nexora-physics-fixed-step-stability
description: "Keeps physics simulation stable under variable render rates and long frame stalls."
---

# nexora physics fixed step stability

## Purpose

Use this workflow for NEXORA-scale engine work when physics fixed timestep and catch-up behavior. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define fixed physics dt and maximum substeps.
2. separate render interpolation from authoritative physics.
3. accumulate elapsed time at the simulation boundary.
4. cap catch-up and expose discarded debt.
5. define input sampling at tick boundaries.
6. test tunneling, high-speed motion, and low-frame-rate stalls.
7. compare repeated runs using the same inputs.
8. measure solver cost and substep backlog.
9. document determinism limits of the chosen backend.

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

Physics obeys the declared timestep and catch-up contract with measurable error bounds.

Do not silently pass arbitrary render delta into the solver. Avoid claiming cross-platform determinism without backend evidence.

## Trigger examples

- **Positive:** A code change or incident directly involves physics fixed timestep and catch-up behavior and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
