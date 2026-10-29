---
name: nexora-animation-clip-time-contract
description: "Defines animation clip duration, sampling boundaries, looping, and event timing consistently."
---

# nexora animation clip time contract

## Purpose

Use this workflow for NEXORA-scale engine work when animation sampling and clip timing. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define time units and duration semantics.
2. specify behavior at zero, exact duration, and negative time.
3. make looping and clamping explicit.
4. order events at wrap boundaries deterministically.
5. validate keyframe timestamps and monotonicity.
6. test interpolation at boundaries.
7. align CPU and GPU sampling conventions.
8. document retargeting interaction.
9. include clip-version metadata in caches.

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

Sampling and event dispatch agree at boundaries across supported evaluation paths.

Do not dispatch wrap-boundary events twice. Reject non-finite timestamps and define behavior for empty clips.

## Trigger examples

- **Positive:** A code change or incident directly involves animation sampling and clip timing and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
