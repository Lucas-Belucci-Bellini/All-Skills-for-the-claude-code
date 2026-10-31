---
name: async-concurrency-patterns
description: "Designs asynchronous and concurrent code with explicit cancellation, backpressure, resource limits, and error propagation. Use when implementing async/await workflows, worker pools, parallel requests, or background tasks."
---

# Async Concurrency Patterns

## Goal
Improve throughput and responsiveness without losing control of task lifetime, resource use, or failures.

## Workflow
1. Determine whether the workload is I/O-bound, CPU-bound, latency-sensitive, or throughput-oriented; choose async, threads, processes, or a bounded worker pool accordingly.
2. Identify shared state, task ownership, cancellation points, ordering requirements, and side effects.
3. Bound concurrency and queue size; define backpressure or rejection behavior instead of allowing unbounded task creation.
4. Set explicit deadlines and timeouts for external operations; propagate cancellation and ensure cleanup runs.
5. Define how failures are aggregated, retried, surfaced, or isolated. Retry only operations that are safe to repeat or have idempotency protection.
6. Avoid blocking an event loop with CPU-heavy or blocking I/O work; move it to the appropriate executor or worker.
7. Protect shared mutable state with the simplest suitable synchronization or ownership model; prefer message passing or immutable data when practical.
8. Test cancellation, timeout, partial failure, overload, and shutdown behavior—not only successful completion.
9. Measure throughput, tail latency, queue depth, and resource usage under representative load.
10. Document task ownership and ensure background tasks cannot silently outlive the request or service that owns them.

## Deliverable
- Concurrency model and resource bounds.
- Cancellation/error policy.
- Tests for overload and partial failure.
- Measurements and remaining risks.

## Acceptance criteria
- Work is bounded and cancellation has defined semantics.
- Errors are observable and resources are released.
- Retries cannot accidentally duplicate non-idempotent effects.
- Shutdown behavior is deterministic enough for the stated contract.

## Guardrails
- Do not spawn unbounded tasks from untrusted input.
- Do not swallow task exceptions.
- Do not assume concurrency automatically improves CPU-bound workloads.

