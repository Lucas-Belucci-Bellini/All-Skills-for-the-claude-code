---
name: rust-async-backpressure-budget
description: Audit bounded concurrency, queue capacity, task fanout, and overload behavior in async Rust service or engine pipelines.
---

# Rust Async Backpressure Budget

## Goal

Keep async task creation and queued work bounded so bursts cannot cause memory growth or unresponsive shutdown.

## Inputs to inspect

Async task spawn sites, channels/semaphores, request limits, queue metrics, service deadlines and cancellation paths.

## Workflow

1. Trace each producer-to-consumer edge and count whether work is bounded by queue capacity, semaphore permits, worker count or an implicit unbounded task spawn.
2. Estimate worst-case queued memory from message size and concurrency, and measure queue age plus time waiting for capacity under burst load.
3. Define overload semantics per pipeline: wait, reject, coalesce, retry with jitter, defer, or persist; document whether each operation is safe to retry.
4. Stress slow consumers, downstream outages, request fanout and cancellation; verify overload propagates upstream instead of becoming hidden task accumulation.
5. Add saturation telemetry and tests for bounded memory, deadline behavior, shutdown and recovery when the downstream dependency returns.

## Validation checklist

- [ ] Task creation and queues have explicit bounds or a measured justification for unbounded use.
- [ ] Retries cannot multiply load or repeat non-idempotent side effects.
- [ ] Capacity is released on success, error, panic and cancellation.
- [ ] Overload behavior is observable and meets the operation's freshness/deadline contract.

## Required output

A pipeline/backpressure map, queue and concurrency limits, overload policy and stress-test measurements.

## Boundaries and failure handling

Do not blindly add retries or larger queues to a saturated async pipeline; diagnose the limiting consumer first.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
