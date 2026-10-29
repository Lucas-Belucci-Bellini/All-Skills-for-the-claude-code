---
name: nexora-config-defaults-drift-audit
description: "Detects configuration defaults that diverge across code, documentation, sample files, and upgrade migrations."
---

# nexora config defaults drift audit

## Purpose

Use this workflow for NEXORA-scale engine work when engine configuration defaults and drift. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Inventory config schema, code defaults, sample files, docs, and migrations.
2. compare values and types automatically where possible.
3. classify intentional per-platform differences.
4. test fresh-install defaults against upgraded configs.
5. ensure new fields have migration behavior.
6. redact secrets from generated reports.
7. update all canonical sources together.
8. add a drift check to CI.
9. document intentional exceptions.

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

All default values agree or differences are explicitly justified and tested.

Do not copy secrets into sample configuration. Avoid treating a migration default as equivalent to a fresh-install default without verification.

## Trigger examples

- **Positive:** A code change or incident directly involves engine configuration defaults and drift and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
