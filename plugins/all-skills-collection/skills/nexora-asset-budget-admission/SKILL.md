---
name: nexora-asset-budget-admission
description: "Rejects or defers asset loads that would exceed declared memory, GPU, or decode budgets."
---

# nexora asset budget admission

## Purpose

Use this workflow for NEXORA-scale engine work when asset memory admission and streaming pressure. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Estimate decoded CPU and GPU costs before allocation.
2. account for mip levels, staging buffers, and temporary import memory.
3. define critical and optional asset classes.
4. reserve budget atomically before starting expensive work.
5. release reservations on cancellation and failure.
6. prioritize requests under pressure.
7. test burst loads and duplicate requests.
8. compare estimates with observed memory.
9. expose rejection/defer reasons.

## Validation checklist

- [ ] The invariant and measurable acceptance criteria are explicit.
- [ ] Ownership, lifecycle, and failure handling are documented.
- [ ] Tests cover normal, boundary, repeated, and failure cases.
- [ ] Changes preserve source/plugin byte parity and catalog uniqueness.
- [ ] Focused tests, formatting, and applicable static checks pass; skipped checks are listed.
- [ ] Performance and reliability claims include reproducible evidence.

## Required output

Provide the decision and scope, invariants, code paths reviewed or changed, tests and results, compatibility implications, and unresolved risks.

## Boundaries and failure handling

Concurrent asset admission cannot oversubscribe declared budgets beyond documented estimation error.

Do not count compressed file size as decoded memory. Ensure cancelled jobs release reservations exactly once.

## Trigger examples

- **Positive:** A code change or incident directly involves asset memory admission and streaming pressure and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
