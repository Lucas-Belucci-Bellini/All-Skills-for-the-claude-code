---
name: nexora-streaming-io-backpressure
description: "Prevents disk I/O queues from growing without bound when chunk streaming outruns storage throughput."
---

# nexora streaming io backpressure

## Purpose

Use this workflow for NEXORA-scale engine work when chunk streaming and save/load I/O pressure. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Measure read/write queue depth, bytes, and latency.
2. define global and per-region concurrency limits.
3. prioritize required player-visible loads and critical saves.
4. coalesce redundant reads.
5. deduplicate in-flight requests.
6. cancel obsolete speculative reads.
7. keep save writes durable and ordered.
8. test slow disks and burst movement.
9. expose queue age and throttling decisions.

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

I/O queues stay bounded and required persistence work is not starved by speculative streaming.

Do not drop acknowledged save writes to maintain streaming speed. Ensure cancellation does not leak file handles or reservations.

## Trigger examples

- **Positive:** A code change or incident directly involves chunk streaming and save/load I/O pressure and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
