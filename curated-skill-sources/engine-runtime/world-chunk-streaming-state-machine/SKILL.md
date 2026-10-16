---
name: world-chunk-streaming-state-machine
description: Model chunk streaming as explicit states and legal transitions across request, generation, meshing, upload, activation, eviction, and cancellation.
---

# World Chunk Streaming State Machine

## Goal

Prevent duplicate work, stale completions, invalid activation and resource leaks in asynchronous chunk streaming.

## Inputs to inspect

Chunk coordinator, generation/meshing jobs, cancellation tokens, GPU upload queue, residency rules, and streaming traces.

## Workflow

1. List chunk states and define entry/exit conditions, owned resources, pending jobs, and legal next states for every transition.
2. Attach a chunk generation/version token to asynchronous jobs so a result from an old request cannot overwrite a newer request at the same coordinates.
3. Exercise rapid camera movement, overlapping requests, cancellation during each stage, worker failure, upload backpressure and eviction while jobs are still running.
4. Verify that activation requires all mandatory prerequisites, neighboring dependencies and GPU resources to be ready under the chosen consistency model.
5. Add state-transition assertions, queue-age metrics and a deterministic stress test that repeats request/cancel/re-request sequences.

## Validation checklist

- [ ] Every state transition has one owner and a documented reason; illegal edges fail visibly in debug/test builds.
- [ ] Cancelled or stale jobs release temporary memory and cannot publish results into a newer chunk generation.
- [ ] Eviction waits for in-flight readers/GPU work and does not orphan dependent mesh or collision data.
- [ ] Repeated requests for the same chunk are deduplicated or explicitly versioned.

## Required output

A chunk state diagram, transition table, stress-test traces, and counters for pending, stale, failed and resident chunks.

## Boundaries and failure handling

Do not use sleeps or timing assumptions to mask races; synchronization must be based on explicit ownership, completion and version checks.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
