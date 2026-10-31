---
name: nexora-save-compatibility-fixture-policy
description: "Maintains a representative, privacy-safe suite of save fixtures across supported versions."
---

# nexora save compatibility fixture policy

## Purpose

Use this workflow for NEXORA-scale engine work when save compatibility regression fixtures. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Select fixtures covering schema versions and feature combinations.
2. remove private world/player data while preserving structural edge cases.
3. record origin, license, and expected migration.
4. verify checksums and fixture integrity.
5. define write permissions and ownership.
6. test each supported read/write path.
7. retire fixtures only with compatibility review.
8. keep sizes bounded.
9. document unsupported historical formats.

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

The fixture suite covers declared support and can be legally and safely used in CI.

Do not include user saves without permission. Do not delete old fixtures merely because they fail after a breaking change.

## Trigger examples

- **Positive:** A code change or incident directly involves save compatibility regression fixtures and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
