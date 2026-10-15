---
name: rust-game-loop-architecture
description: "Designs a Rust game loop with explicit frame phases and stable simulation timing. Use when structuring NEXORA-like runtimes, update order, input, rendering, and fixed-step systems."
---

# Rust Game Loop Architecture

## Use when
Frame timing and update ordering are becoming implicit, causing jitter, hard-to-reproduce bugs, or coupling between systems.

## Workflow
1. Separate platform event collection, input sampling, fixed simulation steps, presentation interpolation, rendering, and frame submission.
2. Choose a fixed-step accumulator and a maximum catch-up budget; specify what happens when the budget is exceeded.
3. Keep simulation state mutation in well-defined phases and pass snapshots or commands across subsystem boundaries.
4. Instrument frame time, simulation-step time, backlog, dropped catch-up work, and input-to-present latency.

## Required output
A loop-phase diagram, Rust module/API sketch, timing policy, and a minimal timing test plan.

## Validation
- Simulation step count is independent of rendering frequency within defined limits.
- Overload behavior is explicit and telemetry reveals when it occurs.
- Input and state changes have deterministic ordering in tests.

## Guardrails
Do not promise real-time determinism from a fixed timestep alone; floating point, unordered iteration, thread scheduling, and RNG also affect results.
