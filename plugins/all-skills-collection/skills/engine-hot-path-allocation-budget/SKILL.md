---
name: engine-hot-path-allocation-budget
description: Measure and enforce allocation budgets for frame-critical engine paths to prevent transient heap churn and latency spikes.
---

# Engine Hot-Path Allocation Budget

## Goal

Keep predictable CPU and memory behavior by identifying recurring allocations in code that runs every frame or simulation tick.

## Inputs to inspect

Hot-path call graphs, allocator tags, frame/tick traces, per-path allocation counters and workload profiles.

## Workflow

1. Identify frame/tick-critical functions and measure allocation count, allocated bytes and allocation size distribution for representative workloads.
2. Separate intentional one-time initialization from recurring allocations, including hidden allocations from formatting, collection growth, closures or temporary containers.
3. Define budgets by subsystem and scenario, allowing documented exceptions for rare transitions rather than optimizing solely from static source inspection.
4. Prototype reuse, capacity reservation, stack/local storage or data-layout changes and compare allocation rate, peak memory and frame/tick p95/p99.
5. Add benchmark assertions or diagnostic thresholds for stable hot paths and ensure fallback behavior remains correct when preallocated capacity is exceeded.

## Validation checklist

- [ ] Allocation budget is measured under a named workload/build configuration.
- [ ] Reused buffers cannot leak stale data across callers or expose aliasing across threads.
- [ ] Capacity growth and oversized input have explicit safe behavior.
- [ ] The change improves timing or allocation evidence without introducing unbounded retained memory.

## Required output

A hot-path allocation inventory, per-scenario budgets, measured before/after results and regression gate.

## Boundaries and failure handling

Do not optimize away allocations that provide required ownership or safety without an evidence-backed replacement.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
