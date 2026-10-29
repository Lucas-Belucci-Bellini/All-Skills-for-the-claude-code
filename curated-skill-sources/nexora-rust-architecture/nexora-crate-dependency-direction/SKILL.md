---
name: nexora-crate-dependency-direction
description: "Prevents Rust crate cycles and unstable dependency direction as engine subsystems grow."
---

# nexora crate dependency direction

## Purpose

Use this workflow for NEXORA-scale engine work when Rust crate architecture and dependency cycles. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Map workspace crates and public interfaces.
2. classify foundational, platform, runtime, and feature-level dependencies.
3. define allowed dependency direction.
4. detect direct and transitive cycles.
5. separate shared types from implementation ownership.
6. validate feature-gated edges.
7. test minimal feature combinations.
8. document any intentional boundary exceptions.
9. add a CI check for new cycles.

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

The crate graph is acyclic or has explicitly justified exceptions and stable ownership boundaries.

Do not create catch-all common crates that couple unrelated subsystems. Avoid solving cycles by exposing private implementation details.

## Trigger examples

- **Positive:** A code change or incident directly involves Rust crate architecture and dependency cycles and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
