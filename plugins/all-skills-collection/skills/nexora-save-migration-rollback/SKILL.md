---
name: nexora-save-migration-rollback
description: "Makes world-save migrations reversible or safely restartable when an upgrade fails partway through."
---

# nexora save migration rollback

## Purpose

Use this workflow for NEXORA-scale engine work when save schema migration and rollback. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Identify source and target schema versions.
2. define preconditions and migration invariants.
3. write a migration plan before changing the original.
4. migrate into a new generation or transactional staging area.
5. validate required records and references.
6. preserve the previous version until validation succeeds.
7. test interruption at each stage.
8. support idempotent restart or explicit rollback.
9. report incompatible mods and dropped fields.

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

Migration either produces a validated target generation or preserves the original with a clear failure report.

Never overwrite the only source before target validation. Do not claim reversibility if information is intentionally discarded.

## Trigger examples

- **Positive:** A code change or incident directly involves save schema migration and rollback and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
