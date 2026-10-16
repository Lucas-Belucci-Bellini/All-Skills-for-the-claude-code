---
name: world-chunk-lifecycle-invariants
description: Check chunk lifecycle invariants across load, readiness, active simulation, unload, save, and reactivation.
---

# World Chunk Lifecycle Invariants

## Goal

Keep a chunk's world data, mesh, collision, entities and saved state consistent as it moves between residency stages.

## Inputs to inspect

Chunk/entity ownership, save hooks, activation and unload routines, mesh/collider caches, and lifecycle logs.

## Workflow

1. Define which data is authoritative and which data is derived for each lifecycle state; identify where ownership moves between systems.
2. Trace every load/unload route, including normal distance eviction, manual reload, process shutdown, generation failure and save failure.
3. Verify entities are registered exactly once while active, removed from spatial indexes when inactive, and not serialized twice during overlapping transitions.
4. Force unload/reload at state boundaries and compare authoritative block/entity/world data plus rebuilt derived artifacts against a baseline.
5. Add invariant assertions and a repeated lifecycle test that catches leaked subscriptions, stale handles, duplicate entities and lost dirty state.

## Validation checklist

- [ ] A chunk cannot become active until required data and spatial registrations are consistent.
- [ ] Unloading a dirty chunk either persists the change or reports why persistence is deferred/failed.
- [ ] Derived meshes and colliders can be invalidated and reconstructed from authoritative data.
- [ ] Reactivation does not duplicate entities, event listeners, or resource ownership.

## Required output

A lifecycle state table, invariant list, targeted unload/reload test, and findings linked to exact state transitions.

## Boundaries and failure handling

Do not treat a successful chunk unload as proof that persistence and dependent systems completed correctly.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
