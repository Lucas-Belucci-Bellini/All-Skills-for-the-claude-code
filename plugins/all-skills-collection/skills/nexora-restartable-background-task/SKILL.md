---
name: nexora-restartable-background-task
description: "Makes long-running worldgen, import, and maintenance tasks restartable after cancellation or process interruption."
---

# nexora restartable background task

## Purpose

Use this workflow for NEXORA-scale engine work when restartable background engine jobs. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define task identity and durable checkpoints where needed.
2. separate completed units from in-progress work.
3. make each unit idempotent or transactional.
4. persist progress atomically.
5. validate checkpoint version and inputs on restart.
6. support cancellation at safe boundaries.
7. test interruption and retry.
8. bound checkpoint size and frequency.
9. report resumed versus restarted work.

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

Interrupted tasks resume safely or restart without duplicate side effects.

Do not checkpoint uncommitted partial state as complete. In-memory tasks should not be described as durable across process restarts.

## Trigger examples

- **Positive:** A code change or incident directly involves restartable background engine jobs and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
