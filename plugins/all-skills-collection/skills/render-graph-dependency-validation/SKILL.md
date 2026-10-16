---
name: render-graph-dependency-validation
description: Validate render-graph dependencies, resource hazards, and pass ordering when a renderer schedules GPU work.
---

# Render Graph Dependency Validation

## Goal

Make render-pass scheduling correct under explicit reads, writes, resource versions and queue dependencies.

## Inputs to inspect

Render-graph declarations, resource access modes, pass callbacks, queue model, frame captures, and validation-layer messages.

## Workflow

1. Inventory every pass input/output and classify each access as read, write, read-write, attachment, copy, or present; record the resource version each pass consumes.
2. Build the expected dependency DAG from write-after-read, read-after-write, write-after-write, explicit ordering and cross-queue synchronization requirements.
3. Compare the engine's compiled graph with the expected DAG; detect missing edges, cycles, unused passes, uninitialized reads, and barriers that are weaker than the access transition requires.
4. Exercise graphs with optional passes enabled and disabled, multiple frames in flight, resource aliasing, and async compute/copy queues; preserve a minimal reproducer for each failure.
5. Add debug labels and a deterministic graph dump, then gate representative scenes on graph validation and resource-hazard checks.

## Validation checklist

- [ ] Every resource read has a defined producer or an explicit external/imported lifetime.
- [ ] The topological schedule respects all required dependencies without relying on incidental insertion order.
- [ ] Cross-queue waits and ownership transfers are paired and refer to the intended resource versions.
- [ ] Optional passes and alias reuse do not introduce uninitialized reads or hidden cycles.

## Required output

A dependency graph report, hazard list, minimal reproduction scene, and automated validation test for the affected renderer paths.

## Boundaries and failure handling

Do not add blanket pass-order constraints to hide a missing resource dependency; retain enough parallelism to avoid serializing independent work.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
