---
name: nexora-ai-navigation-intent-contract
description: "Separates high-level NPC intent from low-level navigation so replanning does not cause contradictory movement commands."
---

# nexora ai navigation intent contract

## Purpose

Use this workflow for NEXORA-scale engine work when NPC goal planning and navigation. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define goal identity and success conditions.
2. separate intent selection from path execution.
3. assign intent version numbers.
4. cancel stale paths when goals change.
5. define priority between combat, survival, and scripted goals.
6. rate-limit replanning.
7. test simultaneous goal events.
8. measure goal churn and path invalidation.
9. report why a goal was selected or abandoned.

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

NPCs execute one coherent active intent and stale navigation plans cannot override newer goals.

Do not let presentation or animation code silently replace authoritative intent. Avoid continuous replanning on insignificant score noise.

## Trigger examples

- **Positive:** A code change or incident directly involves NPC goal planning and navigation and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
