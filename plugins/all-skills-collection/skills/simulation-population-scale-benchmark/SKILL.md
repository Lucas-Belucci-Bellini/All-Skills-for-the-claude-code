---
name: simulation-population-scale-benchmark
description: Benchmark simulation cost across increasing entity populations, activity distributions, and spatial densities with comparable state and workload.
---

# Simulation Population-Scale Benchmark

## Goal

Estimate practical population capacity and locate nonlinear scaling costs before optimizing only the most obvious subsystem.

## Inputs to inspect

Simulation scenario, population generator, agent activity tiers, world size, deterministic seed, frame/tick telemetry and memory metrics.

## Workflow

1. Define a population matrix across entity count, active-to-dormant ratio, spatial clustering and behavior complexity, pinning seeds and world inputs.
2. Measure tick duration percentiles, work per entity, queue age, memory, pathfinding/decision counts and invariant failures across each scale.
3. Separate fixed costs from per-entity costs and identify threshold effects such as cache growth, queue saturation, broadphase density or full-world scans.
4. Repeat key points with one subsystem throttled or isolated to estimate the dominant scaling factor, keeping correctness checks enabled.
5. Document tested capacity ranges and the first bottleneck with a repeatable benchmark script rather than extrapolating far beyond measurements.

## Validation checklist

- [ ] Population scenarios differ only in declared dimensions when compared.
- [ ] Average tick time does not hide p95/p99 spikes or deadline misses.
- [ ] Dormant and active agent costs are measured separately.
- [ ] Performance is evaluated alongside memory, simulation correctness and queue freshness.

## Required output

A population/cost matrix, scaling curves, bottleneck attribution and a repeatable maximum-capacity benchmark.

## Boundaries and failure handling

Do not claim a supported entity count based on a single machine or uniform synthetic behavior; document workload and hardware assumptions.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
