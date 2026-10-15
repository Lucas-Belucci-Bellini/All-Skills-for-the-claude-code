---
name: engine-memory-budget-profiling
description: Measure engine memory by subsystem and resource lifetime to identify real pressure, leaks, fragmentation, and duplicated residency.
---

# engine memory budget profiling

## Goal

Turn memory usage into an accountable budget rather than repeatedly increasing system requirements.

## Inputs to inspect

Allocation telemetry, asset caches, world/chunk counts, GPU memory reports, platform limits, and representative workloads.

## Workflow

1. Separate CPU heap, stack, mapped files, allocator reserves, GPU allocations, and external process memory. Document which measurements overlap and must not be summed.
2. Tag or estimate memory by subsystem and resource class: world data, meshes, textures, simulation state, caches, job queues, and temporary staging buffers.
3. Capture a baseline through startup, typical play, peak traversal, return to a prior region, and repeated load/unload cycles.
4. Look for unbounded growth, retained caches without limits, duplication between compressed and decoded copies, fragmentation, and peak allocations during transitions.
5. Set target and hard ceilings for each platform tier; test eviction and graceful degradation under simulated memory pressure.

## Validation checklist

- [ ] Reports distinguish live allocations from allocator-reserved memory and GPU residency.
- [ ] Memory growth is measured after warm-up and across repeated cycles.
- [ ] Budgets include transition peaks, not only steady-state usage.
- [ ] Eviction or degradation preserves required gameplay correctness and resource lifetimes.
- [ ] Each suspected leak is supported by a trend or object-lifetime trace.

## Required output

Deliver a per-subsystem memory budget, growth trace, prioritized pressure sources, platform tiers, and a repeatable profiling scenario.

## Boundaries and failure handling

Do not infer a memory leak from a process not returning reserved memory to the OS; do not optimize only the mean while ignoring peak allocation bursts.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
