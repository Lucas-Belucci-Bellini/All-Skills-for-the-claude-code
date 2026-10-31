---
name: nexora-animation-lod-transition
description: "Reduces skeletal animation cost at distance while preventing visible popping or invalid bone references."
---

# nexora animation lod transition

## Purpose

Use this workflow for NEXORA-scale engine work when skeletal animation LOD transitions. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define LOD bone sets and required gameplay bones.
2. preserve root and hitbox semantics where authoritative.
3. compute remapping tables between skeleton levels.
4. blend or snap using an explicit transition policy.
5. invalidate pose caches on LOD change.
6. test rapid distance changes and camera cuts.
7. profile animation cost.
8. compare silhouette and motion quality.
9. document modded skeleton fallback.

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

LOD changes preserve required semantic bones and visual transitions meet the declared quality threshold.

Do not remove bones still required for collision or gameplay queries. Avoid unbounded crossfade state during rapid LOD changes.

## Trigger examples

- **Positive:** A code change or incident directly involves skeletal animation LOD transitions and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
