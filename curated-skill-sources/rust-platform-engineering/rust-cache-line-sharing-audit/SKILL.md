---
name: rust-cache-line-sharing-audit
description: Investigate false sharing and cache-line contention between concurrent Rust workers before changing synchronization or data layout.
---

# Rust Cache-Line Sharing Audit

## Goal

Reduce cross-core cache-line traffic when profiling confirms that independently updated data shares cache lines.

## Inputs to inspect

Concurrent hot structs, per-thread counters, CPU performance counters where available, layout/alignment and thread affinity.

## Workflow

1. Choose a repeatable concurrent workload and inspect profiling evidence for cache-coherence or scaling symptoms across thread counts.
2. Identify fields written by different workers that may occupy the same cache line, distinguishing false sharing from true sharing of one logical value.
3. Prototype layout changes such as separating hot write-heavy fields, sharding counters or batching updates; document platform assumptions for cache-line size.
4. Benchmark throughput, tail latency and memory footprint at low and high worker counts and across supported target architectures when possible.
5. Add a small benchmark or design note for the proven layout constraint and keep the simplest design that provides repeatable benefit.

## Validation checklist

- [ ] The diagnosis distinguishes false sharing from genuine shared-data contention.
- [ ] Padding/alignment assumptions are documented and not treated as universally fixed across architectures.
- [ ] The change does not introduce unsafe layout casts or violate repr/FFI guarantees.
- [ ] Performance improvements are repeatable and include increased memory footprint in the comparison.

## Required output

A field-sharing map, profiling evidence, measured layout comparison and portable constraints for any retained alignment changes.

## Boundaries and failure handling

Do not pad every struct by default; cache-line padding can waste memory and hurt locality without evidence.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
