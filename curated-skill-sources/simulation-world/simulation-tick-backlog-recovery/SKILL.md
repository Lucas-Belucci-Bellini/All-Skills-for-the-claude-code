---
name: simulation-tick-backlog-recovery
description: Audit recovery when simulation falls behind wall time, including queued ticks, event accumulation, fast-forward, and overload policy.
---

# Simulation Tick Backlog Recovery

## Goal

Keep the simulation stable under sustained overload without unbounded catch-up spirals or silent loss of authoritative events.

## Inputs to inspect

Tick scheduler, accumulator, tick deadlines, event queues, time-scale policy, lag telemetry and persistence behavior.

## Workflow

1. Separate wall-clock delay, accumulated simulation time, unfinished tick work and queued external events into distinct measurements.
2. Define which work must execute per tick, which updates can be coalesced, and which simulation modes may slow down rather than skipping authoritative transitions.
3. Stress long stalls, large event bursts, expensive population updates and fast-forward while measuring backlog growth, catch-up cost and event age.
4. Test recovery strategies such as capped catch-up, reduced-rate background systems, load shedding of non-authoritative work or explicit simulation slowdown.
5. Add alerts for sustained backlog and regression tests proving recovery is bounded and leaves resource/event invariants intact.

## Validation checklist

- [ ] Authoritative events are not silently dropped when ticks are delayed.
- [ ] The chosen overload policy cannot trigger an infinite spiral of catch-up work.
- [ ] Metrics distinguish simulation time behind from queue capacity or worker starvation.
- [ ] Saving/restarting during backlog preserves ordering or explicitly records deferred work.

## Required output

A backlog policy, stress profile, recovery state machine and invariant-focused overload tests.

## Boundaries and failure handling

Do not pretend the simulation is caught up merely by advancing its clock; required state transitions must be accounted for.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
