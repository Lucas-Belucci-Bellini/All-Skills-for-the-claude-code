---
name: simulation-multirate-update-policy
description: Design multi-rate simulation updates for entities and subsystems while preserving required invariants and bounded staleness.
---

# Simulation Multi-Rate Update Policy

## Goal

Reduce simulation cost by updating distant or low-priority state less frequently without allowing gameplay-relevant state to become incoherent.

## Inputs to inspect

Subsystem tick rates, entity tiers, relevance rules, stale-state tolerance, world clock and simulation telemetry.

## Workflow

1. Classify state by required fidelity, maximum tolerable staleness, dependency relationships and whether skipped updates can be safely accumulated.
2. Define update-rate tiers and promotion/demotion triggers based on proximity, active interactions, danger, ownership and recent state changes.
3. Test transitions between rates with timers, collisions, inventory, resource production and event delivery to find lost elapsed time or duplicate catch-up.
4. Measure per-tier cost, queue age and state error at target population scales; verify rate changes do not create synchronization spikes.
5. Add invariants and repeatable scenarios for promotion/demotion, pause/fast-forward and entities crossing relevance boundaries.

## Validation checklist

- [ ] Every skipped subsystem has a documented staleness/catch-up contract.
- [ ] State affecting collisions, ownership, deadlines or conservation is not silently deferred beyond its invariant tolerance.
- [ ] Promotion to a higher rate does not replay or duplicate already-accounted time.
- [ ] CPU savings and behavioral differences are measured together.

## Required output

An update-rate matrix, transition state machine, invariant report and profiling evidence across representative population sizes.

## Boundaries and failure handling

Do not treat less frequent updating as equivalent to pausing all state; timers, resource flows and deadlines may need analytical advancement.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
