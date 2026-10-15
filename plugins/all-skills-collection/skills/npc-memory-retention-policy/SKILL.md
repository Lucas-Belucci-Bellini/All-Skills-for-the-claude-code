---
name: npc-memory-retention-policy
description: Specify NPC memory formation, salience, decay, consolidation, and retrieval without allowing unbounded memory growth.
---

# Npc Memory Retention Policy

## Goal

Create a bounded, inspectable memory model that retains facts relevant to future NPC decisions and dialogue.

## Inputs to inspect

NPC memory schema, event sources, decision policy, dialogue context, persistence needs, and privacy or world-simulation constraints.

## Workflow

1. Separate episodic records (what happened), semantic facts (what is believed), relationship state, and current task context. Define stable provenance for each memory.
2. Set admission criteria based on novelty, emotional/gameplay salience, reliability, recurrence, and future utility. Record why an event was retained instead of storing every observation.
3. Define confidence and decay separately: old memories may become less accessible without being silently rewritten as false. Apply explicit contradiction handling when new evidence conflicts.
4. Design consolidation that merges repeated events into a summary while preserving links to source events for critical facts, quest evidence, or causal debugging.
5. Bound storage by count or byte budget, then test retrieval for direct names, related events, recent context, contradictions, and intentionally forgotten low-value details.

## Validation checklist

- [ ] Every retained claim has source/time/context and a confidence or truth-state policy.
- [ ] Memory growth remains bounded over long simulated timelines.
- [ ] Decay does not erase quest-critical state or immutable world facts.
- [ ] Contradictions are represented and adjudicated deliberately rather than overwritten invisibly.
- [ ] Dialogue can distinguish known fact, inference, rumor, and uncertainty.

## Required output

Produce a memory taxonomy, admission/decay/consolidation rules, schema examples, retrieval tests, persistence behavior, and budget estimates.

## Boundaries and failure handling

Do not treat generated dialogue as canonical memory; do not let a summary claim more certainty than its source events.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
