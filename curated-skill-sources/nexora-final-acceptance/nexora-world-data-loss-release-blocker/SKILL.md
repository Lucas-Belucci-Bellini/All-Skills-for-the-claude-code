---
name: nexora-world-data-loss-release-blocker
description: "Defines release-blocking criteria for any bug that can lose, duplicate, or silently corrupt world data."
---

# nexora world data loss release blocker

## Purpose

Use this workflow for NEXORA-scale engine work when world persistence defects and release decisions. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Classify affected save operations and failure modes.
2. reproduce on disposable fixtures.
3. determine whether original data remains recoverable.
4. test crash interruption and rollback.
5. assess frequency and affected versions.
6. define severity and release-blocking threshold.
7. require regression coverage.
8. verify migration and backup messaging.
9. record owner and remediation.
10. retest the exact release candidate.

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

Potential silent world-data loss is treated under an explicit severity policy with verified recovery evidence.

Do not downgrade a data-loss risk to a cosmetic issue because reproduction is difficult.

## Trigger examples

- **Positive:** A code change or incident directly involves world persistence defects and release decisions and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
