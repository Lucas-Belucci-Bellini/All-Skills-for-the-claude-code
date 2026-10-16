---
name: network-authoritative-state-reconciliation
description: Audit client/server state reconciliation for authoritative ownership, stale snapshots, correction thresholds, and prediction recovery.
---

# Network Authoritative State Reconciliation

## Goal

Keep client-visible state convergent with the server while limiting visible correction artifacts and rejecting stale updates.

## Inputs to inspect

Authority rules, snapshot sequencing, client prediction, correction logic, entity generations, transport timing and replay traces.

## Workflow

1. Map which side owns each mutable field and how client-predicted, server-authoritative and presentation-only state are separated.
2. Trace snapshots through sequence numbers, tick IDs and entity-generation identifiers; define behavior for delayed, duplicated, missing and out-of-order snapshots.
3. Compare predicted and authoritative state at reconciliation points and classify acceptable interpolation error versus hard correction or resimulation triggers.
4. Test packet delay/loss, reconnect, entity despawn/reuse and clock/tick mismatch using deterministic network simulation.
5. Add counters for correction magnitude/frequency, stale snapshot rejection and resimulation cost; add regression cases for each confirmed divergence.

## Validation checklist

- [ ] Only the declared authority may commit authoritative state changes.
- [ ] Old snapshots cannot overwrite newer ticks or a newer generation of a recycled entity ID.
- [ ] Presentation smoothing does not alter the authoritative simulation state.
- [ ] Reconnect and packet loss recovery return to a valid synchronized state.

## Required output

An authority/field matrix, snapshot-ordering policy, divergence metrics and network-simulation regression suite.

## Boundaries and failure handling

Do not smooth away a persistent authority or protocol bug; separate presentation corrections from invalid simulation state.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
