---
name: rust-perf-regression-thresholds
description: Create stable Rust performance regression gates using representative workloads, confidence-aware thresholds, and environment metadata.
---

# Rust Performance Regression Thresholds

## Goal

Detect meaningful performance drift while avoiding noisy CI failures from machine variance and unrelated build changes.

## Inputs to inspect

Criterion/custom benchmarks, CI machine class, compiler flags, workload fixtures, historical metrics and release targets.

## Workflow

1. Choose a small stable benchmark suite representing critical API paths and realistic input distributions; separate microbenchmarks from end-to-end scenarios.
2. Record compiler/toolchain, target CPU, build profile, dependency lockfile, feature set, workload size and measurement methodology with each result.
3. Establish a baseline over repeated runs and estimate normal variance; define thresholds that reflect practical impact rather than arbitrary percentage changes.
4. Run comparisons with warmup, outlier policy and equivalent conditions; report throughput, latency percentiles, allocations or memory where relevant.
5. Provide a triage path for threshold breaches, including rerun guidance and explicit approval for intentional trade-offs; update baselines only with documented evidence.

## Validation checklist

- [ ] Baseline updates require a reason and reference to the change that altered expected performance.
- [ ] Noisy environments have a confidence/retry policy rather than unbounded automatic retries.
- [ ] Thresholds distinguish statistically noisy shifts from a sustained meaningful regression.
- [ ] Every gate has an owner and a documented action when it fails.

## Required output

A benchmark inventory, environment schema, baseline/threshold policy and actionable regression report format.

## Boundaries and failure handling

Do not claim universal performance from a CI microbenchmark; keep hardware/environment scope explicit.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
