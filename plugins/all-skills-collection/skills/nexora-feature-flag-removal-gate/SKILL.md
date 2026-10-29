---
name: nexora-feature-flag-removal-gate
description: "Removes obsolete feature flags without breaking saved data, mod compatibility, or supported build profiles."
---

# nexora feature flag removal gate

## Purpose

Use this workflow for NEXORA-scale engine work when engine feature flag deprecation and removal. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Identify all uses, persisted effects, and downstream consumers.
2. define deprecation window and removal criteria.
3. test both enabled and disabled configurations.
4. migrate data or preserve compatibility where needed.
5. remove dead branches and dependencies.
6. update build matrices and documentation.
7. verify public APIs and mod contracts.
8. add tests for unsupported flag use.
9. record release notes.

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

Removed flags have no hidden runtime or data dependency and supported configurations remain tested.

Do not remove a flag based only on source search if generated code or external consumers may use it.

## Trigger examples

- **Positive:** A code change or incident directly involves engine feature flag deprecation and removal and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
