---
name: nexora-world-region-lock-order
description: "Prevents deadlocks when world edits, saves, generation, and streaming operate on overlapping regions."
---

# nexora world region lock order

## Purpose

Use this workflow for NEXORA-scale engine work when region locks and concurrent world operations. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Inventory lock types and acquisition paths.
2. define a global ordering for region, chunk, and subsystem locks.
3. minimize lock scope and avoid I/O under world-state locks.
4. use snapshot/version checks where safe.
5. define cancellation and timeout behavior.
6. test overlapping edits with save/generation concurrency.
7. run deadlock stress tests where available.
8. measure lock wait time and hot regions.
9. document the lock hierarchy near owning abstractions.

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

Concurrent operations follow one lock hierarchy and stress tests reveal no deadlocks or inconsistent partial state.

Do not await async work while holding a lock needed by completion. Never add lock-order exceptions without a documented proof.

## Trigger examples

- **Positive:** A code change or incident directly involves region locks and concurrent world operations and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
