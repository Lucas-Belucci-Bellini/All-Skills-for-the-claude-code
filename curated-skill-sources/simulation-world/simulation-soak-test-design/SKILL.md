---
name: simulation-soak-test-design
description: Design long-duration simulation tests that reveal gradual memory growth, queue buildup, economic drift, and rare state-transition failures.
---

# Simulation Soak Test Design

## Goal

Detect defects that only appear after thousands of ticks, repeated lifecycle cycles or sustained population and world changes.

## Inputs to inspect

Simulation scenario, seed/version, telemetry, expected invariants, population scale, save/reload cycle and runtime resource metrics.

## Workflow

1. Choose a stable scenario with representative population, world activity and lifecycle events; pin seeds/configuration and state what determinism is expected.
2. Define interval-based invariants for population, inventory/resource conservation, queue age, entity ownership, memory use, event failures and save health.
3. Run a long horizon with scheduled save/load, streaming, population turnover and workload bursts; capture telemetry at consistent tick intervals.
4. Detect trends and outliers using bounded summaries and checkpoints; on failure, retain the nearest reproducible checkpoint and event window.
5. Re-run the minimized failure and convert confirmed issues into focused regression tests rather than requiring the whole soak test for every code change.

## Validation checklist

- [ ] The run captures both early warmup and steady-state behavior.
- [ ] Memory accounting and persistent caches are distinguished from unbounded growth.
- [ ] Economic/world invariants allow expected flows but flag unexplained creation, loss or stuck reservations.
- [ ] A failed run preserves enough deterministic context to reproduce or clearly labels what was not captured.

## Required output

A soak scenario and duration policy, tick-interval telemetry, invariant report, failure checkpoint and targeted follow-up regressions.

## Boundaries and failure handling

Do not treat one clean long run as proof of absence of rare bugs; vary seeds/configurations and state the coverage limits.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
