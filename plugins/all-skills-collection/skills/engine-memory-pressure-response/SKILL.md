---
name: engine-memory-pressure-response
description: Audit how an engine detects and responds to memory pressure through cache eviction, streaming throttles, allocation caps, and user-visible fallback.
---

# Engine Memory Pressure Response

## Goal

Prevent avoidable process crashes and latency spikes by defining a prioritized, bounded reaction to memory pressure.

## Inputs to inspect

Memory accounting, asset/chunk residency, cache priorities, allocation failures, platform signals and recovery paths.

## Workflow

1. Inventory memory pools by owner, reclaimability, priority and minimum resident set; separate CPU, GPU, mapped and external allocations.
2. Define pressure levels and triggers using measured budget, allocation failure, platform notifications and growth trends rather than one raw number alone.
3. Specify ordered responses such as stop speculative work, trim low-priority caches, reduce streaming concurrency and release safely reconstructible resources.
4. Stress sudden allocation failure, large-scene load, device loss and sustained low-memory conditions; verify recovery and prevent eviction thrashing.
5. Expose counters for pressure duration, reclaimed bytes, failed allocations and fallback activations; add budget tests for representative worst-case scenes.

## Validation checklist

- [ ] Every reclaimable cache has an owner, eviction policy and way to rebuild its content.
- [ ] Critical authoritative state is not discarded as if it were a cache.
- [ ] Pressure responses are rate-limited or hysteretic to avoid oscillation and repeated expensive reloads.
- [ ] Allocation failure returns a controlled error or documented fallback rather than corrupting state.

## Required output

A memory-pressure state machine, reclaim priority table, low-memory stress report and recovery telemetry.

## Boundaries and failure handling

Do not assume operating-system memory signals are exact forecasts; retain internal accounting and explicit fallback paths.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
