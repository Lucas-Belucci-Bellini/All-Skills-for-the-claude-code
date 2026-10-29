---
name: nexora-cross-target-compile-matrix
description: "Verifies supported engine crates and feature combinations compile for declared targets."
---

# nexora cross target compile matrix

## Purpose

Use this workflow for NEXORA-scale engine work when Rust engine cross-target build validation. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define supported target triples and minimum toolchains.
2. identify platform-specific modules and dependencies.
3. build workspace crates with declared feature sets.
4. test conditional compilation paths.
5. validate packaging metadata and native dependencies.
6. distinguish unsupported targets from regressions.
7. keep target matrix aligned with release policy.
8. capture exact compiler versions.
9. report missing platform coverage.

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

Every claimed target has reproducible build evidence and unsupported targets are explicit.

Do not claim runtime support from compilation alone. Report targets that cannot be tested in the available environment.

## Trigger examples

- **Positive:** A code change or incident directly involves Rust engine cross-target build validation and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
