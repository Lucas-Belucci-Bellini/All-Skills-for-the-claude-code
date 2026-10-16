---
name: simulation-time-dilation-contract
description: Define and test how time scaling affects AI updates, physics, cooldowns, scheduled events, and persistence in simulation systems.
---

# Simulation Time Dilation Contract

## Goal

Keep slow motion, fast-forward, pause, and background simulation coherent without hidden time drift or unbounded catch-up work.

## Inputs to inspect

Simulation clock, time-scale changes, fixed-step systems, timers, NPC schedules, network authority and save timestamps.

## Workflow

1. Inventory every clock/timer consumer and classify it as simulation time, real time, monotonic elapsed time, or calendar/world time.
2. Specify pause and scaling semantics for each subsystem, including whether events are delayed, rescheduled, skipped or accumulated while time is paused.
3. Test scale changes during active timers, save/load, pause/resume, long background pauses and transitions between foreground/background simulation rates.
4. Measure catch-up behavior and cap overdue work with an explicit policy that preserves ordering and essential state transitions.
5. Add cross-subsystem tests asserting agreed timestamps and event order after repeated scale changes and persistence round trips.

## Validation checklist

- [ ] Every timer has an explicit clock domain and is not accidentally driven by a different delta source.
- [ ] Pause does not trigger cooldown expiry or scheduled work unless documented.
- [ ] Fast-forward cannot create unbounded event storms or bypass resource/production constraints.
- [ ] Saved times remain interpretable across process restarts and version changes.

## Required output

A clock-domain inventory, time-scale behavior matrix, catch-up policy and regression suite across pause/fast-forward transitions.

## Boundaries and failure handling

Do not apply a global delta multiplier without auditing subsystems that require real-time deadlines or fixed-step integration.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
