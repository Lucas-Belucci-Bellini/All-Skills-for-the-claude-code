---
name: nexora-engine-readiness-review
description: "Runs a cross-subsystem readiness review before a major NEXORA milestone or tester build."
---

# nexora engine readiness review

## Purpose

Use this workflow for NEXORA-scale engine work when engine milestone readiness and pre-alpha review. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Inventory implemented subsystems and explicitly label missing or experimental ones.
2. map critical user workflows.
3. verify startup, save/load, shutdown, and crash recovery.
4. review resource budgets under representative workloads.
5. inspect mod/plugin trust boundaries.
6. verify platform support claims.
7. collect CI and benchmark evidence.
8. list blockers by severity and owner.
9. define go/no-go criteria and rollback.
10. publish a traceable readiness report.

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

Readiness claims are evidence-backed and unimplemented infrastructure is not represented as complete.

Do not infer implementation from roadmap documents or passing unit tests alone.

## Trigger examples

- **Positive:** A code change or incident directly involves engine milestone readiness and pre-alpha review and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
