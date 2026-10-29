---
name: nexora-secure-update-manifest
description: "Verifies engine or mod update metadata before applying downloadable artifacts."
---

# nexora secure update manifest

## Purpose

Use this workflow for NEXORA-scale engine work when engine updater and mod update manifests. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define signed or authenticated manifest fields.
2. bind artifact hashes to version, platform, and channel.
3. validate signatures using a trusted key source.
4. reject rollback versions where policy requires.
5. download into a staging area.
6. verify size and hash before activation.
7. test corrupt, replayed, and downgraded manifests.
8. preserve the previous working version.
9. record provenance and verification results.

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

Only artifacts matching trusted manifest policy are activated and failures leave the previous version usable.

A hash supplied by the same untrusted source is not authenticity. Never activate an artifact before verification completes.

## Trigger examples

- **Positive:** A code change or incident directly involves engine updater and mod update manifests and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
