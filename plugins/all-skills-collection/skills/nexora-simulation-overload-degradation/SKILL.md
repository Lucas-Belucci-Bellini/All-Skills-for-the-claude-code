---
name: nexora-simulation-overload-degradation
description: "Defines safe behavior when simulation workload exceeds the available tick budget."
---

# nexora simulation overload degradation

## Purpose

Use this workflow for NEXORA-scale engine work when simulation overload and server tick lag. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Measure tick-time distribution and identify dominant subsystems.
2. define hard limits for optional work and quality degradation.
3. prioritize authoritative gameplay and persistence.
4. defer or reduce cosmetic work with explicit semantics.
5. prevent catch-up spirals and backlog growth.
6. expose tick debt and dropped optional work.
7. stress test NPCs, fluids, worldgen, and networking together.
8. verify recovery after load drops.
9. document user-visible effects and alert thresholds.

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

Overload remains bounded, authoritative state stays correct, and degraded work is observable.

Do not drop persistence or authoritative events to preserve FPS. Avoid silently changing simulation rules under load.

## Trigger examples

- **Positive:** A code change or incident directly involves simulation overload and server tick lag and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
