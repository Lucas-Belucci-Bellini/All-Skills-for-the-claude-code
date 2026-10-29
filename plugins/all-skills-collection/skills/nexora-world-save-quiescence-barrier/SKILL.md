---
name: nexora-world-save-quiescence-barrier
description: "Captures a consistent save point while world simulation, streaming, and network commands continue."
---

# nexora world save quiescence barrier

## Purpose

Use this workflow for NEXORA-scale engine work when world save snapshot barriers. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define the tick boundary for a save snapshot.
2. stop or queue mutations only for the minimum required interval.
3. coordinate chunk and entity revisions.
4. ensure queued commands have a clear before/after relationship to the snapshot.
5. bound barrier duration.
6. test saves during worldgen and multiplayer activity.
7. resume producers on all failure paths.
8. verify snapshot hashes.
9. expose save pause and backlog metrics.

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

Every save represents a coherent declared tick without leaving producers blocked after failure.

Do not hold global world locks during slow disk I/O. Document commands accepted during the barrier.

## Trigger examples

- **Positive:** A code change or incident directly involves world save snapshot barriers and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
