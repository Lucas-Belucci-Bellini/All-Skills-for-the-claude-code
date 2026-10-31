---
name: nexora-entity-component-schema-migration
description: "Migrates persisted entity components without exposing runtime-only layout or pointer details."
---

# nexora entity component schema migration

## Purpose

Use this workflow for NEXORA-scale engine work when ECS component persistence migrations. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Separate persisted schema from in-memory component layout.
2. version each durable component contract.
3. define field defaults and removed-field policy.
4. migrate records in staging.
5. validate entity references and component invariants.
6. handle missing plugins or unknown components explicitly.
7. test old fixtures and round-trip behavior.
8. keep migration idempotent.
9. report components that were skipped or transformed.

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

Persisted components migrate to valid runtime state without relying on in-memory layout stability.

Do not serialize raw Rust struct memory or assume field order is a stable file format.

## Trigger examples

- **Positive:** A code change or incident directly involves ECS component persistence migrations and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
