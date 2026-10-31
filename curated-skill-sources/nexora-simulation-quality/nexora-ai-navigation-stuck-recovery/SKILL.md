---
name: nexora-ai-navigation-stuck-recovery
description: "Detects NPCs that cannot make progress and applies bounded recovery rather than endless replanning."
---

# nexora ai navigation stuck recovery

## Purpose

Use this workflow for NEXORA-scale engine work when NPC stuck detection and path recovery. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define progress metrics based on distance or navigation state.
2. distinguish blocked movement from intentional waiting.
3. set hysteresis and timeout thresholds.
4. limit replanning frequency.
5. try local recovery before expensive global path searches.
6. validate new paths against current topology.
7. test dynamic obstacles and crowded spaces.
8. track repeated failure counts.
9. provide a safe terminal state for impossible paths.

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

Stuck agents recover or enter a documented fallback state without unbounded replanning.

Do not interpret every stationary NPC as stuck. Avoid teleporting agents as a silent default recovery.

## Trigger examples

- **Positive:** A code change or incident directly involves NPC stuck detection and path recovery and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
