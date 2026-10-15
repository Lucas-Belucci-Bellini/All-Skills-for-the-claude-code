---
name: world-simulation-save-snapshot
description: Design consistent save snapshots across NPCs, economy, timers, random state, and asynchronous simulation jobs.
---

# World Simulation Save Snapshot

## Goal

Prevent saves that combine different logical ticks or lose/duplicate work during restoration.

## Inputs to inspect

Simulation scheduler, state owners, queued events, async jobs, persistent schema, and save/load lifecycle.

## Workflow

1. Identify every mutable state owner, including entity data, market ledgers, scheduled events, random state, and pending transactions.
2. Choose a coherent snapshot strategy: safe tick boundary, versioned copy-on-write, or journaling with a defined consistency point.
3. Classify in-flight work as persisted, cancelled-and-recomputed, or completed before snapshot; define semantics for nondeterministic external tasks.
4. Record snapshot tick, schema/generator versions, RNG state where needed, and stable IDs for deferred events.
5. Interrupt saves at different stages, restore the last valid snapshot, and compare entity/economy/event state to expected results.

## Validation checklist

- [ ] All subsystems correspond to a coherent logical snapshot boundary.
- [ ] Partial writes cannot replace the last usable save.
- [ ] Pending work is neither lost nor duplicated after restore.
- [ ] Migration preserves IDs, timers, and causal references.
- [ ] Latency and temporary memory overhead are measured at target world sizes.

## Required output

Deliver state ownership inventory, snapshot protocol, pending-work policy, schema metadata, and crash/round-trip tests.

## Boundaries and failure handling

Do not serialize arbitrary in-memory objects without stable schema semantics; do not infer consistency because every subsystem wrote a file.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
