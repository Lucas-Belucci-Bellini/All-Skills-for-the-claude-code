---
name: nexora-content-registry-migration
description: "Migrates item, block, entity, and recipe registries while preserving stable identifiers and cross-references."
---

# nexora content registry migration

## Purpose

Use this workflow for NEXORA-scale engine work when content registry schema migration. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Identify registry schema and stable identifiers.
2. build a migration mapping for renamed or split records.
3. detect ambiguous mappings and missing dependencies.
4. migrate into a candidate registry.
5. validate all cross-references and invariants.
6. preserve aliases where compatibility requires.
7. test old content packs and mixed mod versions.
8. publish only after validation.
9. emit a migration report with affected assets.

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

The migrated registry has valid references and stable identity behavior with explicit handling for unmappable records.

Do not guess mappings for ambiguous identifiers or publish partially migrated registries.

## Trigger examples

- **Positive:** A code change or incident directly involves content registry schema migration and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
