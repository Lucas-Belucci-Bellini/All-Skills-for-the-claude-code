---
name: engine-thread-pool-saturation
description: Diagnose thread-pool saturation, queue buildup, worker imbalance and starvation in engine job systems.
---

# Engine Thread Pool Saturation

## Goal

Keep background work bounded and responsive when world generation, asset loading or simulation compete for workers.

## Inputs to inspect

Job queue metrics, worker states, priorities, task durations, wait graphs, frame traces and cancellation behavior.

## Workflow

1. Map job producers and consumers, worker limits, priority rules, dependencies and tasks that synchronously wait on other jobs.
2. Record queue depth/age, worker utilization, task duration percentiles, idle time and main-thread waits during representative peak workloads.
3. Reproduce oversubscription, nested task waits, blocked I/O, long-tail tasks and priority inversion with bounded test scenarios.
4. Adjust one policy at a time—batch size, queue partition, worker count, work stealing or I/O separation—and compare tail latency and frame impact.
5. Add saturation counters and a stress test that verifies the system remains bounded and reports stalled dependencies clearly.

## Validation checklist

- [ ] Queue growth and oldest-job age are measured, not inferred only from high CPU use.
- [ ] Worker count changes account for CPU topology and competing processes.
- [ ] Priority rules cannot starve required cleanup or critical streaming jobs indefinitely.
- [ ] Shutdown and cancellation complete even when queues are saturated.

## Required output

A producer-consumer map, saturation trace, root-cause classification and an evidence-backed scheduling adjustment.

## Boundaries and failure handling

Do not increase worker count as a universal fix for blocking I/O, dependency deadlocks or CPU oversubscription.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
