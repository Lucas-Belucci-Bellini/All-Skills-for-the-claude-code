---
name: nexora-gameplay-data-schema-validation
description: "Validates authored items, recipes, entities, and progression data before runtime registration."
---

# nexora gameplay data schema validation

## Purpose

Use this workflow for NEXORA-scale engine work when gameplay data packs and mod schema loading. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define schemas and semantic constraints.
2. validate IDs, numeric ranges, references, and dependencies.
3. check cross-record invariants and recipe cycles.
4. collect errors without committing invalid records.
5. publish a candidate registry only after full validation.
6. version schemas and compatibility.
7. test duplicates and malformed files.
8. identify source locations in diagnostics.
9. run the same validator in CI and runtime loading.

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

Invalid content is rejected before publication and diagnostics identify the exact record.

Shape validation alone is insufficient for cross-record semantics. Never partially register an invalid pack.

## Trigger examples

- **Positive:** A code change or incident directly involves gameplay data packs and mod schema loading and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
