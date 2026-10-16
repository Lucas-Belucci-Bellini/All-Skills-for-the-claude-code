---
name: engine-resource-budget-overcommit-detection
description: "Use when multiple subsystems reserve shared memory, workers, GPU, or streaming capacity beyond available resources; not for profiling one allocator."
---

# Engine Resource Budget Overcommit Detection

## Purpose

Use when multiple subsystems reserve shared memory, workers, GPU, or streaming capacity beyond available resources; not for profiling one allocator.

## Required inputs

Inputs: subsystem budget declarations, runtime limits, live reservations, peak workload, resource lifetimes and fallbacks.

## Workflow

1. Distinguish hard limits, soft targets, per-device limits, and shared budgets.
2. Sum overlapping peaks, including temporary upload/transition duplication and safety margin.
3. Stress simultaneous subsystem peaks and observe rejection, eviction, throttling, and allocation failures.
4. Recommend coherent global budgets and priority/ownership rules where components assume shared capacity independently.

## Verification checklist

Checks: overlapping lifetimes are accounted for; hard limits are distinct; overcommit response is observable; degraded modes preserve critical reserves.

## Required output

Output: capacity matrix, peak-overlap calculation, observed behavior, prioritized fixes.

## Boundaries and failure handling

Boundary: do not infer capacity from one successful allocation or average usage alone; preserve spike headroom.

If evidence, permissions, or environment details are missing, document the limitation and don't report unrun checks as passing.

## Trigger examples

- Positive: Positive: texture streaming, physics, and decoding fit alone but fail together.
- Negative: Negative: diagnosing a single-subsystem leak after global accounting is ruled out.
