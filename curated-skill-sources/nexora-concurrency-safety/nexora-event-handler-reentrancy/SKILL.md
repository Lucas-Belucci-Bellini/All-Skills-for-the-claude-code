---
name: nexora-event-handler-reentrancy
description: "Prevents event handlers from recursively mutating dispatch state or causing unbounded nested event chains."
---

# nexora event handler reentrancy

## Purpose

Use this workflow for NEXORA-scale engine work when event dispatch and recursive callbacks. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define whether events emitted during dispatch run immediately or on a later queue phase.
2. guard recursion depth and event count.
3. separate subscription mutation from iteration.
4. specify handler failure isolation.
5. test self-unsubscribe and subscribe-during-dispatch.
6. bound nested event chains.
7. preserve ordering guarantees.
8. record handler and event IDs in diagnostics.
9. ensure cancellation stops future callbacks safely.

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

Dispatch semantics are deterministic and recursive event storms are bounded.

Do not iterate mutable subscription storage while callbacks can invalidate it. Avoid swallowing handler errors without policy.

## Trigger examples

- **Positive:** A code change or incident directly involves event dispatch and recursive callbacks and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
