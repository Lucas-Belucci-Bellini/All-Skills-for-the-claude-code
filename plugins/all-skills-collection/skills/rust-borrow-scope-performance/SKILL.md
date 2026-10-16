---
name: rust-borrow-scope-performance
description: Review Rust borrow scopes, clone frequency, allocation boundaries, and lock lifetimes when profiling points to avoidable data movement or contention.
---

# Rust Borrow Scope Performance

## Goal

Reduce unnecessary copying and excessive critical sections while keeping ownership explicit and maintainable.

## Inputs to inspect

Rust hot paths, allocation profiles, clone sites, borrow-checker workarounds, lock scope, and representative benchmarks.

## Workflow

1. Start from a measured hot path and inventory allocations, clones, collection growth, and references held across expensive work or await points.
2. Separate ownership requirements from convenience clones; trace whether borrowed data can safely outlive the current call without introducing aliasing or lifetime complexity.
3. Shorten lock and mutable-borrow scopes by extracting snapshots or computing independent results outside critical sections where semantics permit.
4. Compare alternatives such as slices, iterators, Cow, Arc sharing or explicit owned boundaries using allocation counts and workload benchmarks.
5. Add a benchmark or focused test for the improved path and review readability, error behavior and ownership complexity before keeping the change.

## Validation checklist

- [ ] The optimization addresses a measured cost instead of speculative micro-optimization.
- [ ] No borrowed reference escapes the lifetime of its owner and no unsafe workaround is introduced without a separate audit.
- [ ] Clone removal does not create stale shared state or increase contention elsewhere.
- [ ] Benchmarks use realistic input sizes and report variance as well as the median.

## Required output

A borrow/ownership map for the hot path, measured allocation or contention comparison, and the smallest maintainable change.

## Boundaries and failure handling

Do not replace clear ownership with pervasive Arc/Mutex or unsafe code solely to eliminate a small number of clones.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
