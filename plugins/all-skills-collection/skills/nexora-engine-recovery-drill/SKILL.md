---
name: nexora-engine-recovery-drill
description: "Exercises documented recovery paths for crashes, corrupted caches, device loss, and interrupted saves."
---

# nexora engine recovery drill

## Purpose

Use this workflow for NEXORA-scale engine work when engine recovery readiness and operational drills. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Select a recovery scenario and define success criteria.
2. run only in disposable environments.
3. inject failure at a controlled boundary.
4. preserve logs and original fixtures.
5. execute the documented recovery procedure.
6. verify world and runtime invariants afterward.
7. measure recovery time and data loss.
8. record steps that required undocumented intervention.
9. turn gaps into issues and regression tests.
10. repeat after remediation.

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

Recovery procedures work as written and reveal gaps before a real incident.

Never perform destructive fault injection on a user's only world or production data.

## Trigger examples

- **Positive:** A code change or incident directly involves engine recovery readiness and operational drills and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
