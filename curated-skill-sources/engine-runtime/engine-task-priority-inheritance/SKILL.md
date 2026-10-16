---
name: engine-task-priority-inheritance
description: Audit priority inversion where urgent engine work depends on locks, resources, or jobs held by low-priority tasks.
---

# Engine Task Priority Inheritance

## Goal

Keep critical work responsive when a lower-priority task owns a dependency needed to meet a frame, simulation or shutdown deadline.

## Inputs to inspect

Priority classes, lock owners, job dependencies, resource readiness barriers, wait graphs and deadline misses.

## Workflow

1. Identify critical tasks that wait for resources, locks or prerequisite jobs owned by a lower-priority class.
2. Construct dependency chains and measure owner execution/queue delay while the high-priority waiter is blocked.
3. Evaluate bounded priority inheritance, dependency promotion, owner-run completion or queue reprioritization appropriate to the scheduler model.
4. Stress nested dependencies, cycles, cancellation and multiple urgent waiters; ensure promotion does not cause unbounded priority escalation.
5. Add counters for inherited/promoted tasks, waiting duration and deadline outcome, plus a regression for the confirmed inversion.

## Validation checklist

- [ ] Promotion only applies to a known dependency and is reverted when the dependency is released or resolved.
- [ ] Priority inheritance does not bypass safety dependencies or create resource ownership races.
- [ ] Nested dependencies have a bounded and explainable promotion rule.
- [ ] Metrics distinguish priority inversion from legitimate long-running work.

## Required output

A priority dependency graph, inversion evidence, chosen inheritance/promotion rule and stress tests for nested waits.

## Boundaries and failure handling

Do not raise task priority globally when a waiter is blocked on I/O or a dependency that cannot make progress faster by running sooner.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
