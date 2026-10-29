---
name: nexora-world-edit-command-transaction
description: "Applies multi-block terrain edits atomically across validation, derived data, and persistence."
---

# nexora world edit command transaction

## Purpose

Use this workflow for NEXORA-scale engine work when world editing and multi-block terrain changes. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Represent edits as validated commands with affected coordinates.
2. validate permissions, bounds, chunk availability, and conflicts before mutation.
3. capture prior values or reversible deltas.
4. apply authoritative changes in a defined order.
5. invalidate lighting, collision, navigation, mesh, and persistence dependencies.
6. publish completion only after authoritative mutation succeeds.
7. test partial I/O failures and overlapping edits.
8. verify derived systems converge.
9. record transaction identity for diagnostics and replay.

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

The authoritative edit is all-or-nothing within its declared scope and derived systems receive complete invalidation.

Do not report success before commit. Make limits explicit for edits spanning many regions.

## Trigger examples

- **Positive:** A code change or incident directly involves world editing and multi-block terrain changes and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
