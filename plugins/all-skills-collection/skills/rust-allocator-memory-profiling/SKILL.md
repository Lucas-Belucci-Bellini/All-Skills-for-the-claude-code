---
name: rust-allocator-memory-profiling
description: Profile Rust allocation rate, retained heap, fragmentation, and hot allocation sites before choosing an allocator or data-structure change.
---

# Rust Allocator Memory Profiling

## Goal

Locate allocation-driven latency or memory pressure using representative workload evidence.

## Inputs to inspect

Representative benchmarks, allocation profiles, heap snapshots, crate/module map, and target platform.

## Workflow

1. Record workload, build profile, allocator, toolchain, and CPU/memory baseline; distinguish allocation count, allocated bytes, live bytes, and RSS.
2. Profile startup, steady-state, peak workload, and repeated teardown with available platform-compatible tools.
3. Rank hot allocation sites by total bytes, frequency, lifetime, and call path; separate temporary churn from long-lived retention.
4. Prototype a targeted change such as buffer reuse, capacity reservation, arena lifetime, or data layout and verify ownership/reuse correctness.
5. Repeat identical profiles and compare tail latency, allocation count, live heap, and RSS; document trade-offs across supported targets.

## Validation checklist

- [ ] Profiles represent the same workload before and after the change.
- [ ] Temporary churn is distinguished from live retained memory and allocator reservation.
- [ ] Unsafe or pooling changes preserve lifetime and thread-safety invariants.
- [ ] Improvement is demonstrated in more than one relevant metric or workload.
- [ ] Platform/tool limitations and measurement noise are documented.

## Required output

Produce a ranked allocation profile, root cause evidence, one-change-at-a-time comparison, and a repeatable profiling recipe.

## Boundaries and failure handling

Do not swap allocators based on anecdotes; do not treat RSS that remains high as proof of a live object leak.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
