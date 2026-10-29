---
name: nexora-render-pass-state-contract
description: "Defines explicit read/write and lifetime contracts between rendering passes and shared GPU resources."
---

# nexora render pass state contract

## Purpose

Use this workflow for NEXORA-scale engine work when render pass ordering and shared resources. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Inventory passes and resource reads/writes.
2. declare attachment formats and subresource ranges.
3. define load/store and clear semantics.
4. validate producer-before-consumer ordering.
5. track transient resource lifetimes.
6. derive transitions from backend requirements.
7. test optional pass removal and resize.
8. generate a pass graph for diagnostics.
9. verify no resource is used after retirement.

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

Every pass declares its dependencies and invalid access patterns are detected before submission.

Do not rely on implicit global render state or broad barriers without understanding the dependency.

## Trigger examples

- **Positive:** A code change or incident directly involves render pass ordering and shared resources and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
