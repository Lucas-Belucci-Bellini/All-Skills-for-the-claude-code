---
name: simulation-scheduler-fairness-audit
description: Audit fairness, starvation and priority inversion across simulation jobs, agents, regions and background maintenance work.
---

# Simulation Scheduler Fairness Audit

## Goal

Ensure priority-based scheduling remains responsive to urgent work without permanently starving eligible low-priority tasks.

## Inputs to inspect

Scheduler queues, priority classes, task age, service cost, population tiers and completion traces.

## Workflow

1. Define the unit of fairness and service expectation for each class: per-agent updates, region work, jobs, maintenance or deadline-bound events.
2. Measure wait age, service frequency, missed deadlines and completed work by class under idle, normal and overloaded conditions.
3. Create adversarial cases where one class floods the queue or expensive jobs dominate workers; observe whether low-priority work makes progress.
4. Evaluate aging, deficit round-robin, per-class quotas or bounded admission against measured delay while preserving urgent deadline handling.
5. Add fairness regressions with a maximum acceptable starvation interval and telemetry for queue age distribution.

## Validation checklist

- [ ] Starvation criteria are explicit for each workload class.
- [ ] Priority increases cannot be abused by unbounded self-promotion or untrusted input.
- [ ] Urgent work retains deadlines while background tasks receive bounded eventual service.
- [ ] The policy is checked under saturation, not only low-load average conditions.

## Required output

A scheduler fairness matrix, starvation measurements, policy recommendation and saturated-queue regression scenarios.

## Boundaries and failure handling

Do not force identical service rates for tasks with different safety or urgency needs; fairness must match workload semantics.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
