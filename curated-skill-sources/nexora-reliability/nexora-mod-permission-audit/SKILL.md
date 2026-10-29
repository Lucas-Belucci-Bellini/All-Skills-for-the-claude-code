---
name: nexora-mod-permission-audit
description: "Audits mod permissions and privileged engine operations against a default-deny capability policy."
---

# nexora mod permission audit

## Purpose

Use this workflow for NEXORA-scale engine work when mod permissions and privileged API review. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Enumerate privileged APIs and their owning services.
2. map each operation to a capability.
3. define default-deny behavior and grant scope.
4. validate permissions at the operation boundary.
5. review filesystem and network path restrictions.
6. test absent, forged, revoked, and expired grants.
7. inspect native-code escape paths.
8. log decisions without secrets.
9. produce a permission matrix for each mod.

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

Every privileged operation has a tested authorization decision and mod grants are reviewable.

Do not treat manifest declarations as enforcement by themselves. Native in-process code cannot be considered sandboxed without actual isolation.

## Trigger examples

- **Positive:** A code change or incident directly involves mod permissions and privileged API review and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
