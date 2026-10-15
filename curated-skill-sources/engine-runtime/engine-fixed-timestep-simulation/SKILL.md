---
name: engine-fixed-timestep-simulation
description: Design a fixed-step simulation loop with bounded catch-up, render interpolation, and clear handling of pauses and slow frames.
---

# Engine Fixed Timestep Simulation

## Goal

Separate simulation correctness from variable render rate without allowing a stalled frame to trigger unbounded work.

## Inputs to inspect

Main loop, simulation tick rate, rendering flow, physics constraints, input sampling, networking requirements, and pause/time-scale behavior.

## Workflow

1. Document the authoritative simulation step and the systems that must run exactly once per tick. Separate simulation time from wall-clock and presentation time.
2. Accumulate elapsed time, execute fixed-size steps under a defined per-frame catch-up cap, and decide what happens when the cap is exceeded.
3. Interpolate presentation state between completed simulation snapshots without feeding interpolated values back into authoritative state.
4. Define input sampling, pause/unpause, time scaling, long stalls, minimized windows, and low-frame-rate behavior. If networking is involved, record the tick authority and late-input policy.
5. Test identical input sequences at several render rates, with injected stalls and pauses. Compare authoritative state at equivalent simulation ticks.

## Validation checklist

- [ ] Simulation updates use a fixed delta and are not silently stretched to fit render time.
- [ ] Catch-up is bounded and overload handling is explicit and observable.
- [ ] Interpolation never mutates authoritative simulation state.
- [ ] Pause and time-scale transitions do not create hidden accumulated time or unwanted simulation bursts.
- [ ] Determinism claims are limited to the systems and platforms actually covered by tests.

## Required output

Provide a timing diagram, loop pseudocode, catch-up policy, input policy, edge-case test matrix, and measured behavior under frame stalls.

## Boundaries and failure handling

Do not drop simulation ticks silently when authoritative gameplay depends on them; do not let render interpolation become the source of truth.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
