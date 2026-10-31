---
name: nexora-save-repair-plan-approval
description: "Requires explicit review before applying repairs that may discard or transform damaged world records."
---

# nexora save repair plan approval

## Purpose

Use this workflow for NEXORA-scale engine work when world save repair and data-loss risk. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Run a read-only integrity audit first.
2. classify repair candidates by confidence and affected records.
3. preserve a byte-for-byte original copy.
4. estimate recoverable and unrecoverable data.
5. generate a proposed repair manifest.
6. require explicit approval for destructive transformations.
7. apply repairs to a new generation.
8. validate the repaired world before switching.
9. archive the decision and report.

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

Repairs are reviewable, source-preserving, and validated before becoming active.

Do not auto-apply low-confidence repairs or overwrite the only original world.

## Trigger examples

- **Positive:** A code change or incident directly involves world save repair and data-loss risk and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
