---
name: nexora-schema-deprecation-window
description: "Coordinates deprecation and removal of serialized fields and public data contracts."
---

# nexora schema deprecation window

## Purpose

Use this workflow for NEXORA-scale engine work when schema deprecation and backward compatibility. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Identify consumers and stored data using the field.
2. define deprecation warning period and removal criteria.
3. add dual-read or migration support if required.
4. instrument usage without collecting sensitive values.
5. update docs and schema validators.
6. test old and new fixtures.
7. communicate removal in release notes.
8. remove code only after support policy is met.
9. preserve rollback guidance.

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

Field removal is supported by evidence that migration and compatibility obligations are satisfied.

Do not remove fields still required by supported worlds or mods. Avoid deprecation warnings that flood logs every frame.

## Trigger examples

- **Positive:** A code change or incident directly involves schema deprecation and backward compatibility and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
