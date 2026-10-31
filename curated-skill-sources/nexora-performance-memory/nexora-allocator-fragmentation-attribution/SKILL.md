---
name: nexora-allocator-fragmentation-attribution
description: "Separates allocator fragmentation, retained free pages, live allocations, cache retention, and real leaks across NEXORA workloads."
---

# NEXORA Allocator Fragmentation Attribution

## Purpose

Use this workflow when NEXORA process memory remains unexpectedly high after chunk, mesh, asset, or world workloads finish, or when allocation churn appears to reduce available memory despite stable logical resource counts.

This workflow owns allocator-level fragmentation diagnosis and its attribution to NEXORA workload lifetimes. It does not replace `rust-allocator-memory-profiling` for general Rust allocation profiling, `nexora-memory-budget-attribution` for subsystem memory ownership, or `nexora-memory-ledger-pressure-reporting` for interpreting MemoryLedger reports.

## Required inputs

- Exact NEXORA commit, Rust toolchain, target OS/architecture, build profile, and active global or scoped allocator configuration.
- A reproducible workload covering the suspected lifecycle: startup, world generation, chunk streaming, mesh rebuild, asset churn, save/load, unload, or shutdown.
- Available allocator statistics and their documented meanings: requested/live bytes, usable bytes, active/allocated/committed/reserved bytes, free or retained pages, size-class data, thread-cache data, and trim/decommit counters where supported.
- NEXORA ownership map for the affected allocations: subsystem, allocation site, object lifetime, worker/thread, pool/cache owner, and release boundary.
- Process memory measurements with CPU heap, mapped/resident pages, stacks, and GPU allocations kept separate where the platform exposes them.
- Existing MemoryLedger reports and pool definitions, if available; treat the ledger as subsystem accounting, not allocator introspection.

## Diagnostic protocol

1. **Pin the allocator implementation.** Inspect the active allocator, feature flags, platform-specific paths, and available statistics APIs. Record unavailable counters explicitly; do not assume jemalloc, mimalloc, allocator control APIs, or equivalent instrumentation is present.
2. **Define the workload lifecycle.** Reproduce the exact allocation pattern with fixed world seed, chunk radius, asset set, entity count, worker concurrency, and duration. Separate warm-up, steady state, peak activity, quiescence, unload, and process exit.
3. **Capture a layered baseline.** At each phase, record live/requested bytes, allocator usable or active bytes, committed/reserved bytes, resident process memory, allocation/deallocation counts, and available size-class or page statistics. Record the measurement source and sampling overhead.
4. **Separate memory domains.** Keep CPU allocator-managed memory distinct from GPU resources, mapped files, stacks, executable pages, and OS caches. Never subtract GPU or mapped-file counters from RSS unless the accounting domains are proven to overlap exactly.
5. **Classify the symptom before proposing a fix.** Distinguish live object retention, intentional cache/pool capacity, internal size-class waste, external fragmentation, allocator page retention, delayed thread-cache reclamation, and an actual leak. If allocator statistics cannot distinguish them, report the classification as uncertain rather than deriving fragmentation from RSS alone.
6. **Map retained capacity to owners.** Correlate allocator changes with NEXORA lifecycle events and subsystem ownership. Use MemoryLedger totals as an independent owner-level view; a pool's recorded bytes are not proof of allocator-resident pages or fragmentation.
7. **Inspect size and lifetime distributions.** Capture allocation-size histograms, alignment, lifetime cohorts, allocation/deallocation pairing, thread affinity, and free-order patterns. Look for mixed short-lived and long-lived objects sharing pages or arenas, but verify that the allocator exposes evidence for the suspected mechanism.
8. **Run churn experiments.** Compare stable repeated workloads with adversarial size/lifetime patterns: alternating short- and long-lived chunk data, varied mesh capacities, asset replacement, cancellation, and concurrent worker bursts. Preserve identical logical output and workload volume across runs.
9. **Evaluate bounded interventions separately.** Test one change at a time: lifetime segregation, bounded arenas with explicit reset points, pool capacity limits, reusable buffers, size-class-aware grouping, controlled trim/decommit, or allocator configuration. Do not introduce global pools or allocator swaps without target-platform evidence.
10. **Prove lifecycle safety.** Verify that arena resets occur only after all users have quiesced, pooled objects cannot cross ownership or world-session boundaries, cancellation and error paths release reservations, and retained capacity has a documented upper bound.
11. **Compare the right outcomes.** Report live bytes, committed/reserved bytes, resident memory, allocator-reported fragmentation metrics, allocation latency, p95/p99 frame or tick time, and workload throughput separately. Do not call a change successful merely because RSS falls if latency, churn, or correctness regresses.
12. **Repeat and preserve evidence.** Run matched repetitions, disclose variance and warm-up, retain raw allocator snapshots and workload identifiers, and record exact commands, tool versions, and unavailable counters. Re-profile after allocator, toolchain, concurrency, or object-lifetime changes.

## Validation checklist

- [ ] Allocator identity, configuration, platform, and available statistics are recorded.
- [ ] The workload and each lifecycle boundary are reproducible and pinned.
- [ ] Live bytes, allocator capacity, committed/reserved memory, and process RSS are reported as distinct quantities.
- [ ] GPU, mapped-file, stack, and OS-cache accounting is not mixed with CPU heap measurements.
- [ ] Fragmentation is supported by allocator evidence, not inferred from high RSS alone.
- [ ] MemoryLedger is used only for owner-level accounting, not as an allocator-statistics substitute.
- [ ] Size/lifetime distributions and concurrency effects are captured where available.
- [ ] Every proposed arena, pool, or trim policy has an explicit capacity and release boundary.
- [ ] Repeated workloads preserve output correctness and report tail latency as well as memory.
- [ ] Raw evidence, exact commands, uncertainty, and rollback criteria are retained.

## Required output

Produce a fragmentation attribution report containing the pinned commit and allocator, platform/build details, workload identity, lifecycle snapshots, live-versus-committed-versus-resident memory table, available fragmentation/size-class statistics, NEXORA owner mapping, classification with confidence, matched intervention results, p95/p99 latency and throughput deltas, reproduction commands, raw artifact locations, and unresolved risks.

## Boundaries and failure handling

- Do not label allocator-retained pages as a leak without live-allocation and lifecycle evidence.
- Do not label cache or pool capacity as fragmentation when the owning subsystem intentionally retains it.
- Do not claim exact external fragmentation when the allocator exposes no suitable statistics.
- Do not assume that calling a trim API releases all pages to the operating system or immediately lowers RSS.
- Do not reset an arena while jobs, render submissions, save operations, or other consumers can still reference its contents.
- If statistics are unavailable or incompatible across platforms, report a bounded estimate and state which conclusions cannot be made.
- If an intervention improves memory but worsens frame-time tails or throughput, preserve the trade-off and do not present it as an unconditional optimization.

## Trigger examples

- **Positive:** NEXORA RSS or committed memory stays high after chunk/mesh/asset churn and the team needs to distinguish fragmentation from retained objects or caches.
- **Positive:** A pool, arena, or allocator change needs evidence for memory reclamation, capacity bounds, and lifecycle safety.
- **Negative:** The task is only to rank hot allocation call sites; use `rust-allocator-memory-profiling`.
- **Negative:** The task is to interpret MemoryLedger pressure or at-rest pool reports; use `nexora-memory-ledger-pressure-reporting`.
