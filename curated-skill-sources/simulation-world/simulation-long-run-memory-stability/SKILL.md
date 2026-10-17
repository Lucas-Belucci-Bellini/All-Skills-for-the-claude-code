---
name: simulation-long-run-memory-stability
description: Analyze memory trends during long-running world simulation to distinguish bounded caches and population changes from leaks or gradual retention.
---

# Simulation Long-Run Memory Stability

## Goal

Detect memory growth that appears only over thousands of ticks, repeated travel, entity churn, save cycles or world streaming.

## Inputs to inspect

Heap/allocation samples, subsystem caches, entity lifecycle, event history, save/reload cycles and long-run telemetry.

## Workflow

1. Select a repeatable long-duration scenario with controlled entity creation/destruction, chunk/region travel, NPC events and scheduled persistence.
2. Capture memory at warmup, steady-state intervals and after major lifecycle cycles; separate live bytes, reserved capacity, cache bytes and OS/GPU memory where possible.
3. Correlate growth with entity counts, retained event histories, subscription counts, cached world regions and pending jobs; check whether growth plateaus under stable workload.
4. Trigger cleanup, unload, save/reload and controlled cache eviction at known checkpoints to see which allocations should be released or intentionally retained.
5. Minimize any unbounded growth scenario and add trend thresholds for live objects/bytes, queue backlog and post-cleanup residue.

## Validation checklist

- [ ] Accounting categories avoid double-counting pooled/reserved/cached memory.
- [ ] Expected growth from added world content is separated from growth under repeated equivalent cycles.
- [ ] Metrics include post-cleanup high-water behavior and outstanding ownership references.
- [ ] The test records workload/seed/version so suspected leaks can be reproduced.

## Required output

A long-run memory timeline, ownership/correlation findings, stable-growth baseline and regression test for repeated lifecycle cycles.

## Boundaries and failure handling

Do not label a monotonic cache as a leak until its eviction policy and workload diversity have been examined.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
