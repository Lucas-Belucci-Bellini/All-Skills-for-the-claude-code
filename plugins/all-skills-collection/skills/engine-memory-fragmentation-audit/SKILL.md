---
name: engine-memory-fragmentation-audit
description: Diagnose engine memory fragmentation by separating live allocations, reserved capacity, free gaps, and high-water behavior.
---

# Engine Memory Fragmentation Audit

## Goal

Distinguish leaks from fragmentation and capacity policy problems using allocator evidence and workload phases.

## Inputs to inspect

Allocator metrics, allocation-size histograms, frame/scene lifecycle, resource pools, lifetime traces and memory budgets.

## Workflow

1. Establish memory accounting boundaries for committed, reserved, live, pooled, mapped and GPU memory so numbers are not double-counted.
2. Capture allocation size/lifetime distributions across startup, steady state, scene change, streaming bursts and unload.
3. Check whether failures come from total capacity, contiguous-region requirements, pool exhaustion, delayed reclamation or truly unreachable allocations.
4. Re-run the same workload with allocation tagging or controlled pool settings; compare high-water mark, fragmentation indicators and allocation failures.
5. Recommend bounded pool sizing, lifetime grouping or allocator changes only for the allocator/path implicated by evidence; add metrics for repeat monitoring.

## Validation checklist

- [ ] The report separates fragmentation from leaks and from intentionally retained caches.
- [ ] CPU and GPU memory are not summed without explaining accounting overlap.
- [ ] High-water and steady-state values are both reported with workload context.
- [ ] Any pool cap and fallback behavior are explicit and observable.

## Required output

A memory-accounting map, phase-by-phase allocation profile, confirmed fragmentation findings and prioritized remediation plan.

## Boundaries and failure handling

Do not label retained caches as leaks without inspecting ownership and eviction policy; do not lower safety margins based on one run.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
