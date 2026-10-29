---
name: nexora-world-migration-cross-mod-validation
description: "Validates that world migrations remain coherent when multiple mods own persisted content and references."
---

# nexora world migration cross mod validation

## Purpose

Use this workflow for NEXORA-scale engine work when world migration with multiple mods. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Inventory migration owners and dependency order.
2. identify cross-mod references and namespace collisions.
3. resolve required mod versions before migration.
4. stage all participating migrations under one transaction policy.
5. validate cross-registry references after each phase.
6. define rollback when one mod migration fails.
7. test mixed-version fixture worlds.
8. report missing owners and unresolved references.
9. archive the migration plan.

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

Cross-mod migrations either reach a validated coherent world state or fail with a recoverable report.

Do not run independent migrations in arbitrary order when they share references. Preserve original data when a mod is missing.

## Trigger examples

- **Positive:** A code change or incident directly involves world migration with multiple mods and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
