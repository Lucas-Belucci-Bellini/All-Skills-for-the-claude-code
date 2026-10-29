---
name: nexora-plugin-failure-containment
description: "Contains plugin initialization and runtime failures so one extension cannot leave the engine in a partially mutated state."
---

# nexora plugin failure containment

## Purpose

Use this workflow for NEXORA-scale engine work when plugin failure handling and lifecycle isolation. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define plugin lifecycle states and allowed transitions.
2. stage registrations before publication.
3. track resources owned by each plugin.
4. wrap fallible boundaries with typed diagnostics.
5. define timeout and cancellation behavior.
6. roll back staged registrations on initialization failure.
7. isolate or disable a failing plugin according to trust level.
8. test failures during startup and callbacks.
9. verify cleanup is idempotent.
10. report affected worlds and capabilities.

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

Plugin failures have bounded impact and do not leave partial registrations or leaked owned resources.

Do not claim crash isolation for native in-process plugins. Avoid catching panics and continuing when shared state may be corrupted.

## Trigger examples

- **Positive:** A code change or incident directly involves plugin failure handling and lifecycle isolation and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
