---
name: minecraft-server-performance-change-benchmark
description: Benchmark server performance changes against a repeatable modded-Minecraft workload with controlled versions, player activity, and profiler evidence.
---

# Minecraft Server Performance Change Benchmark

## Goal

Tell whether a config/mod/JVM change improves server behavior rather than relying on anecdotal TPS impressions.

## Inputs to inspect

Server build, world snapshot, mod/config diff, player/activity script, profiler, TPS/tick-time metrics, and hardware context.

## Workflow

1. Clone a representative world and record server, loader, mod, Java, config, hardware, and JVM settings for the baseline.
2. Define repeatable workload phases such as idle, exploration/chunk generation, automation-heavy operation, and multi-player activity.
3. Warm up the server, collect tick-time percentiles, TPS, memory/GC metrics, CPU/disk/network context, and profiler traces across multiple runs.
4. Change only the candidate variable and repeat the same workload; account for random world events and cache warm-up when comparing results.
5. Evaluate both desired metrics and regressions in correctness, stability, memory use, and player-visible behavior before accepting the change.

## Validation checklist

- [ ] Baseline and candidate use equivalent world state and workload.
- [ ] Average TPS is supplemented by tick-time distributions and profiler evidence.
- [ ] Warm-up and run-to-run variance are documented.
- [ ] A performance gain is not accepted if gameplay or stability regresses.
- [ ] The final result distinguishes measured impact from an untested hypothesis.

## Required output

Deliver an environment manifest, workload recipe, before/after metrics, profiler evidence, and go/no-go recommendation.

## Boundaries and failure handling

Do not benchmark different worlds/configurations and attribute the result to a single flag; do not run stress tests on the production world by default.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
