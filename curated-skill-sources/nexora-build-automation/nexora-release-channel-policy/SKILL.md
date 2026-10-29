---
name: nexora-release-channel-policy
description: "Defines promotion and compatibility rules for experimental, preview, and stable engine channels."
---

# nexora release channel policy

## Purpose

Use this workflow for NEXORA-scale engine work when engine release channels and update policy. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define channel semantics and support expectations.
2. specify version ordering and allowed promotion paths.
3. prevent stable users from receiving incompatible preview builds by default.
4. define save-format compatibility per channel.
5. test update selection and rollback.
6. document channel switching behavior.
7. record provenance for each artifact.
8. expose channel in diagnostics.
9. define deprecation and end-of-support policy.

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

Update selection follows explicit channel policy and avoids accidental incompatible downgrades.

Do not let channel names substitute for version and compatibility checks. Avoid silently switching channels during recovery.

## Trigger examples

- **Positive:** A code change or incident directly involves engine release channels and update policy and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
