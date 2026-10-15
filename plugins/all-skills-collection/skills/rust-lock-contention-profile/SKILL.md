---
name: rust-lock-contention-profile
description: Diagnose Rust lock contention and critical-section duration using concurrent workload traces and ownership analysis.
---

# Rust Lock Contention Profile

## Goal

Improve concurrent throughput without weakening synchronization or introducing data races.

## Inputs to inspect

Mutex/RwLock usage, async lock sites, thread/task topology, contention profiles, and representative workload.

## Workflow

1. Inventory shared mutable state and label each lock's protected invariant, owner, expected hold time, and acquisition order.
2. Capture contention under representative load, separating wait duration, hold duration, queue length, and time spent doing useful work while locked.
3. Trace lock ordering and awaits inside async critical sections; identify I/O, callbacks, allocation, and expensive computation performed while holding locks.
4. Prototype narrower critical sections, sharding, immutable snapshots, channels, or ownership transfer and compare the same workload.
5. Stress concurrency, cancellation, and shutdown while checking invariants and tail latency.

## Validation checklist

- [ ] Every lock protects a documented invariant rather than being added speculatively.
- [ ] Lock-order cycles and awaits while holding locks are examined.
- [ ] Performance comparison uses comparable thread counts and workload distributions.
- [ ] Refactoring preserves synchronization guarantees and has race-oriented tests where available.
- [ ] Median and tail wait times are reported separately.

## Required output

Deliver a lock map, contention trace summary, critical-section findings, measured alternatives, and concurrency regression tests.

## Boundaries and failure handling

Do not remove a lock solely to improve benchmark numbers; do not hold locks across blocking or external work without an explicit rationale.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
