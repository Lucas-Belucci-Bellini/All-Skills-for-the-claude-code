---
name: nexora-dependency-license-release-gate
description: "Checks third-party dependency and asset license obligations before engine distribution."
---

# nexora dependency license release gate

## Purpose

Use this workflow for NEXORA-scale engine work when release licensing and dependency provenance. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Generate dependency and asset inventories from the release revision.
2. resolve licenses and attribution requirements.
3. identify unknown or conflicting terms.
4. verify notices are included in the package.
5. distinguish source license from asset license.
6. record upstream revisions.
7. fail the release gate for unresolved mandatory obligations.
8. archive the report.
9. document approved exceptions.
10. rerun after dependency changes.

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

The release package includes required notices and unresolved licensing risks are explicit.

Do not infer license terms from repository visibility or package metadata alone. Escalate ambiguous terms rather than guessing.

## Trigger examples

- **Positive:** A code change or incident directly involves release licensing and dependency provenance and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
