---
name: civilization-migration-validation
description: Validate simulated migration and settlement dynamics for capacity, route feasibility, resource pressure, and stable population accounting.
---

# Civilization Migration Validation

## Goal

Catch migration rules that teleport populations, exceed settlement capacity, duplicate residents, or trigger endless movement oscillation.

## Inputs to inspect

Migration triggers, settlement capacity, travel model, resource availability, population records, and deterministic test worlds.

## Workflow

1. Map migration triggers—hazard, opportunity, family/faction links, resource shortage, or policy—and specify how candidate settlements and routes are scored.
2. Define capacity and arrival/departure accounting so people remain in a coherent traveling, originating, or destination state throughout the journey.
3. Test costs and constraints for distance, dangerous routes, seasonal closure, failed travel, and destinations that become unavailable mid-route.
4. Run long-horizon scenarios with shortages, disasters, new settlements, crowded destinations, and disconnected regions; measure repeated reversals and population conservation.
5. Inspect outliers and tune one threshold or feedback factor at a time, preserving the same seeds and recording the expected design behavior.

## Validation checklist

- [ ] Population counts remain conserved across departure, travel, arrival, death, and cancellation.
- [ ] Settlements do not exceed capacity unless overflow behavior is explicitly modeled.
- [ ] Routes and destinations are feasible at the time travel is committed.
- [ ] Failed migration has a defined fallback and cannot leave residents unassigned indefinitely.
- [ ] Long simulations detect oscillating movement and resource-driven collapse.

## Required output

Produce a migration state/accounting model, scenario corpus, population/capacity invariants, outlier report, and tuning evidence.

## Boundaries and failure handling

Do not represent migration as an instantaneous population transfer if travel is part of the simulation; do not fix oscillation with unexplained teleportation or hard clamps.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
