---
name: simulation-agent-wakeup-sleep-contract
description: Validate entity sleep and wake transitions, state snapshots, event queues, and ownership changes for dormant simulation agents.
---

# Simulation Agent Wake/Sleep Contract

## Goal

Scale large populations by suspending unnecessary work while preserving meaningful state and ensuring dormant entities wake correctly when conditions change.

## Inputs to inspect

Entity activity tiers, dormant snapshots, wake triggers, event queues, subscriptions, scheduled jobs and persistence flow.

## Workflow

1. Define active, reduced-rate, dormant and despawning states plus the authoritative fields that each state retains or derives on wake.
2. Inventory every wake trigger, including proximity, interaction, incoming event, deadline, resource change and world-system dependency.
3. Test events arriving while an entity sleeps, repeated wake requests, wake cancellation, save/load while dormant and despawn during queued work.
4. Verify scheduled changes are accumulated or explicitly deferred, and that wake reconstruction cannot duplicate subscriptions, reservations or world registrations.
5. Add lifecycle telemetry and tests that compare post-wake authoritative state against a continuously simulated reference for scenarios with defined equivalence.

## Validation checklist

- [ ] Every relevant external change either wakes the entity or is represented in a durable event/snapshot that wake processing consumes.
- [ ] Wake initialization is idempotent and respects entity generation/version.
- [ ] Dormant processing has a bounded resource cost and cannot retain unbounded queues.
- [ ] Differences from continuous simulation are documented where exact equivalence is not promised.

## Required output

An activity-state contract, wake-trigger matrix, save/load scenarios and state-equivalence tests for dormant entities.

## Boundaries and failure handling

Do not put an entity to sleep if critical timers, ownership or world invariants depend on unobserved per-tick updates.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
