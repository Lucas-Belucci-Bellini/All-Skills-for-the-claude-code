---
name: engine-worker-capacity-sizing
description: Size engine worker pools using CPU topology, task cost distributions, blocking behavior, frame deadlines, and oversubscription measurements.
---

# Engine Worker Capacity Sizing

## Goal

Choose worker limits based on observed workload and tail latency rather than assuming that more threads always improve throughput.

## Inputs to inspect

Worker/task traces, CPU topology, core availability, blocking-I/O classes, task durations, queue depths and target frame/tick budgets.

## Workflow

1. Classify tasks as CPU-bound, blocking I/O, latency-critical, bursty or dependency-heavy and identify pools that currently share workers.
2. Measure throughput, queue age, context switches, worker idle time, main-thread interference and p95/p99 completion time across a bounded worker-count matrix.
3. Test on representative core counts and constrained environments, noting background processes and whether hardware concurrency is reliable.
4. Choose separate concurrency policies for materially different task types when shared pools create starvation or excessive blocking.
5. Record the sizing assumptions and add a saturation benchmark that catches both under-provisioning and oversubscription regressions.

## Validation checklist

- [ ] Worker count is not inferred solely from logical CPU count when the workload includes blocking or reserved main/render threads.
- [ ] Tail latency and frame interference are considered alongside throughput.
- [ ] Thread count has a cap and fallback for unusual hardware/container CPU quota reports.
- [ ] Changes preserve queue cancellation, shutdown and fairness semantics.

## Required output

A task-class matrix, worker-count comparison, recommended caps and repeatable saturation benchmark.

## Boundaries and failure handling

Do not create one worker per CPU for every subsystem; account for oversubscription and specialized thread ownership.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
