---
name: rust-allocator-contention-analysis
description: Profile allocator lock contention and allocation churn in concurrent Rust workloads before changing allocation strategy.
---

# Rust Allocator Contention Analysis

## Goal

Reduce time lost to shared allocator paths while keeping allocation ownership, deallocation and memory limits correct.

## Inputs to inspect

Allocation profiles, thread traces, allocator configuration, task concurrency, object lifetime patterns and throughput benchmarks.

## Workflow

1. Establish allocation rate, allocated bytes, object-size distribution, lifetime distribution and allocator-related waiting under representative concurrent load.
2. Map hot allocation sites to task/thread behavior and distinguish allocator lock time from memory copying, page faults and unrelated synchronization.
3. Evaluate targeted options such as capacity reuse, batching, arena/region allocation, object pooling or alternative allocator configuration against actual lifetime patterns.
4. Run stress tests covering burst concurrency, cancellation, long-lived objects and teardown; verify allocations are reclaimed at the intended boundary.
5. Compare throughput, tail latency, RSS/high-water memory and fragmentation, and retain a rollback plan for allocator-specific behavior changes.

## Validation checklist

- [ ] Profiling evidence isolates allocator contention rather than inferring it from total CPU time.
- [ ] Pools/arenas have explicit maximum capacity and release rules.
- [ ] The alternative does not increase retained memory beyond documented limits or cross ownership boundaries unsafely.
- [ ] Benchmarks use matching toolchain, allocator and workload and report variance.

## Required output

An allocation/contended-time profile, candidate trade-off table, before/after measurements and bounded implementation recommendation.

## Boundaries and failure handling

Do not switch global allocators or introduce pools based only on synthetic microbenchmarks; validate workload fit and operational memory behavior.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
