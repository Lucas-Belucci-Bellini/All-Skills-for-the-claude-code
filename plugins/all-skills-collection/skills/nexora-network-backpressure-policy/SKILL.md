---
name: nexora-network-backpressure-policy
description: "Prevents slow clients or overloaded servers from creating unbounded outbound queues."
---

# nexora network backpressure policy

## Purpose

Use this workflow for NEXORA-scale engine work when network send queues and slow peers. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Measure queue bytes and age by message class.
2. define per-client and global limits.
3. prioritize mandatory authoritative updates.
4. coalesce replaceable state.
5. reject or defer optional payloads.
6. close or degrade persistently slow peers according to policy.
7. ensure queue accounting is race-safe.
8. test bandwidth throttling and reconnect bursts.
9. expose backpressure metrics.

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

Outbound memory remains bounded and degradation follows explicit priorities.

Do not silently drop required gameplay events. Ensure a slow client cannot monopolize shared send buffers.

## Trigger examples

- **Positive:** A code change or incident directly involves network send queues and slow peers and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
