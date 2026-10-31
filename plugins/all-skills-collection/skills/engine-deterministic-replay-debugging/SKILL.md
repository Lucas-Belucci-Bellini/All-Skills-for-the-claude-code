---
name: engine-deterministic-replay-debugging
description: Design reproducible simulation replays that isolate the first divergent tick across inputs, random streams, entity state, and system ordering.
---

# Engine Deterministic Replay Debugging

## Goal

Turn intermittent simulation divergence into a repeatable, evidence-backed comparison between a reference run and a failing run.

## Inputs to inspect

Simulation tick model, input/event log, RNG implementation and stream ownership, entity/component snapshots, system schedule, and platform/build details.

## Workflow

1. Define the determinism scope: same build and machine, same platform, or cross-platform. Do not assume floating-point or physics behavior is bitwise stable outside the declared scope.
2. Capture authoritative inputs and externally visible events with stable tick numbers, sequence numbers, and schema versions; exclude wall-clock values unless they are explicit simulation inputs.
3. Give random-number streams stable ownership and seeds. Record stream identity and consumption points so unrelated systems do not shift each other's random sequence.
4. Replay from a known checkpoint and compare canonical state hashes at fixed intervals; on mismatch, bisect the interval to find the earliest divergent tick.
5. At the first divergent tick, diff structured state by entity/component/system and inspect ordering, uninitialized data, race conditions, iteration-order assumptions, and nondeterministic APIs.
6. Add the smallest regression fixture that reproduces the divergence and run it repeatedly under the supported determinism scope.
7. Version replay formats and reject or explicitly migrate incompatible fixtures rather than silently interpreting old events with new semantics.

## Validation checklist

- [ ] Replay inputs and state snapshots carry tick and schema identifiers.
- [ ] State serialization is canonical and excludes nondeterministic memory layout or unstable map iteration.
- [ ] The report distinguishes first observed mismatch from proven root cause.
- [ ] Regression runs state the platform/build scope and number of repetitions.

## Required output

A replay fixture, earliest-divergence report, candidate cause list with evidence, and regression test.

## Boundaries and failure handling

Do not label a simulation deterministic merely because one replay matched. Preserve uncertainty where races, external services, floating-point differences, or unsupported platform scope remain.

When repository evidence is incomplete, label the gap and request only information that changes the decision. Do not claim tests, benchmarks, hardware validation, or runtime checks passed unless their outputs were observed.
