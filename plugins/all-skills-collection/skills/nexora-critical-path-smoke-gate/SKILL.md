---
name: nexora-critical-path-smoke-gate
description: "Runs a compact smoke suite for the engine's most failure-sensitive runtime paths."
---

# nexora critical path smoke gate

## Purpose

Use this workflow for NEXORA-scale engine work when pre-merge and release smoke testing. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Select startup, world load, chunk activation, edit, save, reload, mod rejection, and shutdown scenarios.
2. use deterministic fixtures.
3. run against the exact candidate artifact.
4. assert state invariants and error handling.
5. capture bounded logs and timings.
6. include at least one failure-path scenario.
7. fail on data loss or unhandled corruption.
8. retain results with commit and build IDs.
9. document tests not available on the runner.

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

Critical user paths pass against the exact candidate and failures produce reproducible evidence.

Do not replace deeper integration tests with smoke tests. Never test destructive cases against real user saves.

## Trigger examples

- **Positive:** A code change or incident directly involves pre-merge and release smoke testing and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
