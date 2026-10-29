---
name: nexora-world-event-scheduler-determinism
description: "Schedules weather, NPC, and world events consistently despite parallel execution and save/load boundaries."
---

# nexora world event scheduler determinism

## Purpose

Use this workflow for NEXORA-scale engine work when world event scheduling and deterministic ticks. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define event time base and ordering keys.
2. derive random choices from stable event IDs and world seed.
3. separate scheduling from event execution.
4. persist durable scheduled events with schema versions.
5. define cancellation and replacement semantics.
6. test simultaneous events and save/load.
7. prevent duplicate dispatch after restart.
8. bound event queue size.
9. expose overdue-event diagnostics.

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

Scheduled events execute once in the documented order and survive save/load consistently.

Do not rely on thread wake order or wall-clock timers for authoritative event ordering.

## Trigger examples

- **Positive:** A code change or incident directly involves world event scheduling and deterministic ticks and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
