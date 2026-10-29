---
name: nexora-network-clock-drift-correction
description: "Keeps client presentation and prediction aligned with server tick time without unstable corrections."
---

# nexora network clock drift correction

## Purpose

Use this workflow for NEXORA-scale engine work when client/server tick drift and clock synchronization. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Choose a monotonic clock source for each peer.
2. estimate offset and drift from timestamped exchanges.
3. filter noisy samples.
4. define correction bounds and smoothing.
5. separate presentation correction from authoritative simulation time.
6. handle pause and reconnect.
7. test latency jitter and clock jumps.
8. measure residual drift.
9. expose synchronization confidence.
10. document prediction behavior during uncertainty.

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

Clock estimates converge within measured bounds without abrupt time jumps or simulation-rule changes.

Do not trust client wall clocks for authority. Avoid feeding noisy clock corrections directly into physics timestep.

## Trigger examples

- **Positive:** A code change or incident directly involves client/server tick drift and clock synchronization and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
