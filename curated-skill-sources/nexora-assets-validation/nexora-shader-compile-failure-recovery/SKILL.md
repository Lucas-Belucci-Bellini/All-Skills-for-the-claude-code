---
name: nexora-shader-compile-failure-recovery
description: "Handles shader compilation failures without leaving pipelines partially initialized or the renderer unusable."
---

# nexora shader compile failure recovery

## Purpose

Use this workflow for NEXORA-scale engine work when shader compilation errors and pipeline recovery. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Capture source, include hashes, compiler version, and feature defines.
2. bound compile concurrency and diagnostics.
3. compile candidate shaders outside active pipeline state.
4. validate reflection and target capabilities.
5. publish pipelines only after successful creation.
6. retain the last known-good pipeline where safe.
7. test syntax errors and device-limit failures.
8. report source-linked errors.
9. invalidate incompatible cache entries.

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

A failed shader build produces actionable diagnostics and does not replace a working pipeline with an invalid one.

Do not swallow compile errors into silent black materials. Never bind a pipeline with incompatible resource layouts.

## Trigger examples

- **Positive:** A code change or incident directly involves shader compilation errors and pipeline recovery and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
