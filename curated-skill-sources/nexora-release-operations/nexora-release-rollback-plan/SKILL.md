---
name: nexora-release-rollback-plan
description: "Defines safe rollback when a new engine build, mod API, or world format causes critical regressions."
---

# nexora release rollback plan

## Purpose

Use this workflow for NEXORA-scale engine work when engine release rollback and incident response. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Identify rollback unit and compatibility constraints.
2. preserve previous binaries and metadata.
3. determine whether data migrations are reversible.
4. define world-save backup and restore steps.
5. specify rollback triggers and decision owner.
6. test rollback on a disposable representative world.
7. verify clients/servers can interoperate or fail safely.
8. record operator actions.
9. document cases where downgrade is unsupported.

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

Rollback can restore a known-good runtime or clearly identify irreversible data changes before release.

Do not promise binary rollback after destructive save migration without a tested data strategy.

## Trigger examples

- **Positive:** A code change or incident directly involves engine release rollback and incident response and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
