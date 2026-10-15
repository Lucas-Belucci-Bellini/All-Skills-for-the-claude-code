---
name: engine-asset-streaming-budget
description: Allocate memory, I/O, decode, and upload budgets for asynchronous asset streaming to prevent spikes during world traversal.
---

# engine asset streaming budget

## Goal

Keep asset streaming within predictable frame-time and memory limits as players move through large worlds.

## Inputs to inspect

Asset types and sizes, loading pipeline stages, expected travel speed, chunk visibility, memory budget, and GPU upload scheduling.

## Workflow

1. Measure asset demand by scene or world region and map each stage: request, disk read, decode, dependency resolution, CPU residency, GPU upload, and eviction.
2. Set independent budgets for concurrent I/O, decode workers, pending upload bytes, resident memory, and per-frame main-thread work.
3. Prioritize requests by visibility, predicted motion, gameplay-critical use, and deadline. Define cancellation or de-prioritization when demand changes.
4. Specify what happens when memory is exhausted: eviction candidates, pinned resources, fallback assets, and retry policy. Avoid endless reload/evict oscillation.
5. Stress with fast traversal, teleportation, repeated scene changes, slow storage, corrupted assets, and GPU upload pressure while recording frame-time and memory telemetry.

## Validation checklist

- [ ] No single stage is allowed unbounded work or unbounded queued bytes.
- [ ] Resource requests can be cancelled or reprioritized without leaking partially loaded assets.
- [ ] Memory pressure has a deterministic response and preserves explicitly pinned content.
- [ ] Fallback assets are visually and functionally safe until the real resource becomes ready.
- [ ] Frame-time spikes are attributed to pipeline stages, not only to total loading time.

## Required output

Create a streaming stage diagram, budget table, prioritization/eviction policy, fallback rules, and stress-test acceptance metrics.

## Boundaries and failure handling

Do not solve stalls by preloading the entire world; do not evict resources still required by an active frame or critical gameplay path.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
