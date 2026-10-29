---
name: nexora-world-interaction-reachability
description: "Validates whether players and NPCs can interact with world objects under range, line-of-sight, and loaded-state rules."
---

# nexora world interaction reachability

## Purpose

Use this workflow for NEXORA-scale engine work when world interaction reachability and server validation. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define interaction origin and coordinate conventions.
2. specify range and line-of-sight rules.
3. validate target generation and loaded state at authority.
4. distinguish visual selection from accepted interaction.
5. handle occlusion and chunk boundaries.
6. test exact distance edges and moving targets.
7. prevent duplicate interaction commands.
8. record rejection reason codes.
9. ensure prediction reconciles cleanly.

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

Interactions are validated against the authoritative world state and boundary behavior is consistent.

Do not trust client raycasts or target IDs without validation. Avoid treating unloaded geometry as clear line of sight.

## Trigger examples

- **Positive:** A code change or incident directly involves world interaction reachability and server validation and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
