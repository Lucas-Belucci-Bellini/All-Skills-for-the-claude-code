---
name: multiplayer-determinism-testing
description: "Tests deterministic outcomes for multiplayer simulation and lockstep/replay systems. Use when state hashes diverge across clients or hosts."
---

# Multiplayer Determinism Testing

## Use when
Network sessions diverge after many ticks and the final symptom gives no clue which command or state transition first differed.

## Workflow
1. Record the initial state, version, ordered commands, tick boundaries, seeded randomness, and relevant configuration.
2. Hash normalized simulation state at checkpoints on each participant and compare first-divergence ticks.
3. Perturb message delay, batching, frame rate, and process scheduling while preserving the same logical command stream.
4. Classify differences into ordering, floating point, RNG, iteration order, time source, or unsupported determinism assumptions.

## Required output
A deterministic session fixture, cross-peer hash report, divergence classification, and reproduction recipe.

## Validation
- Every recorded command has an authoritative order and stable identifier.
- State normalization does not hide gameplay-relevant differences.
- A fix passes the original divergent session and timing perturbations.

## Guardrails
Use an honest determinism envelope; do not promise cross-platform equality unless all relevant operations support it.
