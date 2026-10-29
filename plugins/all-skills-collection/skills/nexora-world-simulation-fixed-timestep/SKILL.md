---
name: nexora-world-simulation-fixed-timestep
description: "Maintains stable simulation behavior when render frame rate fluctuates or pauses."
---

# nexora world simulation fixed timestep

## Purpose

Use this workflow for NEXORA-scale engine work when fixed timestep and simulation/render decoupling. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define the authoritative tick duration and maximum catch-up policy.
2. Accumulate elapsed time using a monotonic clock at the outer boundary.
3. Run simulation steps with fixed dt and explicit input assignment.
4. Cap catch-up work to prevent a spiral of death.
5. Define pause, slow motion, and time-scale semantics separately.
6. Publish interpolation snapshots without mutating simulation state.
7. Test low FPS, long stalls, variable refresh, and pause/resume.
8. Compare tick-state hashes under different render schedules.
9. Expose dropped/capped time and tick backlog metrics.

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

Simulation uses the declared timestep policy and remains stable under variable render scheduling.

Do not feed arbitrary render delta into authoritative physics. Make any discarded wall time observable rather than silently hiding it.

## Trigger examples

- **Positive:** A code change or incident directly involves fixed timestep and simulation/render decoupling and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
