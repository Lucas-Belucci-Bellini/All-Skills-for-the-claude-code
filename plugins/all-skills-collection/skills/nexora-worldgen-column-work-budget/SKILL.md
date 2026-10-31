---
name: nexora-worldgen-column-work-budget
description: "Schedule procedural terrain column work against a measurable frame or worker budget. Use when world generation creates latency spikes or uneven chunk completion."
---

# NEXORA World Generation Column Work Budget

## Purpose

Make world-generation throughput predictable by bounding work admission and tracking the cost of individual generation stages without changing deterministic output.

## Required inputs

- World-generation stages and the current column/chunk scheduling implementation.
- Representative world seeds, player movement traces and stage-level timing samples.
- Frame-time or worker-time budget, concurrency limits, cancellation behavior and determinism requirements.

## Workflow

1. Map the full column pipeline and identify stages that are synchronous, parallel, cache-backed or dependent on neighboring columns.
2. Collect per-stage latency and allocation distributions for representative seeds; separate cold-cache and warm-cache measurements.
3. Set explicit admission budgets for work started per frame or worker interval, using measured cost classes rather than assuming every column costs the same.
4. Preserve deterministic generation by keeping scheduling order separate from random-stream identity and by deriving randomness from stable world/coordinate inputs.
5. Define cancellation and resumption boundaries only at stages that can be restarted safely; record completed stage outputs if resumption is supported.
6. Stress test high-density terrain, biome transitions, caves/structures, rapid traversal and low-worker availability; compare output hashes against the baseline.

## Validation checklist

- [ ] The budget limits work admission and does not silently truncate generation results.
- [ ] Seed and coordinate determinism are independent of worker scheduling order.
- [ ] Stage timings and queue delay are separately observable.
- [ ] Cancellation cannot publish partially initialized column state.

## Required output

A stage map, budget configuration, determinism invariants, benchmark matrix and before/after measurements.

## Boundaries and failure handling

Do not optimize by reducing terrain quality or changing generator semantics unless that is an explicit design decision. If measurements are unavailable, deliver an instrumentation plan rather than asserting a budget value.

## Trigger examples

- **Positive:** Fast traversal causes a burst of terrain generation and frame-time spikes.
- **Positive:** A worldgen refactor changes worker scheduling and must preserve seed reproducibility.
- **Negative:** The bottleneck is mesh upload after generation has already completed.
- **Negative:** The task is about climate sampling reuse specifically.
