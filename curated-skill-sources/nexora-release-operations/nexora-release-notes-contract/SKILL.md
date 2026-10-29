---
name: nexora-release-notes-contract
description: "Produces release notes that distinguish user-visible changes, compatibility changes, fixes, and known risks."
---

# nexora release notes contract

## Purpose

Use this workflow for NEXORA-scale engine work when engine release notes and migration communication. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Collect changes from merged commits and issue records.
2. classify features, fixes, breaking changes, migrations, and known limitations.
3. verify claims against tested behavior.
4. include affected versions and upgrade steps.
5. mention mod/plugin compatibility changes.
6. exclude internal secrets and speculative promises.
7. link reproducible bug reports where appropriate.
8. review with maintainers.
9. archive notes alongside the release artifact.

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

Notes are accurate, actionable, and aligned with actual compatibility and migration behavior.

Do not claim a bug is fixed without a regression check or evidence. Avoid promising unimplemented roadmap items.

## Trigger examples

- **Positive:** A code change or incident directly involves engine release notes and migration communication and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
