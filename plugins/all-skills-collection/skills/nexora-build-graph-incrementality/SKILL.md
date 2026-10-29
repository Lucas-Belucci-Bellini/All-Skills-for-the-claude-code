---
name: nexora-build-graph-incrementality
description: "Ensures build graph invalidation rebuilds all and only outputs affected by changed inputs."
---

# nexora build graph incrementality

## Purpose

Use this workflow for NEXORA-scale engine work when engine build system incremental rebuilds. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define input and output nodes with content hashes.
2. record tool and option dependencies.
3. detect missing or cyclic edges.
4. compute reverse dependency invalidation.
5. separate generated outputs from source files.
6. test touching unrelated and transitive inputs.
7. verify clean and incremental builds match.
8. expose rebuild explanations.
9. measure no-op build duration.

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

Incremental and clean builds produce equivalent artifacts and invalidation is explainable.

Do not use timestamps as the only correctness key. Avoid stale outputs when compiler or importer versions change.

## Trigger examples

- **Positive:** A code change or incident directly involves engine build system incremental rebuilds and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
