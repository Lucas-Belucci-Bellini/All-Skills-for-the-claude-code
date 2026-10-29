---
name: nexora-engine-safe-mode-contract
description: "Starts the engine with optional subsystems disabled to diagnose crashes while preserving core data safety."
---

# nexora engine safe mode contract

## Purpose

Use this workflow for NEXORA-scale engine work when engine safe mode and optional subsystem isolation. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define core and optional subsystem groups.
2. select a minimal startup profile that preserves save integrity.
3. disable mods and caches through reversible configuration.
4. keep authentication and filesystem safety checks enabled.
5. record which features were skipped.
6. test safe-mode startup and world inspection.
7. prevent automatic save migration unless approved.
8. offer a normal-mode retry path.
9. document capability limits.

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

Safe mode improves diagnosability without weakening persistence or security guarantees.

Do not disable integrity checks to force startup. Avoid saving a world from safe mode if skipped subsystems could alter its semantics.

## Trigger examples

- **Positive:** A code change or incident directly involves engine safe mode and optional subsystem isolation and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
