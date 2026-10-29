---
name: nexora-dependency-upgrade-impact
description: "Evaluates engine dependency upgrades for API, performance, license, security, and runtime behavior changes."
---

# nexora dependency upgrade impact

## Purpose

Use this workflow for NEXORA-scale engine work when Rust dependency upgrade and compatibility review. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Pin the candidate version and inspect release notes.
2. identify affected APIs and transitive dependency changes.
3. review license and security advisories.
4. run compile, unit, integration, and performance tests.
5. compare relevant behavior fixtures.
6. test minimum supported toolchain.
7. inspect binary size and feature changes.
8. update lockfiles reproducibly.
9. document rollback and migration needs.

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

Dependency upgrades are justified by measured compatibility and risk evidence.

Do not upgrade many unrelated dependencies in one change without isolating failures. A clean compile does not prove behavior compatibility.

## Trigger examples

- **Positive:** A code change or incident directly involves Rust dependency upgrade and compatibility review and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
