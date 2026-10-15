---
name: rust-async-cancellation-safety
description: Review Rust async operations for cancellation-safe state transitions, dropped futures, partial side effects, and resource cleanup.
---

# Rust Async Cancellation Safety

## Goal

Ensure cancellation cannot leave operations in a partially committed or unrecoverable state.

## Inputs to inspect

Async functions, timeout/select usage, mutex/lock scopes, network and filesystem operations, transaction boundaries, and shutdown behavior.

## Workflow

1. Find futures used with `select!`, timeouts, task aborts, request cancellation, and dropped join handles. Trace every path where execution can stop between awaits.
2. Mark state mutations and external side effects before and after each await. Determine whether cancellation can occur after a remote action succeeds but before local state is recorded.
3. Check locks, permits, channel reservations, file writes, and temporary resources for cleanup or state restoration when a future is dropped.
4. Where required, move the operation into a supervised task, use a transaction/idempotency key, or split prepare/commit phases so cancellation semantics are explicit.
5. Test cancellation before the operation, during each await boundary, after remote success, and during shutdown. Confirm retries do not duplicate externally visible effects.

## Validation checklist

- [ ] Every await boundary has an understood partial-progress state.
- [ ] Timeouts are not assumed to roll back remote work that already occurred.
- [ ] External operations use idempotency or reconciliation when retries may repeat them.
- [ ] Locks are not held across long external awaits without a justified contention policy.
- [ ] Cancellation tests validate final state and external side effects, not only returned errors.

## Required output

Deliver a cancellation map, unsafe interruption points, recommended transaction/idempotency changes, and targeted tests.

## Boundaries and failure handling

Do not label an async function cancellation-safe merely because it compiles; do not assume dropping a future undoes I/O or remote mutations.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
