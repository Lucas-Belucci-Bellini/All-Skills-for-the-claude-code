---
name: nexora-world-format-support-matrix
description: "Tracks which engine versions can read, write, or migrate each world-save format."
---

# nexora world format support matrix

## Purpose

Use this workflow for NEXORA-scale engine work when world format compatibility and release planning. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Inventory format versions and reader/writer capabilities.
2. define read-only versus read-write support.
3. map migration paths and compatibility gaps.
4. maintain representative fixtures for each supported version.
5. test upgrade and downgrade boundaries.
6. identify mod-specific schema dependencies.
7. document end-of-support policy.
8. validate matrix entries against actual code.
9. publish actionable incompatibility diagnostics.

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

The matrix matches tested behavior and prevents unsupported destructive writes.

Do not mark a format supported solely because parsing begins successfully. Distinguish read compatibility from safe write compatibility.

## Trigger examples

- **Positive:** A code change or incident directly involves world format compatibility and release planning and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
