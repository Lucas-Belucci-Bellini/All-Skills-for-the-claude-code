---
name: rust-async-runtime-diagnostics
description: "Diagnoses Rust async stalls, task leaks, lock contention, and runtime misuse. Use when a Tokio or async-std service/game tool hangs, spikes latency, or never shuts down."
---

# Rust Async Runtime Diagnostics

## Use when
Async failures are attributed to the runtime without evidence about blocked workers, unbounded queues, lock order, or cancellation.

## Workflow
1. Capture runtime, executor configuration, task topology, channel capacity, blocking calls, and the shortest reliable hang reproduction.
2. Instrument task start/finish, queue depth, wait duration, lock hold time, cancellation, and shutdown progress.
3. Look for blocking I/O on async workers, locks held across await, unbounded producer queues, lost cancellation, and tasks without owners.
4. Make one targeted fix and rerun the same load/hang test while tracking latency and graceful shutdown.

## Required output
A task/queue/lock map, root-cause hypothesis with evidence, instrumentation plan, and regression test.

## Validation
- The suspected stall can be tied to a blocked worker, dependency, lock, or queue.
- Load and shutdown are tested, not only the happy path.
- Diagnostics do not leak secrets or change task timing excessively.

## Guardrails
Do not respond by blindly increasing thread count or replacing async with sync; first identify the blocked resource.
