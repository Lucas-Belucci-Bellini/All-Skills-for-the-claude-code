---
name: engine-world-streaming-budget
description: Design and validate bounded world-streaming policies for chunk loading, unloading, prioritization, and memory pressure.
---

# Engine World Streaming Budget

## Purpose

Keep large worlds responsive by making streaming work, memory residency, and priority decisions explicit under load.

## Required inputs

World/chunk dimensions, camera or player movement model, loader queues, disk/network latency, chunk memory estimates, visibility rules, worker limits, and target hardware.

## Workflow

1. Define measurable budgets for resident world memory, in-flight loads, decompression, mesh generation, uploads, and per-frame main-thread work.
2. Trace the full chunk lifecycle from request through read, decode, generation, mesh, upload, activation, and eviction; record ownership and cancellation points.
3. Specify priority inputs such as distance, view relevance, predicted movement, gameplay criticality, and age, including tie-breaking and starvation prevention.
4. Bound every queue and define backpressure when producers outpace consumers; avoid moving an unbounded backlog between stages.
5. Define cancellation and stale-result rejection when the player moves or world state changes before work completes.
6. Set eviction rules that account for dirty state, pinned resources, save completion, neighboring dependencies, and minimum residency.
7. Test rapid traversal, teleportation, low-memory conditions, slow storage, worker saturation, and repeated entry/exit around chunk boundaries.
8. Report peak and steady-state memory, queue depth, time-to-visible, frame-time impact, and dropped/cancelled work separately.

## Validation checklist

- [ ] Every streaming stage has a bounded queue or explicit resource cap.
- [ ] Cancellation cannot publish stale chunks or discard unsaved modifications.
- [ ] Eviction respects dirty data and pinned/in-use resources.
- [ ] Stress tests cover movement spikes, storage stalls, and memory pressure.

## Required output

A streaming state diagram, per-stage budget table, priority/eviction policy, stress-test matrix, and observed metrics or clearly marked pending measurements.

## Boundaries and failure handling

Do not promise a memory ceiling from estimates alone. Distinguish allocated, resident, GPU, and cached memory; label hardware-specific findings.

## Trigger examples

- **Positive:** The task involves chunk streaming, world residency, load prioritization, or bounded memory/work queues.
- **Negative:** The task is only about designing world lore or creating static level art without runtime streaming.
