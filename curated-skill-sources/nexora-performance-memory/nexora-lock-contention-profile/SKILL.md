---
name: nexora-lock-contention-profile
description: "Finds lock contention that stalls simulation, streaming, or rendering workers."
---

# nexora lock contention profile

## Purpose

Use this workflow for NEXORA-scale engine work when engine lock contention and worker stalls. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Instrument lock wait and hold durations at subsystem boundaries.
2. correlate waits with frame/tick phases.
3. identify locks held across I/O or expensive computation.
4. distinguish true contention from scheduler delay.
5. reduce critical sections using snapshots or ownership transfer.
6. preserve invariants and lock order.
7. stress test many workers and active chunks.
8. compare p95/p99 wait times.
9. document any remaining serialization point.

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

The profile identifies dominant contention and the fix improves tail latency without weakening synchronization.

Do not remove synchronization solely to reduce timings. Avoid high-overhead instrumentation that changes the contention pattern.

## Trigger examples

- **Positive:** A code change or incident directly involves engine lock contention and worker stalls and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
