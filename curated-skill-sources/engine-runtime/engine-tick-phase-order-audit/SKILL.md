---
name: engine-tick-phase-order-audit
description: Verify engine tick phase ordering and data visibility across input, simulation, physics, transforms, animation, rendering, and persistence.
---

# Engine Tick Phase Order Audit

## Goal

Prevent one-frame latency, stale reads, and order-dependent bugs by making tick-phase dependencies explicit.

## Inputs to inspect

Main-loop code, system registration, phase dependencies, read/write sets, entity lifecycle, and frame traces.

## Workflow

1. Enumerate runtime phases and annotate each phase's required inputs, state it mutates, and outputs consumed by later phases.
2. Construct a dependency graph and compare it with actual scheduler/registration order; flag cycles and hidden reliance on insertion order.
3. Exercise input arriving at phase boundaries, entity spawn/despawn, physics corrections, transform updates and save snapshots to find stale or partially updated state.
4. Test alternative valid system registration orders in debug builds where feasible, while asserting declared dependencies and required barriers.
5. Document the canonical phase contract and add tests for key latency-sensitive flows and entity lifecycle transitions.

## Validation checklist

- [ ] Every cross-phase dependency has an explicit ordering edge or a proven concurrency-safe contract.
- [ ] Render and persistence do not observe partially committed authoritative state.
- [ ] Entity removal invalidates later-phase consumers without leaving stale handles.
- [ ] One-frame delays are intentional and documented, not accidental consequences of registration order.

## Required output

A phase dependency map, ordering violations, canonical tick contract and regression tests for phase-sensitive flows.

## Boundaries and failure handling

Do not impose a global serial order on independent systems unless correctness requires it; preserve safe parallelism.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
