---
name: world-history-event-sourcing
description: "Builds an event-based history ledger for a simulated game world. Use when tracking settlements, factions, NPCs, discoveries, conflicts, or persistent world consequences."
---

# World History Event Sourcing

## Use when
World history is assembled from scattered mutable fields, so the game cannot explain why the world changed or rebuild state after a bug.

## Workflow
1. Define stable entity IDs, event types, timestamps/tick IDs, causes, actors, and affected entities.
2. Separate immutable recorded facts from derived summaries and current-state projections.
3. Specify event schema versioning, ordering rules, retention limits, and which events are essential for save/load.
4. Replay a known event sequence into an empty projection and compare the resulting world state with a saved expected state.

## Required output
An event schema, projection/replay contract, retention policy, and a sample causal timeline.

## Validation
- Each major state change can be traced to one or more events.
- Replay is stable for the same event sequence and schema version.
- Corrections and migrations do not silently erase historical causality.

## Guardrails
Do not persist every transient frame event; record meaningful state transitions and explicit causal evidence.
