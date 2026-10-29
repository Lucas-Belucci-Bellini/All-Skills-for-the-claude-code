---
name: nexora-item-progression-reachability
description: "Checks that progression content remains reachable and does not contain accidental softlocks after mod or recipe changes."
---

# nexora item progression reachability

## Purpose

Use this workflow for NEXORA-scale engine work when item progression graph and softlock detection. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Model unlocks, recipes, resources, and gates as a dependency graph.
2. distinguish renewable and finite resources.
3. identify missing prerequisites and unreachable targets.
4. account for optional branches and mod overrides.
5. test representative starting conditions.
6. detect cycles that require unavailable resources.
7. produce a path explaining reachability.
8. compare against prior content versions.
9. review intentional gating with design owners.

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

Required progression targets have a valid documented path or an explicit intentional lock.

Do not assume every cycle is a softlock; model catalysts, renewable resources, and optional content correctly.

## Trigger examples

- **Positive:** A code change or incident directly involves item progression graph and softlock detection and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
