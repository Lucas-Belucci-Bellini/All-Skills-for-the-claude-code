---
name: nexora-deterministic-event-ordering
description: "Defines stable ordering for simulation events produced by parallel systems or network inputs."
---

# nexora deterministic event ordering

## Purpose

Use this workflow for NEXORA-scale engine work when event queues and deterministic simulation order. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Identify event producers, consumers, and queue boundaries.
2. assign stable ordering keys such as tick, phase, source ID, and sequence.
3. define conflict resolution for concurrent mutations.
4. separate telemetry from authoritative events.
5. specify when events emitted during dispatch are processed.
6. test equivalent inputs under varied worker scheduling.
7. replay logs and compare state hashes.
8. detect event storms and bound queues.
9. document ordering compatibility for replay and protocol versions.

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

Equivalent authoritative inputs produce the documented event order and reproducible state transitions.

Do not rely on hash-map iteration or thread completion order for authoritative behavior.

## Trigger examples

- **Positive:** A code change or incident directly involves event queues and deterministic simulation order and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
