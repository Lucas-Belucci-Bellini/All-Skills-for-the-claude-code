---
name: engine-cache-locality-analysis
description: Analyze data layout and memory-access locality in engine hot paths to reduce cache misses without speculative rewrites.
---

# Engine Cache Locality Analysis

## Goal

Use measurements to identify avoidable cache misses and choose data layouts that preserve correctness and maintainability.

## Inputs to inspect

Hot-loop source, profiling counters where available, representative entities/chunks, data layouts and existing benchmarks.

## Workflow

1. Choose a reproducible hot path and collect baseline duration, throughput and cache-related counters on representative workloads.
2. Map the iteration order to the layout of arrays, structs, pointers and indirect lookups; identify pointer chasing and unnecessary working-set growth.
3. Compare targeted alternatives such as contiguous arrays, structure-of-arrays, compact handles or batched traversal while keeping ownership and update semantics explicit.
4. Benchmark each alternative with the same inputs and build configuration; include small and large workloads to expose crossover points.
5. Keep the smallest change that provides repeatable benefit and add a benchmark or performance note to detect regressions.

## Validation checklist

- [ ] A cache-locality claim is supported by counters or a repeatable timing change, not source appearance alone.
- [ ] Data-layout changes preserve stable identity and synchronization requirements.
- [ ] The benchmark includes working sets that fit and exceed expected cache levels where practical.
- [ ] The change does not merely shift cost into conversion, allocation or update paths.

## Required output

A hot-path access map, baseline evidence, before/after measurements and a reasoned data-layout recommendation.

## Boundaries and failure handling

Do not rewrite the whole engine around presumed cache behavior without profiling representative workloads.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
