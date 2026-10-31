---
name: nexora-asset-import-dependency-graph
description: "Builds a correct dependency graph for imported assets so rebuilds follow actual content dependencies."
---

# nexora asset import dependency graph

## Purpose

Use this workflow for NEXORA-scale engine work when asset import graph and incremental rebuilds. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Inventory importers and declared dependencies.
2. normalize stable asset identifiers.
3. detect missing references and cycles.
4. separate source dependencies from generated outputs.
5. compute reverse dependency edges.
6. rebuild only affected downstream artifacts.
7. version importer and schema inputs.
8. test graph changes and deleted sources.
9. emit a dependency explanation for each rebuild.

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

Incremental rebuilds include every affected dependent and avoid rebuilding unrelated assets.

Do not infer dependencies only from filenames. Detect cycles before starting a partial build.

## Trigger examples

- **Positive:** A code change or incident directly involves asset import graph and incremental rebuilds and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
