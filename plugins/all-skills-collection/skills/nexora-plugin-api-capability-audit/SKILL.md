---
name: nexora-plugin-api-capability-audit
description: "Ensures plugin APIs expose only the capabilities required by each extension and lifecycle phase."
---

# nexora plugin api capability audit

## Purpose

Use this workflow for NEXORA-scale engine work when plugin API surface and least privilege. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Enumerate plugin-visible APIs and effects.
2. map each API to a capability and lifecycle phase.
3. remove ambient authority where feasible.
4. distinguish read-only snapshots from mutating handles.
5. validate capability on each operation.
6. test denied calls and capability revocation.
7. inspect unsafe/native escape hatches.
8. generate an API-to-capability report.
9. version breaking permission changes explicitly.

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

Plugin API permissions are least-privilege and enforcement is verified at operation boundaries.

Do not treat documentation or manifest claims as enforcement. Explicitly state when native plugins bypass the capability layer.

## Trigger examples

- **Positive:** A code change or incident directly involves plugin API surface and least privilege and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
