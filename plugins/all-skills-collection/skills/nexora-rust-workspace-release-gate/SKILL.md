---
name: nexora-rust-workspace-release-gate
description: "Coordinates workspace versioning, feature validation, and artifact checks before publishing engine crates."
---

# nexora rust workspace release gate

## Purpose

Use this workflow for NEXORA-scale engine work when Rust workspace release engineering. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Determine versioning policy for internal and public crates.
2. validate dependency version alignment.
3. build release targets with declared features.
4. run tests and API checks.
5. verify licenses and dependency provenance.
6. generate reproducible metadata and changelogs.
7. test packaging from a clean checkout.
8. ensure unpublished internal crates are not accidentally included.
9. prepare rollback and release notes.
10. record exact toolchain and commit.

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

Release artifacts are consistent with workspace policy and can be traced to a tested commit.

Do not publish partially validated workspace versions or assume local build caches prove clean reproducibility.

## Trigger examples

- **Positive:** A code change or incident directly involves Rust workspace release engineering and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
