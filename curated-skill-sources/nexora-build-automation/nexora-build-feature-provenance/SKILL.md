---
name: nexora-build-feature-provenance
description: "Records which features, dependencies, and compile-time options produced a runtime artifact."
---

# nexora build feature provenance

## Purpose

Use this workflow for NEXORA-scale engine work when engine build provenance and runtime diagnostics. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Collect source revision, target, compiler, enabled features, dependency lock hash, and relevant build flags.
2. exclude secrets and machine-specific paths.
3. serialize metadata deterministically.
4. embed or package it with the artifact.
5. verify metadata matches CI inputs.
6. expose a safe runtime diagnostics view.
7. test release and development builds.
8. document fields unavailable in reproducible builds.
9. archive the manifest with outputs.

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

An artifact can be traced to the exact declared build inputs without leaking private environment data.

Do not embed full environment variables or credentials. Mark missing metadata rather than guessing.

## Trigger examples

- **Positive:** A code change or incident directly involves engine build provenance and runtime diagnostics and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
