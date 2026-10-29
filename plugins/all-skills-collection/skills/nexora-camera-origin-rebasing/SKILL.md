---
name: nexora-camera-origin-rebasing
description: "Maintains camera and rendering precision in large worlds using origin rebasing or camera-relative coordinates."
---

# nexora camera origin rebasing

## Purpose

Use this workflow for NEXORA-scale engine work when large-world camera precision and origin rebasing. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Separate persistent world coordinates from render coordinates.
2. choose rebasing triggers and one owner.
3. update camera, transforms, particles, lights, and GPU constants consistently.
4. keep save/network identity canonical.
5. avoid rebasing authoritative physics unless designed.
6. test boundary crossings and teleports.
7. inspect temporal history and shadow caches.
8. measure jitter.
9. document precision limits.

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

A rebase preserves world identity and avoids visible discontinuities across dependent render systems.

Do not rewrite persistent coordinates during a render-origin shift. Invalidate incoherent temporal history.

## Trigger examples

- **Positive:** A code change or incident directly involves large-world camera precision and origin rebasing and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
