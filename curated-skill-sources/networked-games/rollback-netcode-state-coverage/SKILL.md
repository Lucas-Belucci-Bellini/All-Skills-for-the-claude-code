---
name: rollback-netcode-state-coverage
description: Audit rollback snapshots and restore paths for complete authoritative simulation state, deterministic inputs, and external side-effect isolation.
---

# Rollback Netcode State Coverage

## Goal

Ensure rewinding and resimulating a tick reconstructs the same gameplay state without duplicating irreversible effects.

## Inputs to inspect

Snapshot schema, simulation components, input history, deterministic RNG state, external I/O/effects and replay comparison tools.

## Workflow

1. Inventory all state that can affect future simulation, including component data, timers, RNG streams, queues, contact caches and scheduled events.
2. Compare snapshot capture/restore with that inventory; identify derived values that must be rebuilt and hidden state that cannot be reconstructed safely.
3. Run controlled rewind/resimulate sequences and compare canonical state at each tick against a no-rollback baseline.
4. Audit external effects such as sound, achievements, persistence, analytics and network sends so replayed ticks do not emit duplicate irreversible actions.
5. Add state-coverage tests that mutate one relevant field at a time and prove rollback restores it or deterministically rebuilds it.

## Validation checklist

- [ ] Every future-affecting field is snapshotted, derived deterministically, or explicitly excluded with justification.
- [ ] Restore order respects dependencies between components and derived caches.
- [ ] External effects are confirmed/committed once or deduplicated by stable event identity.
- [ ] Rollback window overflow and missing input have a defined recovery policy.

## Required output

A rollback state inventory, capture/restore coverage matrix, external-effect policy and deterministic replay tests.

## Boundaries and failure handling

Do not claim rollback determinism from matching a final position only; compare all authoritative state that can affect future decisions.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
