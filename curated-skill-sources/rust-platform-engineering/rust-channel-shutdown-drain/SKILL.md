---
name: rust-channel-shutdown-drain
description: Verify graceful shutdown and queue draining for Rust worker pipelines, including sender closure, cancellation, deadlines, and partial failure.
---

# Rust Channel Shutdown Drain

## Goal

Ensure accepted messages are either processed, persisted, or explicitly rejected when a service or engine pipeline stops.

## Inputs to inspect

Channel topology, worker supervisors, cancellation tokens, task handles, queue capacity and shutdown orchestration.

## Workflow

1. Define the shutdown contract for each queue: stop accepting, drain accepted work, checkpoint/persist, discard only allowed message classes, then join workers.
2. Trace sender ownership and closure behavior so workers can distinguish temporary emptiness from terminal channel closure.
3. Test shutdown with empty/full queues, blocked producers, a failed consumer, cancellation during work and tasks that never return before deadline.
4. Verify idempotent side effects and durable acknowledgements for messages completed during the drain period; record any work deliberately abandoned.
5. Add a bounded shutdown test with timeouts and metrics for queue depth, drained/rejected count, worker exit and remaining task handles.

## Validation checklist

- [ ] Shutdown order prevents producers from continually replenishing a queue after draining begins.
- [ ] The drain deadline is explicit, and timeout results identify which worker/queue remained active.
- [ ] Accepted durable work is not reported as completed before its acknowledgement/commit.
- [ ] Worker panic or cancellation cannot leave supervisors waiting forever.

## Required output

A shutdown sequence, per-queue disposition policy, failure-injection tests and measured drain/deadline behavior.

## Boundaries and failure handling

Do not call abrupt cancellation 'graceful shutdown'; report work that is lost, retried or left uncertain.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
