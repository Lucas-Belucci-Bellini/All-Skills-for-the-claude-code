---
name: nexora-upgrade-preflight-report
description: "Predicts save, mod, and configuration risks before applying an engine upgrade."
---

# nexora upgrade preflight report

## Purpose

Use this workflow for NEXORA-scale engine work when engine upgrade and save migration preflight. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Read current world and config metadata without mutation.
2. identify required migrations and unsupported mods.
3. estimate disk space and backup requirements.
4. validate available migration paths.
5. detect missing assets and deprecated APIs.
6. generate a risk-ranked report.
7. require confirmation for destructive or irreversible actions.
8. test preflight against known fixtures.
9. record the exact target version and source revision.

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

The report identifies blockers and required backups before any destructive upgrade work begins.

Preflight must remain read-only. Do not claim a migration is safe if its code path has not been tested.

## Trigger examples

- **Positive:** A code change or incident directly involves engine upgrade and save migration preflight and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
