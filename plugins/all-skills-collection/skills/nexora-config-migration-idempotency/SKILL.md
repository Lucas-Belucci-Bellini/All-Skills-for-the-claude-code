---
name: nexora-config-migration-idempotency
description: "Ensures configuration upgrades can be retried safely after interruption without duplicating or losing settings."
---

# nexora config migration idempotency

## Purpose

Use this workflow for NEXORA-scale engine work when configuration schema migration and retries. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Record source and target schema versions.
2. define deterministic transformations.
3. preserve unknown optional values when safe.
4. write migrated config to a temporary generation.
5. validate semantic constraints.
6. atomically publish only after successful validation.
7. test interruption and repeated execution.
8. redact secrets from reports.
9. preserve backup or rollback policy.
10. report unsupported versions.

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

Repeated migration attempts produce the same valid target configuration and never destroy the only source.

Do not migrate in place without a recovery plan. Avoid logging secret fields while reporting migration errors.

## Trigger examples

- **Positive:** A code change or incident directly involves configuration schema migration and retries and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
