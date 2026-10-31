---
name: nexora-audio-clock-synchronization
description: "Keeps audio events aligned with simulation ticks while accounting for device and buffer latency."
---

# nexora audio clock synchronization

## Purpose

Use this workflow for NEXORA-scale engine work when audio scheduling and simulation clock drift. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Identify simulation and audio clock domains.
2. measure output latency and buffer sizes.
3. map scheduled tick events to audio time.
4. account for pause, device restart, and drift.
5. define late-event policy.
6. keep audio callbacks bounded.
7. test long sessions and device changes.
8. compare scheduled versus observed timing.
9. document platform differences.

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

Scheduled audio timing stays within measured tolerance across device lifecycle events.

Do not block audio callbacks on simulation locks or assume device timestamps share the simulation clock.

## Trigger examples

- **Positive:** A code change or incident directly involves audio scheduling and simulation clock drift and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
