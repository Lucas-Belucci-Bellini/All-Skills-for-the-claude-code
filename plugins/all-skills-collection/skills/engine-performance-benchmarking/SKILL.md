---
name: engine-performance-benchmarking
description: "Creates repeatable performance benchmarks for game engine subsystems. Use when comparing chunk generation, meshing, simulation, rendering submission, memory, or startup costs."
---

# Engine Performance Benchmarking

## Use when
Optimization decisions rely on anecdotes, noisy single runs, or metrics that do not reflect player-visible costs.

## Workflow
1. Define the metric, workload fixture, hardware/build profile, warm-up, sampling count, and acceptable variance before implementation changes.
2. Separate CPU phases, GPU phases, allocations, memory residency, and frame-time percentiles rather than reporting one FPS number.
3. Capture a baseline artifact and rerun the exact workload after each change, including a correctness check.
4. Track regressions by subsystem and reject results whose sample size or environment is not comparable.

## Required output
A benchmark protocol, before/after table, percentile measurements, artifact links, and decision recommendation.

## Validation
- Inputs and environment are fixed and described.
- Measurements include variance and tail latency, not only mean time.
- The measured build and source revision are identifiable.

## Guardrails
Do not claim a speedup based on different workloads, warmed caches, debug/release mismatch, or a result smaller than measurement noise.
