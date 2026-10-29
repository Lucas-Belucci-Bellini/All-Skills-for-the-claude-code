---
name: nexora-memory-budget-admission
description: "Prevents concurrent asset, chunk, and world-generation tasks from oversubscribing shared memory budgets."
---

# nexora memory budget admission

## Purpose

Use this workflow for NEXORA-scale engine work when concurrent memory admission and resource reservations. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define memory budget ownership and reservation units.
2. estimate worst-case temporary and retained memory before scheduling.
3. reserve atomically across competing producers.
4. include staging and decompression buffers.
5. release reservations exactly once on success, failure, or cancellation.
6. prioritize required work.
7. test concurrent bursts and inaccurate estimates.
8. reconcile estimates with observed usage.
9. expose denied/deferred job reasons.

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

Concurrent producers cannot oversubscribe declared budgets beyond documented estimation error.

Do not reserve only compressed input size. Ensure cancellation and panic paths release reservations.

## Trigger examples

- **Positive:** A code change or incident directly involves concurrent memory admission and resource reservations and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
