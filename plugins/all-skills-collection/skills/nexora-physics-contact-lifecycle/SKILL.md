---
name: nexora-physics-contact-lifecycle
description: "Defines stable creation, persistence, and removal of physics contacts across fixed simulation steps and chunk streaming."
---

# nexora physics contact lifecycle

## Purpose

Use this workflow for NEXORA-scale engine work when physics contact lifecycle and collision events. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Identify the physics backend's contact generation and removal semantics.
2. define stable collider/entity identities.
3. distinguish contact begin, persist, and end events.
4. order contact events at a simulation tick boundary.
5. invalidate contacts when colliders or chunks disappear.
6. deduplicate backend callbacks.
7. test fast movement, sleeping bodies, and unload/reload.
8. verify gameplay receives each transition once.
9. instrument orphaned contacts and event volume.

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

Contact transitions are delivered once and stale contacts cannot reference removed colliders.

Do not assume backend callback order is deterministic. Never retain raw collider pointers after owner destruction.

## Trigger examples

- **Positive:** A code change or incident directly involves physics contact lifecycle and collision events and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
