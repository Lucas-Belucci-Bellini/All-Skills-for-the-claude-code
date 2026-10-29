---
name: nexora-rust-feature-flag-coherence
description: "Prevents invalid or contradictory Cargo feature combinations from compiling or silently changing behavior."
---

# nexora rust feature flag coherence

## Purpose

Use this workflow for NEXORA-scale engine work when Cargo feature flags and build matrix. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Inventory features and their dependencies.
2. define supported combinations and implications.
3. avoid accidental default-feature reliance.
4. add compile checks for minimum and maximal combinations.
5. ensure optional dependencies are truly optional.
6. test target-specific features.
7. document behavior differences between builds.
8. detect cfg branches with divergent invariants.
9. record build features in diagnostics.
10. keep CI matrix proportional to risk.

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

Supported feature combinations compile and preserve documented contracts; unsupported combinations fail clearly.

Do not use cfg flags to hide missing required initialization. Avoid feature combinations that silently change save or network formats.

## Trigger examples

- **Positive:** A code change or incident directly involves Cargo feature flags and build matrix and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
