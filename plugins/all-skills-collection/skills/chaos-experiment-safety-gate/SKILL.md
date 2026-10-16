---
name: chaos-experiment-safety-gate
description: "Review fault-injection experiments for bounded blast radius, measurable hypotheses, abort signals, cleanup and explicit operational authorization."
---

# Chaos Experiment Safety Gate

## Purpose

Make resilience experiments informative and reversible without leaving a system in an unknown state.

## Required inputs

Experiment hypothesis, environment, fault mechanism, dependency map, blast-radius limit, safety signals, rollback and approval owner.

## Workflow

1. State the hypothesis, target population and observable signals that confirm or refute it.
2. Bound affected instances/tenants/traffic, duration, start conditions and hard abort criteria.
3. Confirm health monitoring, recovery readiness, on-call contact and permission to inject the fault.
4. Prepare a dry run and test cleanup independently; ensure the fault can be stopped if the target control plane degrades.
5. For an approved experiment, record timestamps and signal snapshots; stop on abort, then verify baseline recovery.

## Validation checklist

- [ ] Blast radius and duration are bounded before execution.
- [ ] Abort criteria are objective, observable and owned.
- [ ] Cleanup and recovery are rehearsed.
- [ ] Data, authorization and durability invariants are protected.
- [ ] Evidence records expected and unexpected outcomes.

## Required output

A go/no-go checklist, experiment card, abort/cleanup procedure and evidence-based result report.

## Boundaries and failure handling

Do not inject production faults without explicit authorization. If monitoring or rollback is unavailable, block execution. The label “chaos” does not reduce operational risk.

## Trigger examples

- **Positive:** A team plans to disable one staging dependency to test fallback behavior.
- **Negative:** Writing deterministic unit tests against an in-memory fake only.
