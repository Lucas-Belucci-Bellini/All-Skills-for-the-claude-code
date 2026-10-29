---
name: nexora-platform-gpu-capability-profile
description: "Builds a validated GPU capability profile to select renderer paths without scattered vendor checks."
---

# nexora platform gpu capability profile

## Purpose

Use this workflow for NEXORA-scale engine work when GPU capability detection and renderer fallback. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Query supported formats, limits, synchronization, and optional features through the backend.
2. validate reported capabilities with safe probes where needed.
3. map capabilities to renderer tiers.
4. define fallback combinations and minimum requirements.
5. avoid vendor-name heuristics as the sole gate.
6. test missing features and driver failures.
7. record profile and backend version.
8. verify shader permutations match selected tier.
9. document known driver workarounds.

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

Renderer selection follows tested capabilities and unsupported paths are not entered accidentally.

Do not infer support from device model alone. Keep driver workarounds narrowly scoped and testable.

## Trigger examples

- **Positive:** A code change or incident directly involves GPU capability detection and renderer fallback and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
