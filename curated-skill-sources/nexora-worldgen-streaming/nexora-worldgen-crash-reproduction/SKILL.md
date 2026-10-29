---
name: nexora-worldgen-crash-reproduction
description: "Produces a minimal deterministic world-generation case for crashes, hangs, or terrain corruption."
---

# nexora worldgen crash reproduction

## Purpose

Use this workflow for NEXORA-scale engine work when world generation bug reproduction. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Capture seed, generator version, mods, settings, and target coordinates.
2. identify the earliest failing stage.
3. regenerate only the required region in a disposable workspace.
4. reduce enabled features or modifiers while preserving failure.
5. save intermediate stage outputs where possible.
6. verify repeatability across runs.
7. minimize the fixture.
8. add a regression test and expected invariant.
9. record hardware/thread settings if relevant.

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

A minimal seed/region fixture reproduces the same failure and points to the responsible generation stage.

Do not edit the only world save during reduction. Mark failures that depend on nondeterministic scheduling as unresolved until captured reliably.

## Trigger examples

- **Positive:** A code change or incident directly involves world generation bug reproduction and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
