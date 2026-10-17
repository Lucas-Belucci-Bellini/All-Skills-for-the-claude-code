---
name: engine-resource-residency-budget
description: Track and enforce residency budgets for textures, meshes, audio, world chunks, caches and GPU resources under streaming load.
---

# Engine Resource Residency Budget

## Goal

Prevent resource residency from exceeding memory targets while preserving timely access to assets required by the active scene.

## Inputs to inspect

Resource manager, CPU/GPU memory pools, residency priorities, streaming requests, last-use timestamps and eviction behavior.

## Workflow

1. Inventory resource classes with measured size, reconstruction/load cost, priority, dependency relationships and whether they can be safely evicted.
2. Define residency budgets by device tier and runtime mode, accounting for pinned resources, in-flight uploads, staging memory and temporary duplication.
3. Stress rapid movement, scene switching, large assets, repeated cache misses and memory pressure while recording resident bytes, eviction churn and time-to-ready.
4. Test eviction with resources referenced by active frames, physics, save tasks or background workers; verify deferred release waits for ownership and GPU completion.
5. Add per-class occupancy and eviction metrics, high-water alerts, and a test where the manager operates under the configured memory cap.

## Validation checklist

- [ ] Active/in-flight resources are not evicted while consumers still depend on them.
- [ ] Memory accounting distinguishes resident, pending upload, staging, cached and externally allocated memory.
- [ ] Eviction policy avoids pathological churn and supports priority inversion prevention for imminent use.
- [ ] Budget overflow has a controlled response and clear diagnostics.

## Required output

A residency-class table, per-tier budgets, eviction safety checks and measured streaming/pressure results.

## Boundaries and failure handling

Do not use a single total-memory cap without accounting for resource class, in-flight lifetime and platform-specific reserved memory.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
