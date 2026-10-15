---
name: social-rumor-propagation-model
description: Model NPC rumor transmission with source provenance, trust, delay, confidence, and contradictory evidence.
---

# Social Rumor Propagation Model

## Goal

Ensure social knowledge is learned through plausible paths instead of global omniscience.

## Inputs to inspect

NPC relationships, perception events, communication channels, memory schema, factions, and dialogue claims.

## Workflow

1. Represent rumors separately from canonical world truth with source event, first witness, time, confidence, and claim identity.
2. Define transmission eligibility using contact, trust, faction, distance/channel, and simulation LOD; model delay and potential loss of detail.
3. Track independent corroboration separately from repetition so copying a claim does not automatically increase reliability.
4. Represent corrections and contradictions as linked evidence while preserving what an NPC believed earlier for causal history.
5. Test isolated groups, network bottlenecks, high-trust clusters, false sources, and corrective events; compare reach, delay, and confidence.

## Validation checklist

- [ ] Rumors are not silently promoted to canonical truth.
- [ ] Every claim can be traced to a source and transmission path.
- [ ] Repeated retelling does not create independent corroboration.
- [ ] LOD deferral respects plausible communication timing.
- [ ] Dialogue can express source, confidence, and uncertainty.

## Required output

Provide a rumor schema, transmission rules, confidence/correction policy, and reproducible network test scenarios.

## Boundaries and failure handling

Do not let NPCs describe events they could not observe or learn about; do not equate popularity with truth.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
