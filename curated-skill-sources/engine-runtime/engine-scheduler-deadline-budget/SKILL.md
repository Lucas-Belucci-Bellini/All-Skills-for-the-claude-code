---
name: engine-scheduler-deadline-budget
description: Audit scheduler deadlines, work budgets, and deadline-miss behavior across frame-critical and background engine tasks.
---

# Engine Scheduler Deadline Budget

## Goal

Make scheduler overload predictable by assigning explicit deadlines and bounded work rather than allowing background work to consume the frame budget.

## Inputs to inspect

Scheduler queues, task classes, frame timing, task deadlines, completion metrics and overload handling.

## Workflow

1. Classify tasks by criticality, deadline, minimum service requirement, cost estimate and whether work can be deferred or cancelled.
2. Trace how the scheduler accounts for dispatch overhead, queue wait, execution time and dependencies; distinguish budget spent from budget reserved.
3. Stress bursts of streaming, asset loads, AI updates and cleanup while measuring deadline misses, queue age and frame impact.
4. Evaluate deadline-aware dispatch, per-class quotas, aging and work slicing against the same workload; verify cleanup and critical tasks cannot be starved.
5. Add telemetry and deterministic overload fixtures that assert bounded frame-critical work and a documented fallback when deadlines cannot be met.

## Validation checklist

- [ ] Every task class has an explicit deadline/budget or a documented reason it is best-effort.
- [ ] Budget accounting does not count waiting time as execution cost or ignore dependency stalls.
- [ ] Overload behavior is bounded and observable instead of silently accumulating work.
- [ ] Changes preserve progress for cleanup and low-priority tasks over sustained load.

## Required output

A task-class budget table, scheduler trace, deadline-miss report and regression scenarios for overload.

## Boundaries and failure handling

Do not respond to missed deadlines only by increasing worker count or dropping all background tasks; identify the critical path and fairness requirements.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
