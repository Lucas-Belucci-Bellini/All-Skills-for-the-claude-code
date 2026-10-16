---
name: engine-work-stealing-fairness
description: Audit work-stealing queues for starvation, excessive migration, cache disruption, and unfair scheduling between engine worker classes.
---

# Engine Work-Stealing Fairness

## Goal

Use work stealing to balance idle and busy workers without causing priority inversion or unstable latency for frame-critical tasks.

## Inputs to inspect

Worker-local queues, global injection queues, task classes, steal counters, queue-age metrics and frame traces.

## Workflow

1. Map which jobs enter local versus shared queues, what makes them stealable and whether task priority survives queue transfer.
2. Measure per-worker utilization, queue age, steal attempts/successes, task migration and tail task duration under balanced and skewed workloads.
3. Stress one worker with long jobs, bursty producer threads and tasks with dependencies that can block after being stolen.
4. Test policies such as stealing only eligible work, bounded local batches, priority-aware global queues or periodic fairness transfers.
5. Add saturated-workload regressions proving that idle capacity helps drain backlog without starving deadlines or moving tasks endlessly.

## Validation checklist

- [ ] Stealing preserves task priority, cancellation and ownership metadata.
- [ ] No task is lost or executed twice during transfer between queues.
- [ ] Worker fairness and task age are measured in addition to total throughput.
- [ ] Pinned or affinity-sensitive tasks are not migrated contrary to their contract.

## Required output

A queue/steal topology, fairness and migration metrics, policy comparison and regression cases for skewed workloads.

## Boundaries and failure handling

Do not optimize only for maximum throughput if the result worsens frame-critical tail latency or starves a task class.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
