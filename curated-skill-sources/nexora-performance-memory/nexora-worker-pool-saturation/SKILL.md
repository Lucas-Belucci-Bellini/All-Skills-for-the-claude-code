---
name: nexora-worker-pool-saturation
description: "Prevents job pools from starving urgent work or growing queues indefinitely under load."
---

# nexora worker pool saturation

## Purpose

Use this workflow for NEXORA-scale engine work when engine worker pools and task saturation. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Inventory pools, priorities, queue limits, and blocking operations.
2. measure utilization, queue age, and task duration.
3. separate CPU-bound and blocking I/O workloads.
4. define backpressure and admission rules.
5. prevent workers from synchronously waiting on work queued to the same saturated pool.
6. test burst workloads and cancellation.
7. verify shutdown can drain or abort tasks.
8. expose saturation diagnostics.
9. tune against representative workloads.

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

Worker saturation is bounded and urgent jobs retain a documented service guarantee.

Do not solve saturation only by adding threads. Avoid nested blocking waits that can deadlock the pool.

## Trigger examples

- **Positive:** A code change or incident directly involves engine worker pools and task saturation and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
