---
name: nexora-animation-skeleton-version-contract
description: "Validates skeleton identity and hierarchy compatibility for imported and runtime animations."
---

# nexora animation skeleton version contract

## Purpose

Use this workflow for NEXORA-scale engine work when skeletal animation asset compatibility. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define stable bone identifiers and hierarchy constraints.
2. validate parent indices and cycles.
3. version skeleton metadata.
4. specify retargeting for renamed or optional bones.
5. validate bind poses and transform conventions.
6. test missing, extra, reordered, and duplicate bones.
7. reject invalid clips before runtime evaluation.
8. provide asset diagnostics.
9. preserve migration mappings.

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

Only compatible skeleton/clip pairs enter runtime evaluation, with explicit retargeting decisions.

Do not match bones by array position alone. Reject cyclic hierarchies and non-finite transforms.

## Trigger examples

- **Positive:** A code change or incident directly involves skeletal animation asset compatibility and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
