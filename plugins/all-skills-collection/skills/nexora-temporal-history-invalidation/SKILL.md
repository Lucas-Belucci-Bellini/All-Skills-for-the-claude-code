---
name: nexora-temporal-history-invalidation
description: "Invalidates temporal antialiasing, upscaling, and motion-history buffers when scene continuity breaks."
---

# nexora temporal history invalidation

## Purpose

Use this workflow for NEXORA-scale engine work when temporal rendering history and ghosting. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. List events that invalidate history such as camera cuts, origin rebases, resize, and shader changes.
2. assign history generations.
3. detect disocclusion and invalid motion vectors.
4. reset only affected histories.
5. coordinate jitter and previous transforms.
6. test teleportation and rapid settings changes.
7. visualize rejection masks.
8. measure ghosting and reset frequency.
9. document backend-specific behavior.

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

Temporal effects do not reuse history across incompatible scene generations and resets are explainable.

Do not clear all history every frame to hide ghosting. Avoid using stale previous transforms after entity reuse.

## Trigger examples

- **Positive:** A code change or incident directly involves temporal rendering history and ghosting and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
