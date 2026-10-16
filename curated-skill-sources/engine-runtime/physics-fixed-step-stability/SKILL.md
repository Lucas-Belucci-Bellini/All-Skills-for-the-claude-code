---
name: physics-fixed-step-stability
description: Validate fixed-step physics scheduling, accumulator handling, maximum catch-up policy, and deterministic simulation under variable rendering load.
---

# Physics Fixed-Step Stability

## Goal

Keep simulation integration stable when rendering frame times fluctuate or exceed the target interval.

## Inputs to inspect

Physics scheduler, timestep, accumulator, substep cap, pause/resume behavior, collision workload and deterministic replay data.

## Workflow

1. Document simulation frequency, accumulator units, timestep ownership and the maximum number of catch-up steps allowed per rendered frame.
2. Exercise slow frames, long stalls, pause/resume, time scaling, background throttling and spikes caused by many contacts.
3. Measure discarded or deferred simulation time, substep counts and state error; distinguish intentional slow-motion/capped catch-up from accidental time drift.
4. Replay a fixed input sequence under different render frame pacing and compare simulation checkpoints within the engine's defined determinism tolerance.
5. Add regression tests for accumulator carry-over, zero/negative elapsed time handling and the chosen overload policy.

## Validation checklist

- [ ] Physics uses the declared fixed step rather than variable render delta by accident.
- [ ] Substep caps prevent a spiral of death and expose when simulated time falls behind.
- [ ] Pause/resume and time-scale changes do not inject a large unbounded timestep.
- [ ] The determinism claim matches the actual floating-point and platform guarantees.

## Required output

A timestep policy, frame-pacing test matrix, drift/substep metrics, and a repeatable overload regression test.

## Boundaries and failure handling

Do not hide overload by silently dropping arbitrary accumulated time; document and instrument any time-debt cap.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
