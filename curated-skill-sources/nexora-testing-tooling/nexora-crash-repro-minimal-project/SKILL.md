---
name: nexora-crash-repro-minimal-project
description: "Produces a minimal project or save that reproduces a crash without including unrelated private data."
---

# nexora crash repro minimal project

## Purpose

Use this workflow for NEXORA-scale engine work when engine crash triage and minimal reproduction. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Identify the crashing subsystem and last reliable state.
2. duplicate source data into a disposable workspace.
3. remove unrelated assets, mods, and entities incrementally.
4. preserve seed, version, and config inputs.
5. sanitize names, paths, and private content.
6. verify the reduced case still crashes repeatedly.
7. record exact steps and logs.
8. package only necessary artifacts.
9. convert the reproduction into a regression test after the fix.

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

A minimal, privacy-reviewed reproduction reliably triggers the same failure and is easy to run.

Never modify the user's only save during reduction. Do not include credentials, private world data, or third-party content without permission.

## Trigger examples

- **Positive:** A code change or incident directly involves engine crash triage and minimal reproduction and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
