---
name: nexora-editor-docking-layout-migration
description: "Migrates editor layout settings across versions without losing user workspace state."
---

# nexora editor docking layout migration

## Purpose

Use this workflow for NEXORA-scale engine work when editor layout persistence and schema migration. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define versioned layout schema and stable panel identifiers.
2. validate dimensions and docking relationships.
3. migrate removed or renamed panels explicitly.
4. preserve unknown optional panel data when safe.
5. fall back to a usable default layout on invalid data.
6. write migration output transactionally.
7. test old fixtures and malformed settings.
8. avoid machine-specific absolute paths.
9. report recovery decisions.

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

Layout migration preserves valid workspace state or recovers to a documented default without crashing startup.

Do not deserialize untrusted layout data into unchecked dimensions. Avoid destructive migration without retaining the original file.

## Trigger examples

- **Positive:** A code change or incident directly involves editor layout persistence and schema migration and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
