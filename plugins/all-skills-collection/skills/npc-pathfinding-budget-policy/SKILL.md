---
name: npc-pathfinding-budget-policy
description: Bound NPC pathfinding work with prioritization, request coalescing, cache invalidation, and safe fallback behavior.
---

# Npc Pathfinding Budget Policy

## Goal

Keep routing responsive during dense crowds, geometry updates, and bursts of NPC requests.

## Inputs to inspect

Navigation system, route request sources, agent priorities, path cache, dynamic blockers, and profiling traces.

## Workflow

1. Classify requests by urgency: threat avoidance, active interaction, work schedule, distant planning, and background movement.
2. Set per-tick work and queue budgets, cancellation rules, and fairness. Coalesce superseded requests for the same agent and destination region.
3. Include navigation revision and movement profile in cache keys; invalidate when relevant geometry changes, not on unrelated edits.
4. Define safe behavior while waiting or when a goal is unreachable; prevent teleporting, loops, and request thrashing.
5. Stress crowded spaces, changing blockers, unreachable targets, streaming boundaries, and simultaneous request spikes.

## Validation checklist

- [ ] Queue saturation and route wait time are observable.
- [ ] Older requests cannot overwrite a more recent destination.
- [ ] Cached paths match navigation and movement assumptions.
- [ ] Unreachable or stale paths trigger explicit fallback behavior.
- [ ] Priorities preserve safety while avoiding permanent starvation of background agents.

## Required output

Produce request tiers, queue/cache rules, fallback policy, and performance/quality acceptance tests.

## Boundaries and failure handling

Do not drop urgent safety paths to preserve background throughput; do not reuse a route after relevant navigation changes.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
