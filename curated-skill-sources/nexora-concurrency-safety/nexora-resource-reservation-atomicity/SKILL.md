---
name: nexora-resource-reservation-atomicity
description: "Prevents concurrent jobs from overbooking memory, GPU slots, file handles, or network capacity."
---

# nexora resource reservation atomicity

## Purpose

Use this workflow for NEXORA-scale engine work when shared resource reservations under concurrency. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define capacity units and ownership.
2. reserve with an atomic or serialized admission operation.
3. account for temporary and peak usage.
4. attach reservation tokens to jobs.
5. release exactly once on completion, error, or cancellation.
6. support resizing only through an explicit transition.
7. test simultaneous near-limit requests.
8. audit panic and shutdown paths.
9. expose reservation leaks and denials.

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

Concurrent admission cannot exceed declared capacity beyond known estimation error and reservations are released exactly once.

Do not perform check-then-allocate without synchronization. Avoid relying on Drop for cleanup that requires async work.

## Trigger examples

- **Positive:** A code change or incident directly involves shared resource reservations under concurrency and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
