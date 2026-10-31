---
name: nexora-save-recovery-generation-select
description: "Chooses the newest valid save generation without confusing incomplete writes with committed state."
---

# nexora save recovery generation select

## Purpose

Use this workflow for NEXORA-scale engine work when save recovery and multiple generations. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define generation IDs and commit markers.
2. enumerate candidate generations without mutating them.
3. validate version, size, checksum, and required metadata.
4. distinguish committed from temporary candidates.
5. choose the newest valid compatible generation deterministically.
6. quarantine invalid candidates.
7. preserve unsupported newer formats.
8. test interrupted writes and mixed generations.
9. emit a recovery decision report.

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

Recovery selects a fully validated committed generation and explains why alternatives were rejected.

Do not load an incomplete temporary generation simply because its timestamp is newer. Never downgrade unsupported data destructively.

## Trigger examples

- **Positive:** A code change or incident directly involves save recovery and multiple generations and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
