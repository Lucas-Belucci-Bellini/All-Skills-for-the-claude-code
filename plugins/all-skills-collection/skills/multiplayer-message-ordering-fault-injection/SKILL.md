---
name: multiplayer-message-ordering-fault-injection
description: "Use when validating multiplayer state under delayed, duplicated, reordered, or dropped messages; not for general latency-compensation algorithm design."
---

# Multiplayer Message Ordering Fault Injection

## Purpose

Verify that message sequencing and state reconciliation remain correct under transport conditions that violate ideal ordering assumptions.

## Required inputs

Message protocol, sequence/version identifiers, authoritative state rules, reconnect behavior, test simulator, and expected player-visible invariants.

## Workflow

1. Identify message types that require order, idempotency, causal grouping, or acknowledgement; document what the protocol guarantees and what it does not.
2. Inject bounded delay, reordering, duplication, loss, reconnect, and late-arriving messages independently and in selected combinations.
3. Compare server-authoritative state with each client view and inspect how sequence gaps, stale updates, and duplicated commands are handled.
4. Add regression cases for discovered failures and verify reconnect or resync restores a valid state without applying obsolete commands.

## Verification checklist

- [ ] Messages that mutate state include sufficient identity/versioning to detect stale or duplicate work.
- [ ] A client cannot overwrite newer authoritative state with older data.
- [ ] Loss and sequence gaps have a defined retry, skip, or resync policy.
- [ ] Tests assert game invariants and final state, not only that packets were received.

## Required output

A message-type risk matrix, fault-injection results, state divergence timeline, and regression scenarios.

## Boundaries and failure handling

Run with local/synthetic sessions. Do not inject packet faults into public players or production services.

When required evidence, permissions, or environment details are unavailable, stop at the supported analysis, record the missing prerequisite, and do not report an unexecuted validation as passing.

## Trigger examples

- **Positive:** A delayed inventory update arrives after the server has already accepted a newer action.
- **Negative:** Choosing the interpolation algorithm for smooth rendering under normal latency.
