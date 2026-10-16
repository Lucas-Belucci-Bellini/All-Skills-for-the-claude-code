---
name: engine-background-task-cancellation
description: Audit cancellation and stale-result handling for background engine jobs across scene changes, shutdown, streaming, and resource reload.
---

# Engine Background Task Cancellation

## Goal

Ensure cancelled work stops or becomes harmless, releases resources, and cannot publish results into a newer world or subsystem generation.

## Inputs to inspect

Job scheduler, cancellation tokens, completion callbacks, scene/world versions, temporary resources and shutdown coordination.

## Workflow

1. Map task creation, owner scope, cancellation source, completion path and any external resources held while work is pending.
2. Define cooperative cancellation checkpoints for long jobs and a generation/version guard for results that may complete after the owner has changed.
3. Exercise cancellation at each stage: queued, running, awaiting I/O, producing temporary data, uploading and publishing final state.
4. Verify cancellation unwinds reservations, files, buffers and subscriptions exactly once; test a worker that ignores cancellation until a timeout.
5. Add counters for requested/effective cancellation, stale completions, cleanup failures and jobs still alive during owner destruction.

## Validation checklist

- [ ] Cancelled tasks cannot mutate state owned by a newer world/scene generation.
- [ ] Cleanup is idempotent and works on error, panic/failure or partial initialization paths.
- [ ] Cancellation semantics distinguish immediate stop, cooperative stop and harmless discard-on-completion.
- [ ] Shutdown is bounded and reports tasks that exceed the deadline.

## Required output

A task ownership/cancellation matrix, stale-result policy, fault-injection cases and cancellation metrics.

## Boundaries and failure handling

Do not rely only on dropping a future or setting a flag if native calls, GPU work or blocking I/O continue outside that cancellation mechanism.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
