---
name: nexora-animation-pose-cache-invalidation
description: "Keeps cached animation poses valid when skeletons, clips, retargeting maps, or blend inputs change."
---

# nexora animation pose cache invalidation

## Purpose

Use this workflow for NEXORA-scale engine work when animation pose caching and invalidation. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define the complete cache key from skeleton, clip, time quantization, blend parameters, and retarget map.
2. version relevant inputs.
3. distinguish immutable clip data from mutable pose output.
4. invalidate on hot reload and schema migration.
5. bound cache memory.
6. test identical and near-identical inputs.
7. measure hit rate versus memory cost.
8. verify thread-safe publication.
9. expose invalidation reasons.

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

Cached poses are reused only when all relevant inputs match and cache growth is bounded.

Do not key only by clip ID when skeleton or blend parameters differ. Avoid sharing mutable pose buffers between consumers.

## Trigger examples

- **Positive:** A code change or incident directly involves animation pose caching and invalidation and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
