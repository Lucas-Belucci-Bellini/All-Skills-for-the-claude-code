---
name: nexora-replication-delta-baseline
description: "Prevents replication deltas from being applied to the wrong baseline or after a missing update."
---

# nexora replication delta baseline

## Purpose

Use this workflow for NEXORA-scale engine work when multiplayer replication deltas and snapshot baselines. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define snapshot and delta sequence identifiers.
2. bind each delta to a specific baseline.
3. detect gaps and out-of-order updates.
4. request a fresh snapshot when continuity is lost.
5. bound buffered deltas and age.
6. apply updates atomically at a simulation boundary.
7. test packet loss, duplication, and reordering.
8. instrument gap recovery frequency.
9. document compatibility across protocol versions.

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

Clients never apply a delta to an incompatible baseline and recover cleanly from gaps.

Do not apply partial delta chains silently. Bound recovery buffers against hostile peers.

## Trigger examples

- **Positive:** A code change or incident directly involves multiplayer replication deltas and snapshot baselines and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
