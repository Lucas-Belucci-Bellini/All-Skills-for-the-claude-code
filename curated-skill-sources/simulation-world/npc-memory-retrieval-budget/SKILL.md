---
name: npc-memory-retrieval-budget
description: Bound NPC memory retrieval by query cost, relevance, recency, and decision deadlines in large-agent simulations.
---

# NPC Memory Retrieval Budget

## Goal

Keep memory-informed decisions useful without allowing retrieval cost or unbounded context growth to dominate simulation time.

## Inputs to inspect

NPC memory stores, query patterns, retrieval ranking, agent tiers, decision budgets and representative population traces.

## Workflow

1. Map memory query types and the data searched, including indexes, relationship lookups, episodic records and knowledge filters.
2. Measure latency, allocations and result counts by query type and population tier; identify unbounded scans and redundant repeated queries.
3. Define per-decision limits for candidate count, time/cost, recency windows and cached results, with explicit behavior when a limit is reached.
4. Test dense social graphs, stale knowledge, repeated identical queries and bursts of agents deciding at once; verify bounded tail cost and stable ranking.
5. Add budget telemetry and regression fixtures showing that throttling changes cost predictably without violating required knowledge or privacy boundaries.

## Validation checklist

- [ ] Queries have explicit upper bounds or a documented justification for full scans.
- [ ] Ranking behavior and tie-breaking are stable enough for deterministic or replayable simulations where required.
- [ ] Cache invalidation handles knowledge changes and does not leak one agent's private memory to another.
- [ ] Budget exhaustion returns a defined reduced result or defer state instead of silently fabricating knowledge.

## Required output

A memory-query cost map, per-tier budgets, overload behavior and representative retrieval regression tests.

## Boundaries and failure handling

Do not equate fewer returned memories with correct retrieval; verify decision quality and agent knowledge boundaries.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
