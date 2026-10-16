---
name: civilization-production-throughput-audit
description: Audit resource-flow throughput, bottlenecks, queueing, and conservation in simulated civilization production chains.
---

# Civilization Production Throughput Audit

## Goal

Explain whether an economy's output is limited by inputs, labor, transport, facilities, scheduling or resource accounting rather than tuning rates blindly.

## Inputs to inspect

Production recipes, stockpiles, worker assignments, transport jobs, facility utilization, resource flows and time-series telemetry.

## Workflow

1. Model production chains as a directed resource-flow graph and annotate recipe rates, input/output quantities, labor, facility capacity and transport constraints.
2. Record resource inflow/outflow, queue time, utilization, starvation and blocked capacity per stage over representative simulation horizons.
3. Check conservation and unit consistency across recipes, storage, spoilage, crafting batches, trade and delayed transport.
4. Run controlled perturbations such as extra labor, input supply, storage capacity or transport bandwidth to confirm which constraint changes total output.
5. Add long-horizon scenarios and dashboards that expose bottleneck migration, oscillation, deadlocks and unintended infinite production loops.

## Validation checklist

- [ ] Rates use consistent simulation-time units and batch rounding is accounted for.
- [ ] Resource conservation distinguishes produced, consumed, destroyed, reserved and in-transit amounts.
- [ ] Capacity gains are validated end-to-end; increasing one stage does not conceal a downstream bottleneck.
- [ ] Results are compared across early and steady-state simulation phases.

## Required output

A resource-flow graph, throughput and queue-time report, verified bottleneck and reproducible balancing scenario.

## Boundaries and failure handling

Do not tune recipe numbers from a single snapshot; include warmup, transport delay and long-run steady-state behavior.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
