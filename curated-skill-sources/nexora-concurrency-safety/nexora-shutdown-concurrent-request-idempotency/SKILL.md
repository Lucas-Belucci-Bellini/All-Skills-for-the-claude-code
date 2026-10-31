---
name: nexora-shutdown-concurrent-request-idempotency
description: "Makes shutdown safe when multiple threads, signals, or subsystems request it simultaneously."
---

# nexora shutdown concurrent request idempotency

## Purpose

Use this workflow for NEXORA-scale engine work when concurrent shutdown requests and teardown races. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define one shutdown state machine and owner.
2. atomically transition from running to stopping once.
3. make repeated requests join the same shutdown process.
4. stop admission before draining work.
5. coordinate persistence flush and device teardown.
6. bound waiters and deadlines.
7. test concurrent signals and callback-triggered shutdown.
8. handle partial initialization.
9. report forced aborts and unfinished resources.

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

Shutdown runs once with consistent ordering even when requested concurrently.

Do not let multiple callers tear down the same resource independently. Avoid deadlocking by joining the shutdown task from itself.

## Trigger examples

- **Positive:** A code change or incident directly involves concurrent shutdown requests and teardown races and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
