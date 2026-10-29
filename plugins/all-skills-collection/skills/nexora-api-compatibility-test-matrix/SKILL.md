---
name: nexora-api-compatibility-test-matrix
description: "Detects accidental breaking changes in public engine APIs and serialized contracts across supported feature combinations."
---

# nexora api compatibility test matrix

## Purpose

Use this workflow for NEXORA-scale engine work when engine API compatibility and feature matrices. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Identify public APIs, plugin-facing types, and serialized schemas.
2. define supported feature and platform combinations.
3. capture compile-time consumer fixtures.
4. compare API surface and semver expectations.
5. test old serialized fixtures against migration code.
6. distinguish intentional breaking changes.
7. verify defaults and optional features.
8. publish a concise compatibility report.
9. add a gate for future releases.

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

Public API and data compatibility changes are explicit, tested, and aligned with the release policy.

Do not infer compatibility from successful compilation of the main workspace alone.

## Trigger examples

- **Positive:** A code change or incident directly involves engine API compatibility and feature matrices and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
