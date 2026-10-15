---
name: rust-async-task-supervision
description: Design supervision and shutdown for long-running Rust async tasks, including restart policy, error propagation, and cancellation ownership.
---

# Rust Async Task Supervision

## Goal

Prevent detached task failures and indefinite shutdown hangs in services or engines with asynchronous subsystems.

## Inputs to inspect

Task spawning sites, JoinSet/JoinHandle usage, runtime ownership, shutdown signals, and subsystem dependencies.

## Workflow

1. Inventory all spawned tasks and classify them as critical, restartable, best-effort, or request-scoped; record who owns each handle.
2. Define how task completion, panic, cancellation, and repeated failure are surfaced to the parent supervisor.
3. Design bounded restart policy with backoff and a failure threshold; avoid restart loops for permanent configuration or data errors.
4. Order shutdown by dependencies: stop admission, signal tasks, drain or cancel in-flight work, release resources, and enforce a deadline.
5. Test task panic, early exit, stuck I/O, repeated restart, shutdown racing task creation, and parent cancellation.

## Validation checklist

- [ ] Every long-lived task has an owner and observable completion/error path.
- [ ] Critical-task failure changes service/engine health intentionally rather than being silently ignored.
- [ ] Restart policy distinguishes transient errors from permanent failures and is rate-limited.
- [ ] Shutdown has a deadline and reports tasks that did not stop.
- [ ] No task is restarted after its supervisor has entered terminal shutdown.

## Required output

Deliver a task ownership graph, supervision policy, restart classification, shutdown state machine, and failure-injection tests.

## Boundaries and failure handling

Do not swallow JoinHandle errors; do not restart every failure indefinitely or detach tasks that own critical resources.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
