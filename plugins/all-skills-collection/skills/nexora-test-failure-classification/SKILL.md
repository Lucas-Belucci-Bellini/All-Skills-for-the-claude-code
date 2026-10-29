---
name: nexora-test-failure-classification
description: "Classifies engine test failures into product regression, infrastructure failure, flakiness, and invalid fixture."
---

# nexora test failure classification

## Purpose

Use this workflow for NEXORA-scale engine work when test failure triage and CI reliability. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Capture failure logs, environment, seed, and test history.
2. rerun only under a documented retry policy.
3. compare failures across machines and versions.
4. classify root cause with evidence.
5. preserve original failing artifacts.
6. quarantine flaky tests only with an owner and expiry.
7. track recurrence and fix deadlines.
8. avoid converting product failures into ignored status.
9. report unresolved ambiguity clearly.

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

Every failure has a reasoned classification and no test is silently ignored without ownership.

Retries do not prove a flaky test is safe. Keep quarantines time-bounded and visible.

## Trigger examples

- **Positive:** A code change or incident directly involves test failure triage and CI reliability and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
