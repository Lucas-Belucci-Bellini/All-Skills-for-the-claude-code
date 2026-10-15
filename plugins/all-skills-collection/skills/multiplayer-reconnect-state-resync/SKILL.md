---
name: multiplayer-reconnect-state-resync
description: Design reconnect and resynchronization flows that restore a client's authoritative state without duplicating commands or missing world events.
---

# multiplayer reconnect state resync

## Goal

Make transient disconnects recoverable while preserving server authority and event ordering.

## Inputs to inspect

Session identity, authoritative snapshots, event sequence numbers, idempotency keys, reconnect tokens, and replication flow.

## Workflow

1. Define which session state survives disconnect and how long; distinguish authenticated identity from a reconnect token or transport connection ID.
2. Choose snapshot-plus-delta or full resync behavior and specify the sequence/tick marker that joins snapshot state to subsequent events.
3. Deduplicate client commands using stable request IDs and document how in-flight commands are acknowledged, rejected, or reconciled after reconnect.
4. Handle entity despawn, inventory changes, match phase transitions, expired sessions, and server restarts between disconnect and resume.
5. Test reconnect at multiple boundaries, duplicate packets, stale snapshots, expired tokens, and high event volume during a long outage.

## Validation checklist

- [ ] Reconnect authentication is validated independently of an old socket/connection identifier.
- [ ] Snapshot and delta handoff has no gap or double-application window.
- [ ] Retried commands cannot duplicate irreversible actions or purchases.
- [ ] Expired/unsupported sessions fail explicitly and safely.
- [ ] State convergence is verified against a server-authoritative reference after reconnect.

## Required output

Produce a reconnect state machine, snapshot/delta protocol, command idempotency rules, security notes, and outage test matrix.

## Boundaries and failure handling

Do not trust client-submitted inventory/world state to restore a session; do not replay side effects blindly after an ambiguous acknowledgment.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
