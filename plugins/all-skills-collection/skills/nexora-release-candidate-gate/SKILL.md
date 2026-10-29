---
name: nexora-release-candidate-gate
description: "Defines evidence required before an engine build is promoted from candidate to release."
---

# nexora release candidate gate

## Purpose

Use this workflow for NEXORA-scale engine work when engine release candidate validation. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Freeze source revision and build metadata.
2. verify required CI suites and known exceptions.
3. validate plugin and save compatibility fixtures.
4. run representative performance and memory benchmarks.
5. inspect crash and security regressions.
6. verify licenses and asset provenance.
7. test clean installation and upgrade paths.
8. define go/no-go thresholds.
9. archive artifacts and reports for the exact candidate.

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

Promotion is backed by traceable evidence and unresolved release blockers are explicit.

Do not treat a green unit-test suite as complete release evidence. Do not promote a candidate with unknown data-loss risks.

## Trigger examples

- **Positive:** A code change or incident directly involves engine release candidate validation and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
