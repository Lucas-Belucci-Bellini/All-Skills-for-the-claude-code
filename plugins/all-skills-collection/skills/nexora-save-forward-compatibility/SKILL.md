---
name: nexora-save-forward-compatibility
description: "Handles fields and records introduced by newer engine versions without destructive downgrade."
---

# nexora save forward compatibility

## Purpose

Use this workflow for NEXORA-scale engine work when save forward compatibility and unknown fields. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define behavior for unknown optional and required fields.
2. preserve opaque extension data where safe.
3. reject unsupported required semantics.
4. distinguish unknown schema from corruption.
5. test round-tripping newer fixtures through older readers.
6. prevent unknown data from being reinterpreted as defaults.
7. provide clear version diagnostics.
8. keep migration policy separate from parser tolerance.
9. document when read-only mode is possible.

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

Unsupported data is preserved or rejected explicitly and never silently destroyed.

Do not open a newer save in write mode if unknown fields would be lost. Distinguish forward compatibility from full semantic support.

## Trigger examples

- **Positive:** A code change or incident directly involves save forward compatibility and unknown fields and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
