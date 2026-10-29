---
name: nexora-collision-shape-cache-identity
description: "Prevents collision-shape cache collisions and stale geometry after asset or voxel changes."
---

# nexora collision shape cache identity

## Purpose

Use this workflow for NEXORA-scale engine work when collision shape caching and geometry invalidation. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define canonical inputs including geometry, scale, cooking options, and backend version.
2. hash relevant inputs rather than filenames.
3. track asset/chunk revisions.
4. publish cooked shapes atomically.
5. invalidate after relevant edits.
6. validate metadata before reuse.
7. test scale changes and different cooking options.
8. monitor hit rate and memory.
9. document fallback when cooking fails.

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

Equivalent inputs reuse valid shapes and relevant changes invalidate stale entries.

Do not key solely by asset path. Treat cached physics data as untrusted and version backend formats.

## Trigger examples

- **Positive:** A code change or incident directly involves collision shape caching and geometry invalidation and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
