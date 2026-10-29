---
name: nexora-platform-clock-contract
description: "Provides consistent monotonic timing semantics for simulation, profiling, and timeout logic across platforms."
---

# nexora platform clock contract

## Purpose

Use this workflow for NEXORA-scale engine work when monotonic clock and timer correctness. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Inventory clock sources and consumers.
2. use monotonic clocks for durations and deadlines.
3. isolate wall-clock use to timestamps.
4. define precision and wrap assumptions.
5. handle suspend/resume and clock discontinuities.
6. test timer ordering and timeout boundaries.
7. compare clock drift where synchronization matters.
8. document platform differences.
9. prevent mixing clock domains without conversion.

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

Duration and deadline logic uses consistent monotonic semantics and wall-clock changes cannot break task ordering.

Do not use wall-clock time for elapsed duration. Avoid assuming all clock sources share epoch or precision.

## Trigger examples

- **Positive:** A code change or incident directly involves monotonic clock and timer correctness and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
