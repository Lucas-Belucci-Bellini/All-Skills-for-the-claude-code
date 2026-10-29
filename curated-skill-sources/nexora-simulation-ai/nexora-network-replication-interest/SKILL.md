---
name: nexora-network-replication-interest
description: "Bounds replication work by sending each client only relevant authoritative state updates."
---

# nexora network replication interest

## Purpose

Use this workflow for NEXORA-scale engine work when multiplayer replication and interest management. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define relevance by region, ownership, and gameplay importance.
2. separate mandatory state from cosmetics.
3. version interest snapshots.
4. bound per-client bandwidth and queue bytes.
5. coalesce superseded state while preserving ordered events.
6. define enter/leave snapshots.
7. test dense hubs and packet loss.
8. measure bandwidth and queue age.
9. document privacy and authority boundaries.

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

Per-client replication stays within budgets without omitting required state transitions.

Interest management is not authorization. Hidden data must not be sent and merely hidden client-side.

## Trigger examples

- **Positive:** A code change or incident directly involves multiplayer replication and interest management and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
