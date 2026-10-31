---
name: nexora-chunk-simulation-activation
description: "Controls when voxel chunks join or leave active simulation without duplicating entities or losing state."
---

# nexora chunk simulation activation

## Purpose

Use this workflow for NEXORA-scale engine work when chunk activation and sleeping simulation. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define loaded, resident, active, sleeping, and evicted states separately.
2. specify activation prerequisites for collision, entities, and neighbor data.
3. make transitions idempotent.
4. persist required state before evicting active simulation.
5. transfer entity references and scheduled jobs across transitions.
6. test rapid movement and unload/reload.
7. measure activation spikes and active population.
8. document timer behavior while sleeping.
9. assert that state transitions preserve ownership.

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

Chunk transitions do not duplicate actors or discard required state, and activation cost is bounded.

Do not treat loaded geometry as proof simulation is initialized. Avoid pausing authoritative timers without a documented time model.

## Trigger examples

- **Positive:** A code change or incident directly involves chunk activation and sleeping simulation and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
