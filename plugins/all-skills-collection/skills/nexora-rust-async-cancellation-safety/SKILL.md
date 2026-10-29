---
name: nexora-rust-async-cancellation-safety
description: "Ensures dropping or cancelling an async Rust future cannot leave partially committed engine state or leaked resources."
---

# nexora rust async cancellation safety

## Purpose

Use this workflow for NEXORA-scale engine work when Rust async cancellation and partial operations. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Identify every await point in the operation.
2. classify state changes before and after suspension.
3. make partial mutations transactional or explicitly recoverable.
4. use RAII guards for owned resources.
5. define cancellation behavior for locks and I/O.
6. ensure cleanup does not require awaiting while destructors run.
7. test cancellation at injected suspension points.
8. verify reservations and task registrations release exactly once.
9. document non-cancellable commit phases.

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

Cancellation leaves state valid and releases owned resources or records an explicit recoverable intermediate state.

Do not assume async functions run to completion. Avoid relying on async cleanup from Drop.

## Trigger examples

- **Positive:** A code change or incident directly involves Rust async cancellation and partial operations and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
