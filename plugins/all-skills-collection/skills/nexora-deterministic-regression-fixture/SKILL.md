---
name: nexora-deterministic-regression-fixture
description: "Creates stable regression fixtures for bugs involving world state, simulation ticks, and content versions."
---

# nexora deterministic regression fixture

## Purpose

Use this workflow for NEXORA-scale engine work when deterministic engine regression tests. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Capture the smallest relevant input, seed, config, content hashes, and runtime version.
2. remove nondeterministic environment dependencies.
3. define expected state or output hashes.
4. ensure fixture data has valid provenance.
5. test the fixture against the unmodified baseline when possible.
6. document which contract the fixture protects.
7. keep fixture size bounded.
8. run it in local and CI test paths.
9. update only with an explained behavior change.

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

The fixture reproduces the bug or verifies a documented invariant without hidden external dependencies.

Do not update expected outputs merely to silence a failure. Separate intentional behavior changes from regressions.

## Trigger examples

- **Positive:** A code change or incident directly involves deterministic engine regression tests and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
