---
name: nexora-worldgen-seed-compatibility
description: "Preserves existing world generation when generator algorithms or seed derivation rules change."
---

# nexora worldgen seed compatibility

## Purpose

Use this workflow for NEXORA-scale engine work when worldgen algorithm upgrades and existing-world compatibility. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Record generator version and seed derivation rules in world metadata.
2. define whether upgrades affect only new chunks or require migration.
3. version random streams by stage.
4. test known seeds and boundary chunks.
5. compare generated hashes against stored fixtures.
6. document intentional terrain changes.
7. prevent mixed-version chunk seams or define transition policy.
8. provide migration or compatibility warnings.
9. validate mod generator version dependencies.

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

Existing worlds have explicit generation compatibility behavior and reproducible fixtures.

Do not silently change seed derivation for existing worlds. Avoid mixing incompatible generator versions without a seam policy.

## Trigger examples

- **Positive:** A code change or incident directly involves worldgen algorithm upgrades and existing-world compatibility and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
