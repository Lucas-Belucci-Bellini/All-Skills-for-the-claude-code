---
name: simulation-event-queue-overflow-policy
description: Design bounded overflow behavior for simulation event queues with event priority, idempotency, coalescing, and durable-event safeguards.
---

# Simulation Event Queue Overflow Policy

## Goal

Prevent event bursts from exhausting memory or causing silent world-state divergence while keeping critical transitions recoverable.

## Inputs to inspect

Event producers, queue types/capacities, event identities, deadlines, replay semantics and persistence requirements.

## Workflow

1. Inventory event classes and mark which are authoritative/durable, safely coalescible, replaceable by a newer state, or disposable diagnostics.
2. Estimate burst rate, item memory and required retention window; set explicit per-queue capacity and backpressure/admission policy.
3. Test overflow during NPC crowds, region transitions, multiplayer bursts, save/load and subsystem restart; record event age, rejection and duplicate delivery.
4. Verify idempotency keys and sequence rules for retries, and preserve or checkpoint events whose loss would violate ownership/resource invariants.
5. Implement counters and visible overflow outcomes with a bounded recovery path; add tests proving critical events are retained, persisted, or produce an explicit failure state.

## Validation checklist

- [ ] Queue capacity is explicit and sizing rationale is documented.
- [ ] Coalescing applies only to events with proven replacement semantics.
- [ ] Overflow cannot silently drop an authoritative event or reorder incompatible transitions.
- [ ] Retry behavior is idempotent and cannot amplify a saturated queue indefinitely.

## Required output

An event-class disposition table, capacity/overload policy, overflow metrics and invariant-focused tests.

## Boundaries and failure handling

Do not solve overflow solely by increasing the queue indefinitely; identify producer bursts, consumer stalls and the true durability needs.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
