---
name: engine-runtime-degradation-state
description: Define explicit runtime degradation modes for overload, memory pressure, missing optional subsystems, and exhausted background capacity.
---

# Engine Runtime Degradation State

## Goal

Let an engine preserve core correctness and communicate reduced capability rather than failing unpredictably when resources or optional features are unavailable.

## Inputs to inspect

Runtime health signals, subsystem readiness, memory and queue budgets, optional feature dependencies and fallback behavior.

## Workflow

1. Classify core versus optional capabilities and define the minimum healthy operating state for each supported runtime profile.
2. Specify triggers and hysteresis for degradation modes such as reduced background simulation, disabled speculative loading or lower visual quality.
3. Map each degraded mode to disabled/limited features, fallback behavior, required diagnostics and conditions for recovery.
4. Exercise overlapping faults and recovery oscillation, including memory pressure combined with worker saturation or optional subsystem failure.
5. Add a state transition report and scenario tests ensuring authoritative simulation, persistence and security boundaries survive degradation.

## Validation checklist

- [ ] Each degradation mode has clear entry/recovery conditions and user/operator-visible diagnostics.
- [ ] Core invariants and durable state are prioritized over optional performance or presentation features.
- [ ] Recovery does not cause repeated expensive reloads or oscillation between modes.
- [ ] Multiple simultaneous pressures resolve according to documented precedence.

## Required output

A runtime health state machine, capability/fallback table, transition telemetry and multi-fault regression scenarios.

## Boundaries and failure handling

Do not silently disable core correctness checks or persistence as a resource-pressure response; document any unavailable functionality clearly.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
