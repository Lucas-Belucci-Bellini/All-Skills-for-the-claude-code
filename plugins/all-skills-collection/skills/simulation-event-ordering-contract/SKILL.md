---
name: simulation-event-ordering-contract
description: Define deterministic ordering, conflict rules, and replay evidence for simulation events that share a tick or mutate common world state.
---

# Simulation Event Ordering Contract

## Goal

Make the result of concurrent or same-tick world events explicit so replays, saves and multiplayer authority do not depend on incidental scheduling order.

## Inputs to inspect

Event queues, tick phases, event IDs, priorities, world mutations, replay logs and parallel simulation workers.

## Workflow

1. Inventory event producers and define the ordering fields that matter: tick, phase, priority, entity/resource key and stable tie-breaker.
2. Identify events that commute safely versus events that compete for inventory, ownership, movement, combat or entity lifetime.
3. Run the same seed/input sequence with different worker scheduling and insertion order; compare canonical state snapshots and the first divergence.
4. Specify conflict resolution and idempotency for duplicate, delayed, cancelled or replayed events, with explicit handling for events targeting despawned entities.
5. Persist enough event identity/version data for debugging and add a regression replay covering each contested ordering rule.

## Validation checklist

- [ ] Event order is not accidentally dependent on hash-map iteration, thread wake order or pointer address.
- [ ] Conflicting events have documented resolution semantics while independent events can remain parallel.
- [ ] Replay output identifies the first divergent tick and responsible event IDs.
- [ ] Despawn/reload and duplicate-delivery cases cannot mutate stale entity generations.

## Required output

An event-ordering contract, commutativity/conflict matrix, deterministic replay and regression test for same-tick conflicts.

## Boundaries and failure handling

Do not force a global total order for all events if only a subset conflict; preserve parallelism where independence is proven.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
