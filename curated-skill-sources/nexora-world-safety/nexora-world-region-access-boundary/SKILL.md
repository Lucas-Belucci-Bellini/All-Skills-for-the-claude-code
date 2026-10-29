---
name: nexora-world-region-access-boundary
description: "Prevents cross-region edits and reads from bypassing ownership, claim, or server access rules."
---

# nexora world region access boundary

## Purpose

Use this workflow for NEXORA-scale engine work when world region access control and boundary checks. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define canonical region ownership and access policy.
2. normalize coordinates before authorization.
3. check every region touched by a multi-block operation.
4. handle negative and boundary coordinates consistently.
5. validate neighboring derived-data updates.
6. test edits spanning protected/unprotected regions.
7. reject partial unauthorized transactions.
8. audit administrative overrides.
9. log minimal decision metadata.

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

Operations spanning multiple regions are authorized across their full affected scope before mutation.

Do not authorize only the command origin when its effects cross region boundaries.

## Trigger examples

- **Positive:** A code change or incident directly involves world region access control and boundary checks and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
