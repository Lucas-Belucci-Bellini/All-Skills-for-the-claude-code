---
name: nexora-shared-cache-concurrent-invalidation
description: "Prevents stale cache values from reappearing when invalidation races with concurrent recomputation."
---

# nexora shared cache concurrent invalidation

## Purpose

Use this workflow for NEXORA-scale engine work when concurrent cache invalidation and recompute. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Assign source generations to cache entries.
2. capture generation when computation starts.
3. validate generation before publishing.
4. ensure invalidation advances the generation atomically.
5. define whether old readers may finish with stale values.
6. test invalidate/recompute races.
7. deduplicate concurrent work.
8. bound retired values.
9. instrument stale publish rejections.
10. document memory ordering assumptions.

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

Results computed from invalidated sources cannot become the new active cache value.

Do not rely on deleting a map entry alone if an in-flight task can republish it. Define allowed stale reads explicitly.

## Trigger examples

- **Positive:** A code change or incident directly involves concurrent cache invalidation and recompute and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
