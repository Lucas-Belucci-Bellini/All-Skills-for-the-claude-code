---
name: nexora-task-priority-inversion-audit
description: "Detects lower-priority work holding resources required by latency-critical engine tasks."
---

# nexora task priority inversion audit

## Purpose

Use this workflow for NEXORA-scale engine work when task priority inversion and shared resources. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Identify priority classes and shared locks, queues, and resource reservations.
2. trace critical-path dependencies.
3. find lower-priority tasks blocking urgent tasks.
4. choose priority inheritance, resource partitioning, or shorter ownership scopes where supported.
5. avoid starvation of background work.
6. test under CPU and I/O pressure.
7. measure worst-case wait time.
8. document platform scheduler limitations.
9. add regression instrumentation.

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

Latency-critical tasks meet declared bounds under mixed-priority load or expose a measured limitation.

Do not assume OS thread priority fixes logical queue inversion. Keep starvation and fairness trade-offs explicit.

## Trigger examples

- **Positive:** A code change or incident directly involves task priority inversion and shared resources and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
