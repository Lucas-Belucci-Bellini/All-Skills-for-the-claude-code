---
name: replication-interest-management
description: Design server replication interest sets so clients receive necessary state while bandwidth and privacy exposure remain bounded.
---

# replication interest management

## Goal

Scale multiplayer worlds by replicating relevant entities and events to the right clients at the right fidelity.

## Inputs to inspect

Entity types, spatial partitioning, player contexts, replication channels, bandwidth budget, and entity visibility rules.

## Workflow

1. Classify replicated state by gameplay importance, update frequency, size, and confidentiality; distinguish public world data from private player data.
2. Define interest-set membership using spatial range plus semantic factors such as ownership, party, quest state, visibility, or active interaction.
3. Choose update rates and snapshot detail by distance/relevance; specify reliable versus unreliable delivery and how event streams handle gaps.
4. Set per-client bandwidth budgets and priorities so critical state wins over cosmetic or distant updates under congestion.
5. Test boundary crossings, teleportation, entity creation/destruction, large crowds, party changes, and clients with deliberately constrained bandwidth.

## Validation checklist

- [ ] Interest membership has explicit entry/exit hysteresis and no repeated churn at boundaries.
- [ ] Private state is never sent to clients that lack authorization, even when spatially nearby.
- [ ] Priority and bandwidth limits preserve critical control/gameplay events.
- [ ] Creation/destruction and snapshot transitions cannot leave permanent ghost entities.
- [ ] Metrics show bytes and update frequency by channel/entity class.

## Required output

Produce an interest policy, data classification matrix, replication budget, transition rules, and bandwidth/authorization tests.

## Boundaries and failure handling

Do not use distance as the only rule for private or quest-specific data; do not assume unreliable updates are safe without state repair.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
