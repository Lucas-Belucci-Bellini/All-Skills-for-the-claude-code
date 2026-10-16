---
name: rust-task-cancellation-propagation
description: Verify cancellation reaches child tasks, blocking work, I/O operations and resource guards throughout an async Rust workflow.
---

# Rust Task Cancellation Propagation

## Goal

Prevent orphaned background tasks and partially committed operations when a parent request, scene or service shuts down.

## Inputs to inspect

Task spawn/join structure, cancellation tokens, select branches, blocking boundaries, resource guards and cleanup logic.

## Workflow

1. Map parent/child task relationships and identify detached spawns, blocking calls, long loops and external operations that do not observe cancellation.
2. Specify cancellation propagation and ownership: who signals, who awaits completion, what cleanup runs and which side effects may already have committed.
3. Inject cancellation before start, during I/O, while waiting on a lock/semaphore, during retries and after partial output has been produced.
4. Check that drop behavior of futures and guards releases permits/resources, while separately managing operations that continue in native or blocking code.
5. Add bounded tests for cancellation latency and assert no task, lock, temporary file or reservation survives beyond the declared lifetime.

## Validation checklist

- [ ] Child-task lifetime is attached to an owner or intentionally detached with explicit supervision.
- [ ] Cancellation and operation failure are distinguishable if recovery semantics differ.
- [ ] No lock or resource guard is held across a cancellation-sensitive wait without justification.
- [ ] Cleanup and side-effect commit boundaries remain correct for partial completion.

## Required output

A task lifetime tree, cancellation contract, fault-injection tests and metrics for cancellation latency/orphaned work.

## Boundaries and failure handling

Do not assume dropping a JoinHandle cancels the underlying task; verify runtime semantics and the code's supervision model.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
