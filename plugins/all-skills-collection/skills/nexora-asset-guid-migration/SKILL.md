---
name: nexora-asset-guid-migration
description: "Preserves references when assets receive new stable identifiers or namespaces."
---

# nexora asset guid migration

## Purpose

Use this workflow for NEXORA-scale engine work when asset identifier migration and references. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Inventory identifiers and all referring assets.
2. create explicit old-to-new mapping.
3. detect collisions and ambiguous aliases.
4. migrate references in a candidate dependency graph.
5. preserve compatibility aliases for the declared window.
6. validate mod overrides and save references.
7. test mixed old/new packs.
8. publish mappings atomically.
9. provide a report for unresolved references.

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

All known references resolve after migration and ambiguous mappings fail safely.

Do not derive permanent IDs solely from mutable file paths. Avoid silently mapping two old IDs to one new asset.

## Trigger examples

- **Positive:** A code change or incident directly involves asset identifier migration and references and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
