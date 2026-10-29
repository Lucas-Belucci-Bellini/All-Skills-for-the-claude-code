---
name: nexora-world-integrity-audit-report
description: "Produces a read-only audit of world records, references, chunk bounds, and persistence consistency."
---

# nexora world integrity audit report

## Purpose

Use this workflow for NEXORA-scale engine work when world save integrity audit and diagnostics. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Open the world through a read-only path.
2. validate headers, indexes, record bounds, checksums, and schema versions.
3. verify chunk coordinates and cross-record references.
4. distinguish warnings from fatal corruption.
5. avoid loading executable mod code during static inspection.
6. produce a structured report with locations and confidence.
7. cap report size.
8. test known-good and damaged fixtures.
9. leave source bytes unchanged.

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

The audit identifies structural problems without mutating the world and distinguishes proven corruption from uncertainty.

Do not automatically repair during audit. Keep user content and identifiers out of exported reports unless required.

## Trigger examples

- **Positive:** A code change or incident directly involves world save integrity audit and diagnostics and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
