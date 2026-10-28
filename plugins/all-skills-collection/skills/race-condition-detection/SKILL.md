---
name: race-condition-detection
description: "Finds and prevents race conditions and data races by mapping shared state, interleavings, and synchronization guarantees. Use when bugs are intermittent under concurrency or when adding shared caches, background workers, or parallel execution."
---

# Race Condition Detection

## Goal
Identify unsafe interleavings and make concurrent state transitions correct under the language and runtime memory model.

## Workflow
1. Capture the intermittent symptom, environment, concurrency level, and observable invariant that is violated.
2. Map shared mutable state, writers/readers, object lifetimes, synchronization primitives, and external side effects.
3. Enumerate relevant interleavings; identify check-then-act sequences, lost updates, stale reads, double execution, and unsafe publication.
4. Prefer ownership, immutable snapshots, message passing, or atomic operations when they express the invariant more simply than broad locking.
5. If locks are required, define lock ownership, acquisition order, critical-section scope, and deadlock prevention.
6. Use language-supported race detectors, sanitizers, stress tests, deterministic schedulers, or concurrency model tests when available.
7. Add barriers or controlled scheduling in tests where needed to make the dangerous interleaving reproducible; avoid relying only on sleeps.
8. Verify invariants under contention, cancellation, retries, shutdown, and failure paths.
9. Inspect performance after synchronization changes to catch contention or starvation.
10. Document what the chosen primitive guarantees under the specific language/runtime memory model.

## Deliverable
- Shared-state map and violated invariant.
- Reproduction or stress/regression test.
- Corrective synchronization/ownership strategy.
- Tool output and limitations.

## Acceptance criteria
- The proposed fix addresses the actual unsafe interleaving.
- Shared state has clear ownership and synchronization.
- Regression coverage exercises the relevant concurrent behavior.
- Correctness and performance claims match the evidence.

## Guardrails
- Do not treat adding a mutex as proof of correctness.
- Do not use sleeps as the sole synchronization strategy in tests.
- Do not suppress race-detector findings without an explained, reviewed reason.

