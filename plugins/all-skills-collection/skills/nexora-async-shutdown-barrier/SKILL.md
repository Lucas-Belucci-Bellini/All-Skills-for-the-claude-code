---
name: nexora-async-shutdown-barrier
description: "Coordinates graceful shutdown across asynchronous workers, renderer, networking, and persistence without dropping critical writes."
---

# nexora async shutdown barrier

## Purpose

Use this workflow for NEXORA-scale engine work when async shutdown and worker lifecycle. Treat current repository behavior as the source of truth and mark missing architecture or constraints as unknown rather than inventing them.

## Required inputs

- The relevant source files, owning crates/modules, and current change or incident.
- Acceptance criteria, supported platforms, compatibility constraints, and known resource limits.
- Existing tests, logs, fixtures, and a minimal reproduction when available.
- Explicit assumptions and unresolved questions; do not infer unverified NEXORA implementation details.

## Workflow

1. Enumerate long-lived tasks and owned resources.
2. define shutdown phases and ordering.
3. stop accepting new work before draining queues.
4. propagate cancellation tokens.
5. give persistence and network flushes bounded deadlines.
6. ensure task joins report panics/errors.
7. define which tasks may be aborted after timeout.
8. make shutdown idempotent.
9. test shutdown during generation, save, network disconnect, and partial initialization.

## Validation checklist

- [ ] The change is tied to a measurable requirement or a reproducible failure.
- [ ] Ownership, lifecycle, compatibility, and failure behavior are documented.
- [ ] Tests cover normal, boundary, repeated, and failure-path behavior.
- [ ] No hidden assumptions about unverified NEXORA subsystems remain.
- [ ] Focused tests, formatting, and applicable lint/static checks were run; skipped checks are listed.
- [ ] Performance or reliability claims include reproducible evidence where relevant.

## Required output

- A concise decision and scope statement.
- The invariants and implementation plan or reviewed diff.
- Tests run, results, and reproducible evidence.
- Risks, compatibility implications, and unresolved follow-up items.

## Boundaries and failure handling

A lifecycle diagram, timeout policy, task inventory, and tests prove no accepted critical save is silently abandoned.

Never await a task while holding a lock it needs to finish. Report forced aborts and incomplete flushes clearly.

## Trigger examples

- **Positive:** A code change or incident directly involves nexora async shutdown barrier and needs a reproducible validation plan.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The request is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The task is only documentation or content work with no runtime, reliability, or code behavior impact.
