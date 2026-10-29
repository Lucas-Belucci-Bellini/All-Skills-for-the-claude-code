---
name: nexora-gameplay-regression-scenario-catalog
description: "Maintains a curated catalog of reproducible gameplay scenarios that cover critical engine behaviors."
---

# nexora gameplay regression scenario catalog

## Purpose

Use this workflow for NEXORA-scale engine work when gameplay regression suite maintenance. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Group scenarios by subsystem and user-visible risk.
2. assign stable IDs and ownership.
3. record seed, world fixture, mod set, and expected invariants.
4. keep each scenario bounded in duration and resources.
5. include success and failure paths.
6. detect duplicate or obsolete coverage.
7. run smoke subsets on every change and full suites at release gates.
8. review fixture provenance.
9. publish a coverage map.

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

Critical gameplay paths have traceable, reproducible scenarios with clear owners and expected outcomes.

Do not equate scenario count with coverage quality. Retire fixtures only after confirming equivalent or better coverage.

## Trigger examples

- **Positive:** A code change or incident directly involves gameplay regression suite maintenance and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
