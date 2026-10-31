---
name: nexora-platform-runtime-smoke-matrix
description: "Validates core engine workflows on the actual supported operating-system and graphics/audio backends."
---

# nexora platform runtime smoke matrix

## Purpose

Use this workflow for NEXORA-scale engine work when cross-platform runtime smoke testing. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define supported OS, architecture, graphics, and audio combinations.
2. install release artifacts in clean environments.
3. run startup, world creation, save/load, streaming, and shutdown scenarios.
4. record driver/toolchain metadata.
5. distinguish infrastructure failures from product regressions.
6. verify data created on one platform can be read where promised.
7. retain minimal fixtures.
8. publish exact tested combinations.
9. flag unsupported combinations explicitly.

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

Every claimed platform combination has reproducible smoke evidence and known gaps are documented.

Do not claim cross-platform support from compilation alone or from a single developer machine.

## Trigger examples

- **Positive:** A code change or incident directly involves cross-platform runtime smoke testing and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
