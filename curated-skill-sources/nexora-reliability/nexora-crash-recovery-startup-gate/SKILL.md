---
name: nexora-crash-recovery-startup-gate
description: "Prevents repeated startup crashes by detecting and isolating the subsystem or save that failed previously."
---

# nexora crash recovery startup gate

## Purpose

Use this workflow for NEXORA-scale engine work when startup crash loops and safe mode. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Persist a minimal crash marker with build and phase metadata.
2. keep the marker bounded and privacy-reviewed.
3. detect repeated failures before expensive initialization.
4. offer a safe-mode path that skips optional mods or caches.
5. preserve user data and crash evidence.
6. clear the marker only after a defined successful-start threshold.
7. test crashes at each startup phase.
8. report skipped components.
9. document user-controlled recovery actions.

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

Repeated startup failures become diagnosable and safe mode does not silently destroy or migrate user data.

Do not disable core safety checks to force startup. Avoid automatic deletion of saves or mods based on one crash.

## Trigger examples

- **Positive:** A code change or incident directly involves startup crash loops and safe mode and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
