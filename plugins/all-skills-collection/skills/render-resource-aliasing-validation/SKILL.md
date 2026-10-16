---
name: render-resource-aliasing-validation
description: Validate transient render-resource aliasing against lifetime overlap, format compatibility, barriers, and frame-in-flight ownership.
---

# Render Resource Aliasing Validation

## Goal

Reduce transient GPU memory without allowing two live render resources to overlap the same storage unsafely.

## Inputs to inspect

Render graph, transient allocator, resource descriptors, pass lifetimes, aliasing barriers and GPU validation output.

## Workflow

1. Build a per-frame lifetime interval for each transient resource from its first write through its final consumer, including async queues.
2. Identify resources sharing physical memory and verify their live intervals cannot overlap across passes, queues or frames in flight.
3. Compare usage flags, alignment, size, format class, sample count and backend restrictions for every proposed alias pair.
4. Stress optional render passes, parallel queues, resize, delayed GPU completion and multi-frame buffering; inspect alias barriers and initialization semantics.
5. Add debug-time alias validation and capture memory savings versus the prior allocation plan.

## Validation checklist

- [ ] Aliased resource intervals are proven non-overlapping across all relevant queues.
- [ ] Memory requirements and alignment satisfy the backend's aliasing rules.
- [ ] First use initializes every value read by later passes, regardless of prior physical occupant.
- [ ] Memory savings and fallback behavior are measurable and deterministic.

## Required output

An alias-pair table, lifetime proof, confirmed hazard list, validation tests and measured transient memory savings.

## Boundaries and failure handling

Do not rely only on render-pass order if multiple queues or frames in flight can access the memory concurrently.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
