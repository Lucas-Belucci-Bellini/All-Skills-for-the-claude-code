---
name: engine-render-graph-hazard-analysis
description: Inspect a render graph for read/write hazards, invalid resource transitions, missing dependencies, and unsafe transient-resource reuse.
---

# Engine Render Graph Hazard Analysis

## Goal

Prove that render-graph scheduling respects resource dependencies and API-specific synchronization requirements without serializing unrelated work.

## Inputs to inspect

Render-pass declarations, resource descriptors, access modes, queue assignments, barriers/transitions, transient allocation data, and validation-layer output.

## Workflow

1. Inventory each pass's reads, writes, attachment use, queue, and required resource state; distinguish read-after-write, write-after-read, and write-after-write dependencies.
2. Build the expected dependency graph from declared accesses, then compare it with explicit edges and generated barriers. Do not infer an edge merely because two passes appear next to each other.
3. Check cross-queue transfers, ownership changes, fence/semaphore waits, and backend-specific state transitions against the selected graphics API and version.
4. Review transient aliasing intervals: two resources may share memory only when lifetimes do not overlap and format, alignment, usage, and backend constraints permit it.
5. Create minimal repro scenes for suspicious edges and run available graphics validation layers; record device, driver, API, build configuration, and exact diagnostic.
6. Prefer the smallest correction that restores the dependency contract, then compare frame time and GPU synchronization metrics to detect accidental global barriers.

## Validation checklist

- [ ] Every conflicting access pair has a valid dependency and required synchronization.
- [ ] Resource states and queue ownership agree with actual pass access.
- [ ] Aliased transient resources have provably non-overlapping lifetimes and compatible allocation requirements.
- [ ] Validation evidence names the actual API/backend; unrun validation is marked pending.

## Required output

A pass/resource hazard table, dependency-graph findings, minimal fixes, and a reproducible validation report.

## Boundaries and failure handling

Do not prescribe Vulkan, Direct3D, Metal, or WebGPU barriers interchangeably. If backend details or resource declarations are missing, report the gap instead of inventing synchronization.

When repository evidence is incomplete, label the gap and request only information that changes the decision. Do not claim tests, benchmarks, hardware validation, or runtime checks passed unless their outputs were observed.
