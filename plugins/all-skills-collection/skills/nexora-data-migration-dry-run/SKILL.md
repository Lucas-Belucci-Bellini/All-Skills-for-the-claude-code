---
name: nexora-data-migration-dry-run
description: "Previews migration effects and resource requirements without mutating the original world or configuration."
---

# nexora data migration dry run

## Purpose

Use this workflow for NEXORA-scale engine work when migration planning and dry-run mode. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Read source data through a read-only path.
2. run transformation logic against isolated staging structures.
3. report changed, dropped, and unresolved records.
4. estimate temporary disk and memory requirements.
5. validate target invariants.
6. ensure dry-run code cannot publish outputs.
7. test equivalence between dry-run report and actual migration.
8. include target version and migration code revision.
9. redact sensitive values.
10. provide a clear go/no-go summary.

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

Dry-run produces useful migration evidence while leaving source bytes unchanged.

Do not call a run dry if it writes to the source or performs irreversible external side effects.

## Trigger examples

- **Positive:** A code change or incident directly involves migration planning and dry-run mode and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
