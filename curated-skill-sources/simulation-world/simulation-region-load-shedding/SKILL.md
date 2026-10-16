---
name: simulation-region-load-shedding
description: Define controlled load shedding for distant or overloaded simulation regions while preserving authoritative events and resource invariants.
---

# Simulation Region Load Shedding

## Goal

Keep simulation throughput bounded during population or world-scale overload without silently losing important region transitions.

## Inputs to inspect

Region activity tiers, event queues, tick budgets, resource flows, NPC scheduling, spatial relevance and catch-up behavior.

## Workflow

1. Classify regional work by authoritative necessity, deadline, relevance, and whether it can be analytically advanced or safely deferred.
2. Define explicit overload modes with thresholds and hysteresis, specifying which work is rate-limited, coalesced, deferred, or still mandatory.
3. Stress a sudden population/region increase and compare resource flows, ownership, event ordering and time progression against the normal-rate reference where equivalence is promised.
4. Exercise region promotion/demotion, travel between regions, interactions crossing region boundaries and persistence while some regions are throttled.
5. Add metrics for shed/deferred work, backlog age, promotion reasons and recovery time; ensure the system returns to normal operation without a catch-up storm.

## Validation checklist

- [ ] Critical events and invariants are never dropped without an explicit failure state.
- [ ] Deferred timers/resources are advanced consistently with the time model.
- [ ] Cross-region interactions wake or promote both relevant sides as required.
- [ ] Hysteresis prevents rapid throttling/unthrottling oscillation.

## Required output

A region load-shedding policy, event disposition matrix, overload test results and recovery telemetry.

## Boundaries and failure handling

Do not freeze distant regions wholesale when their resource flows or scheduled events must continue; define what can be safely approximated.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
