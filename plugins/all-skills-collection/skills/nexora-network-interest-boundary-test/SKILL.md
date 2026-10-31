---
name: nexora-network-interest-boundary-test
description: "Verifies entity visibility and replication-interest boundaries at region and ownership edges."
---

# nexora network interest boundary test

## Purpose

Use this workflow for NEXORA-scale engine work when interest management and replication boundary bugs. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define expected visibility rules at exact boundaries.
2. generate cases around cell/region edges.
3. test fast movement and teleport transitions.
4. verify enter/leave events and full-state initialization.
5. check ownership and privacy filters independently.
6. compare server relevance decisions with client state.
7. test overlapping interest sources.
8. measure churn.
9. preserve boundary failures as regression fixtures.

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

Boundary transitions never leak hidden state or leave visible entities permanently stale.

Do not treat client-side culling as access control. Ensure teleport transitions cannot skip required initial state.

## Trigger examples

- **Positive:** A code change or incident directly involves interest management and replication boundary bugs and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
