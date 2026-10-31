---
name: nexora-release-artifact-reproducibility
description: "Makes engine releases traceable and repeatable across source revision, toolchain, and build configuration."
---

# nexora release artifact reproducibility

## Purpose

Use this workflow for NEXORA-scale engine work when release build reproducibility and artifact provenance. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Pin or record compiler and dependency versions.
2. record source revision and build flags.
3. normalize generated metadata that would make outputs nondeterministic.
4. capture target triple and feature selection.
5. build twice in clean environments.
6. compare hashes and investigate differences.
7. sign or attest artifacts through the actual release system.
8. include licenses and provenance manifests.
9. test release packaging from a clean checkout.

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

Artifacts can be traced to inputs and reproducibility differences are explained rather than ignored.

Do not claim reproducibility based only on successful compilation. Never include secrets or local absolute paths in published metadata.

## Trigger examples

- **Positive:** A code change or incident directly involves release build reproducibility and artifact provenance and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
