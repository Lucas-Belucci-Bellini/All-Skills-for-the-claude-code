---
name: rust-shared-state-lock-elimination
description: Profile Rust shared-state contention and evaluate ownership partitioning, message passing, snapshots, or read-optimized structures before replacing locks.
---

# Rust Shared State Lock Elimination

## Goal

Remove demonstrated contention from shared mutable state without weakening synchronization or creating incoherent snapshots.

## Inputs to inspect

Mutex/RwLock sites, contention traces, access patterns, state ownership boundaries, concurrency requirements and benchmarks.

## Workflow

1. Map each shared state value to its readers/writers and classify whether access needs mutation, consistent multi-field snapshots, ordering or atomicity.
2. Use contention profiling or lock-wait instrumentation to identify hot locks and their longest critical sections before selecting an alternative.
3. Evaluate localized ownership, per-worker state, immutable snapshots, message passing, sharding, atomics or RwLock only against the observed access pattern.
4. Prototype one candidate and define consistency semantics, update propagation, shutdown behavior and how readers observe partial or stale values.
5. Benchmark realistic concurrent load and validate race-sensitive invariants with tests or available concurrency tooling; retain a simple lock when gains are not material.

## Validation checklist

- [ ] A removed lock is replaced by an explicit ownership or consistency mechanism.
- [ ] Atomics use appropriate ordering and do not attempt to protect multi-field invariants alone.
- [ ] Snapshot freshness and cross-field consistency are documented for consumers.
- [ ] The measured gain is not offset by high copying cost, stale cache behavior or more complex failure handling.

## Required output

A contention profile, synchronization alternatives table, chosen consistency contract, and before/after benchmark.

## Boundaries and failure handling

Do not remove synchronization because a race failed to appear in a manual run; evidence must address all concurrent access paths.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
