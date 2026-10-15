---
name: engine-job-system-backpressure
description: Design a bounded engine job system with explicit queue pressure, priorities, cancellation, and main-thread handoff policies.
---

# engine job system backpressure

## Goal

Prevent worker queues from growing without bound or overwhelming latency-sensitive engine work.

## Inputs to inspect

Task producers, worker counts, queue structures, task priorities, shutdown behavior, and main-thread-only operations.

## Workflow

1. Map every task producer and consumer. Classify work as latency-sensitive, throughput-oriented, background, or main-thread-only and record expected burst sources.
2. Define queue capacity or memory budget, admission policy, backpressure behavior, and what producers do when a queue is full. Avoid unbounded fallback queues.
3. Specify fairness and priority aging so background jobs cannot starve forever and asset streaming cannot delay critical simulation tasks without a deliberate rule.
4. Define cancellation and shutdown semantics for queued and running jobs, including tasks that own buffers, locks, or external resources.
5. Stress the system with burst producers, blocked consumers, worker failure, shutdown during load, and overloaded main-thread completion queues.

## Validation checklist

- [ ] Queue size and queued-byte growth have observable limits.
- [ ] Backpressure is propagated or intentionally handled; tasks are not silently discarded.
- [ ] Priority and fairness behavior is covered by tests under sustained load.
- [ ] Cancellation and shutdown release owned resources and signal completion consistently.
- [ ] Telemetry separates queue wait time from actual job execution time.

## Required output

Deliver a task-classification table, queue/backpressure contract, scheduling policy, shutdown model, and stress-test/telemetry plan.

## Boundaries and failure handling

Do not fix overload only by increasing worker count; do not allow a main-thread completion queue to become the next unbounded bottleneck.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
