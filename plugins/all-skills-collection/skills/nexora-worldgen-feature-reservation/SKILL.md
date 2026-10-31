---
name: nexora-worldgen-feature-reservation
description: "Prevents large world-generation features from being duplicated, clipped, or inconsistently placed across chunks."
---

# nexora worldgen feature reservation

## Purpose

Use this workflow for NEXORA-scale engine work when cross-chunk world generation features. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define feature anchor coordinates and deterministic candidate IDs.
2. assign ownership of each feature to a canonical region.
3. reserve intersecting chunks before writing.
4. separate placement decisions from per-chunk realization.
5. define conflict priority for overlapping features.
6. test generation order permutations and parallel chunk schedules.
7. persist or reconstruct reservations consistently.
8. verify unload/reload does not duplicate features.
9. report clipped features and conflicts.

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

The same seed produces consistent cross-chunk features regardless of generation order.

Do not let whichever chunk finishes first decide feature placement. Avoid unbounded global reservation tables.

## Trigger examples

- **Positive:** A code change or incident directly involves cross-chunk world generation features and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
