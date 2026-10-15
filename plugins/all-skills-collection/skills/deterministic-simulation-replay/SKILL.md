---
name: deterministic-simulation-replay
description: "Builds replayable simulation tests from recorded inputs and explicit random seeds. Use when diagnosing nondeterministic game bugs, desyncs, or save/reload divergence."
---

# Deterministic Simulation Replay

## Use when
A defect disappears during debugging or two runs diverge without a clear first cause.

## Workflow
1. Record the smallest input stream, initial state, simulation version, RNG seeds, and configuration needed to reproduce the scenario.
2. Run simulation ticks without rendering or wall-clock-dependent decisions where possible.
3. Hash stable state at documented checkpoints and report the first differing tick and fields.
4. Repeat the replay under different frame rates and worker schedules to identify accidental environmental dependencies.

## Required output
A replay fixture, state-hash log, first-divergence report, and documented determinism boundary.

## Validation
- Replay reproduces the same checkpoints on the supported platform/configuration set.
- The report identifies the first differing tick rather than only the final symptom.
- Known nondeterministic fields are excluded deliberately and documented.

## Guardrails
Do not claim cross-platform bitwise determinism unless every relevant floating-point, collection-order, threading, and RNG constraint is verified.
