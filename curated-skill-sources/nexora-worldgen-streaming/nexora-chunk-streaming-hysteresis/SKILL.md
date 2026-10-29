---
name: nexora-chunk-streaming-hysteresis
description: "Prevents chunks repeatedly loading and unloading when a player moves near streaming thresholds."
---

# nexora chunk streaming hysteresis

## Purpose

Use this workflow for NEXORA-scale engine work when chunk streaming radius and oscillation. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define separate load and unload thresholds.
2. use stable distance metrics and priority classes.
3. incorporate camera/player movement without allowing unbounded look-ahead.
4. cap in-flight transitions.
5. preserve hysteresis across short pauses.
6. test movement around threshold boundaries.
7. measure transition churn and memory peaks.
8. verify teleport behavior.
9. expose reasons for load/unload decisions.

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

Boundary movement does not cause repeated churn and memory stays within streaming budgets.

Do not use one threshold for both load and unload if it causes oscillation. Ensure hysteresis cannot retain chunks indefinitely.

## Trigger examples

- **Positive:** A code change or incident directly involves chunk streaming radius and oscillation and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
