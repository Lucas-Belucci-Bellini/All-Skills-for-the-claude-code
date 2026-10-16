---
name: wasm-plugin-host-call-budget
description: "Use when frequent WebAssembly host callbacks dominate execution cost; not for deciding which host capabilities are allowed."
---

# Wasm Plugin Host Call Budget

## Purpose

Use when frequent WebAssembly host callbacks dominate execution cost; not for deciding which host capabilities are allowed.

## Required inputs

Inputs: WASM imports, call frequency/duration traces, runtime, workload, budget, correctness fixtures.

## Workflow

1. Instrument calls and duration by import, instance, and workload phase.
2. Profile normal and worst-case workloads to separate host work from boundary-crossing cost.
3. Set measured per-frame/task budgets and consider batching or coarser APIs.
4. Stress budget exhaustion and check that throttling/failure preserves invariants and does not starve other plugins.

## Verification checklist

Checks: calls attributed by import/workload; budget based on measurements; batching retains validation; exhaustion is visible.

## Required output

Output: host-call profile, budget proposal, before/after data, regression threshold.

## Boundaries and failure handling

Boundary: do not weaken validation or expand capabilities solely for speed; sandbox untrusted plugins.

If evidence, permissions, or environment details are missing, document the limitation and don't report unrun checks as passing.

## Trigger examples

- Positive: Positive: a voxel plugin makes thousands of host calls per frame for block lookups.
- Negative: Negative: deciding whether WASM may access the filesystem.
