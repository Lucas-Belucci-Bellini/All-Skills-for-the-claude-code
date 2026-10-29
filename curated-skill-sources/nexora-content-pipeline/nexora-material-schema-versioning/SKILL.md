---
name: nexora-material-schema-versioning
description: "Keeps material parameters and shader bindings compatible across content and engine releases."
---

# nexora material schema versioning

## Purpose

Use this workflow for NEXORA-scale engine work when material schema and shader parameter compatibility. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define stable parameter IDs and types.
2. version material schemas.
3. validate required and optional parameters.
4. specify defaulting and migration behavior.
5. verify shader reflection against declared bindings.
6. reject incompatible layouts before GPU submission.
7. test renamed, removed, and type-changed fields.
8. preserve material provenance.
9. provide diagnostics tied to asset paths.

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

Material assets either migrate explicitly or fail with actionable compatibility errors.

Do not silently reinterpret parameter types or assume shader binding order is stable.

## Trigger examples

- **Positive:** A code change or incident directly involves material schema and shader parameter compatibility and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
