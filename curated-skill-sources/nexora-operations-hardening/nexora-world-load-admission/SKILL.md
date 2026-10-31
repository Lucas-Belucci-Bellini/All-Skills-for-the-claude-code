---
name: nexora-world-load-admission
description: "Prevents loading a world whose resource requirements exceed the current runtime's safe capacity."
---

# nexora world load admission

## Purpose

Use this workflow for NEXORA-scale engine work when world load resource admission. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Read world metadata and estimate chunks, entities, assets, and schema requirements before full activation.
2. compare estimates with runtime budgets.
3. validate required engine and mod versions.
4. reserve memory and file resources.
5. define partial or read-only mode only where safe.
6. test oversized and malformed world metadata.
7. present a clear rejection reason.
8. release reservations on failure.
9. record the chosen admission profile.

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

World load either reserves enough capacity or fails before destructive partial initialization.

Do not trust size estimates from unvalidated metadata. Avoid silently loading only part of authoritative state.

## Trigger examples

- **Positive:** A code change or incident directly involves world load resource admission and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
