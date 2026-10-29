---
name: nexora-watchdog-deadlock-diagnostics
description: "Captures useful diagnostics when simulation or worker progress stops without creating additional deadlocks."
---

# nexora watchdog deadlock diagnostics

## Purpose

Use this workflow for NEXORA-scale engine work when engine watchdog and stalled progress. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define progress heartbeats for critical loops.
2. set thresholds based on workload and expected pauses.
3. collect thread/task state without acquiring contested locks.
4. capture recent tick and queue metrics.
5. distinguish overload from deadlock where possible.
6. limit dump frequency and size.
7. test intentional stalls and long operations.
8. preserve privacy in stack/path data.
9. document false-positive handling.

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

A watchdog reports stalled progress with bounded diagnostic overhead and does not worsen the stall.

Do not terminate critical work based on a single noisy heartbeat. Avoid watchdog code that waits on the blocked lock.

## Trigger examples

- **Positive:** A code change or incident directly involves engine watchdog and stalled progress and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
