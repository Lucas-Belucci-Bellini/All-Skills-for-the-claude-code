---
name: voxel-chunk-work-amplification-audit
description: "Use when a local voxel edit or world event triggers unexpectedly large chunk remeshing, lighting, save, or replication work; not for general frame-time profiling."
---

# Voxel Chunk Work Amplification Audit

## Purpose

Measure how much downstream work one logical chunk change causes and find unbounded invalidation fan-out.

## Required inputs

Chunk dimensions, neighbor dependencies, dirty-flag propagation, task queue metrics, representative edits, and expected work bounds.

## Workflow

1. Trace a single controlled world edit through mesh invalidation, neighbor updates, lighting, persistence, collision, and replication queues.
2. Count dirty chunks and scheduled jobs per edit for interior, border, corner, rapid repeated, and cross-region cases.
3. Compare the observed fan-out with documented neighbor dependencies; distinguish necessary work from duplicate invalidations and stale-job retries.
4. Propose coalescing, dependency indexing, batching, or narrower invalidation, then rerun the same scenario and compare measurements.

## Verification checklist

- [ ] Interior and boundary edits have separate measured work counts.
- [ ] Repeated changes coalesce where safe instead of scheduling unbounded duplicate jobs.
- [ ] Canceled or stale jobs cannot mark newly valid output as dirty again.
- [ ] Correctness checks prove optimization did not leave visible mesh, lighting, or save inconsistencies.

## Required output

A per-edit amplification report, affected dependency graph, before/after counters, and a regression threshold.

## Boundaries and failure handling

Do not reduce dependency updates based only on performance numbers; retain correctness tests for chunk borders and concurrent edits.

When required evidence, permissions, or environment details are unavailable, stop at the supported analysis, record the missing prerequisite, and do not report an unexecuted validation as passing.

## Trigger examples

- **Positive:** Editing one block causes dozens of chunk rebuilds even when the block is far from boundaries.
- **Negative:** Profiling GPU frame time when no chunk invalidation or world-edit path is involved.
