---
name: agent-run-deadline-budget-allocation
description: "Allocates a parent deadline across planning, delegated work, reconciliation, and finalization. Use when a run must finish within one wall-clock limit."
---

# Agent Run Deadline Budget Allocation

## Purpose

Reserve time for reconciliation and final output instead of resetting timeouts for each child or retry.

## Required inputs

Parent deadline, finalization reserve, task criticality, latency observations, retry policy, and cancellation capabilities.

## Workflow

1. Establish one absolute parent deadline using a monotonic clock and reserve time for finalization.
2. Allocate child deadlines from the remaining parent budget rather than assigning every child a fresh full timeout.
3. Keep time for output verification, persistence, and user-facing status before dispatching optional work.
4. Assign smaller budgets to exploratory tasks and protect critical paths with explicit minimum allocations.
5. Propagate timeout requests and record separately whether each remote worker actually stopped.
6. Compare estimated and actual phase durations and update future allocation without silently relaxing hard limits.

## Validation checklist

- [ ] Each child deadline is bounded by the parent deadline.
- [ ] Retries consume the same run budget unless a new run is authorized.
- [ ] Finalization has an explicit reserve.
- [ ] Cancellation requested and worker termination are separate facts.

## Required output

A budget table per phase and child, timeout actions, reserve values, and observed timing deltas.

## Boundaries and failure handling

Use monotonic time for duration; do not promise hard deadlines for tools that cannot be cancelled or bounded.

## Trigger examples

- **Positive:** A parent run has several child tasks and a strict time budget.
- **Negative:** A single HTTP call needs one isolated timeout.
