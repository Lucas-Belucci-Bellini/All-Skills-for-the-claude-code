---
name: agent-concurrent-task-ownership-arbitration
description: "Defines how workers compete to own the same task without duplicating execution. Use when multiple workers can claim or recover the same queued task."
---

# Agent Concurrent Task Ownership Arbitration

## Purpose

Make ownership verifiable across retries, lease expiry, and delayed workers.

## Required inputs

Logical task key, store capabilities, claim lease, fencing generation, worker identity, and side-effect safety controls.

## Workflow

1. Define a canonical logical task key distinct from attempt and worker identity.
2. Acquire ownership through an atomic claim that returns a monotonically increasing generation when possible.
3. Require writes and side-effect adapters to validate the current generation where downstream fencing is supported.
4. On expiry, record the old generation as stale and define how in-flight work will be reconciled.
5. Reject stale-owner results and inspect any external effect that may have happened before ownership changed.
6. Test simultaneous claims, paused workers, delayed heartbeats, expiry races, and stale commits.

## Validation checklist

- [ ] Only one claim generation is authoritative.
- [ ] Lease expiry is not proof that the former worker stopped.
- [ ] Stale owners are fenced where the downstream system supports it.
- [ ] Recovery accounts for already-committed side effects.

## Required output

An ownership state machine, fencing contract, recovery matrix, and race-test fixtures.

## Boundaries and failure handling

Without fencing or downstream idempotency, exactly-once external execution cannot be guaranteed.

## Trigger examples

- **Positive:** Two workers can recover the same task after a coordinator restart.
- **Negative:** A single-threaded script cannot have duplicate owners.
