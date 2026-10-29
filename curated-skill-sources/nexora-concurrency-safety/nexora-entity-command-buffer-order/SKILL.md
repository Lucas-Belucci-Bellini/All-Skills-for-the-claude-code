---
name: nexora-entity-command-buffer-order
description: "Defines deterministic application order for structural ECS commands emitted by parallel systems."
---

# nexora entity command buffer order

## Purpose

Use this workflow for NEXORA-scale engine work when parallel ECS command buffers and structural changes. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Identify command producers and synchronization boundaries.
2. assign stable ordering keys.
3. define conflict rules for spawn, despawn, and component writes.
4. merge buffers deterministically.
5. reject commands targeting stale entity generations.
6. specify commands emitted during flush.
7. test worker scheduling permutations.
8. instrument conflicts and buffer growth.
9. verify save/network observers see post-flush state consistently.

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

Equivalent inputs yield deterministic structural changes and conflicts are resolved explicitly.

Do not let thread completion order decide spawn IDs or conflicting mutations.

## Trigger examples

- **Positive:** A code change or incident directly involves parallel ECS command buffers and structural changes and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
