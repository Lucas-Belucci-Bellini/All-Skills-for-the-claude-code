---
name: nexora-network-reconnect-state-machine
description: "Makes reconnect and session recovery predictable after network loss or server restart."
---

# nexora network reconnect state machine

## Purpose

Use this workflow for NEXORA-scale engine work when multiplayer reconnect and session resumption. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define connection states and legal transitions.
2. separate transport reconnection from authentication and world resumption.
3. assign session epochs to invalidate stale packets.
4. classify retryable pending commands.
5. reconcile authoritative snapshots before deltas.
6. bound backoff and total recovery time.
7. test packet loss and server restart.
8. clear stale handles/subscriptions.
9. expose transition diagnostics.

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

Reconnect reaches a stable state or fails clearly without duplicate commands or stale-session traffic.

Do not reuse session keys or entity references across epochs without revalidation. Avoid infinite retry loops.

## Trigger examples

- **Positive:** A code change or incident directly involves multiplayer reconnect and session resumption and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
