---
name: nexora-chunk-lighting-propagation-budget
description: "Bounds lighting propagation work while preserving correct results across voxel chunk boundaries."
---

# nexora chunk lighting propagation budget

## Purpose

Use this workflow for NEXORA-scale engine work when voxel lighting propagation and update storms. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define light value ranges and propagation rules.
2. separate direct sky light from block-emitted light where relevant.
3. track dirty regions and dependency versions.
4. prioritize propagation near active areas.
5. cap per-tick work with resumable queues.
6. define behavior for unloaded neighbors.
7. test edits at chunk boundaries and large cavities.
8. compare results against a reference solver on small worlds.
9. measure queue growth and convergence time.

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

Lighting converges to the reference behavior within documented bounds and queues remain bounded.

Do not mark lighting complete while required propagation remains pending. Avoid hidden light sources from stale chunk caches.

## Trigger examples

- **Positive:** A code change or incident directly involves voxel lighting propagation and update storms and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
