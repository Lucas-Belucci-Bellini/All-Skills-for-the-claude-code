---
name: nexora-world-snapshot-consistency
description: "Creates coherent world snapshots for saves, replays, diagnostics, and background analysis while simulation continues."
---

# nexora world snapshot consistency

## Purpose

Use this workflow for NEXORA-scale engine work when consistent world snapshots under concurrent simulation. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define snapshot tick and included subsystem versions.
2. use pause barriers, copy-on-write, or versioned reads according to measured constraints.
3. prevent cross-chunk mixed revisions.
4. bound snapshot memory and duration.
5. distinguish authoritative state from caches.
6. test concurrent edits and chunk streaming.
7. verify save/replay consumers see the same snapshot contract.
8. expose snapshot age and cost.
9. document consistency guarantees.

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

Snapshot consumers receive a coherent declared point-in-time view or a clear failure.

Do not label best-effort mixed reads as atomic snapshots. Avoid blocking simulation indefinitely while copying the world.

## Trigger examples

- **Positive:** A code change or incident directly involves consistent world snapshots under concurrent simulation and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
