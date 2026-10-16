---
name: multiplayer-entity-replication-prioritization
description: Design replication scheduling using relevance, change rate, distance, gameplay importance, and starvation prevention.
---

# Multiplayer Entity Replication Prioritization

## Goal

Allocate finite bandwidth to the most useful entity updates while maintaining correctness for low-priority entities and state transitions.

## Inputs to inspect

Replication graph, entity relevance rules, update rates, per-client budgets, bandwidth traces and authoritative state-change events.

## Workflow

1. Classify replicated data by correctness urgency, update frequency, relevance radius, change rate and whether it can be reconstructed locally.
2. Build an explicit per-client scheduler with a bandwidth budget, priority aging and reserved capacity for critical lifecycle/authority messages.
3. Test crowded scenes, fast camera/player movement, newly relevant entities, low-bandwidth clients and sustained backlogs for starvation or inconsistent state.
4. Verify newly relevant entities receive a sufficient baseline before deltas are applied and irrelevant entities are removed using explicit lifecycle semantics.
5. Measure freshness age, dropped/coalesced updates, queue delay and correction impact by entity category; set regression budgets.

## Validation checklist

- [ ] Critical spawn/despawn, ownership and authority transitions cannot be starved behind cosmetic updates.
- [ ] Delta updates are applied only after a compatible baseline/version has been accepted.
- [ ] Priority aging and recovery prevent relevant low-frequency entities from remaining stale indefinitely.
- [ ] Bandwidth savings do not break gameplay-required observation range or fairness.

## Required output

A replication class/budget table, baseline/delta state machine, freshness metrics and congestion regression scenarios.

## Boundaries and failure handling

Do not equate distance with relevance in all games; missions, audio, combat and ownership may require separate rules.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
