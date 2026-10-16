---
name: multiplayer-entity-despawn-ordering
description: "Use when entity despawn, ownership transfer, and updates race to leave stale replicated entities; not for interest-management policy."
---

# Multiplayer Entity Despawn Ordering

## Purpose

Keep entity lifecycles consistent when despawns race with in-flight state updates.

## Required inputs

Entity IDs/generations, protocol, spawn/update/despawn rules, reconnect behavior, fault-injection harness.

## Workflow

1. Define lifecycle transitions and how IDs/generations distinguish respawns from delayed old updates.
2. Inject delayed updates around despawn, rapid respawn, ownership transfer, interest exit/re-entry, and reconnect.
3. Verify stale messages are rejected and client-owned resources/subscriptions release once.
4. Add regression tests and check server snapshots cannot recreate non-authoritative entities.

## Verification checklist

- [ ] Identity protects against ID reuse and stale updates.
- [ ] Despawn is idempotent with a defined tombstone/expiry rule.
- [ ] Client resources detach when entity is removed.
- [ ] Late updates cannot resurrect an old generation.

## Required output

An entity lifecycle diagram, ordering-fault matrix, stale-message results, and regression requirements.

## Boundaries and failure handling

Use synthetic entities and test sessions, not production player state.

When evidence, permissions, or environment details are missing, stop at the supported analysis, record the missing prerequisite, and do not report unexecuted validation as passing.

## Trigger examples

- **Positive:** An enemy reappears when an old transform packet arrives after despawn.
- **Negative:** Selecting replication priority for crowded scenes.
