---
name: nexora-mesh-lod-transition-contract
description: "Prevents visible popping and invalid resource references when mesh LOD levels change."
---

# nexora mesh lod transition contract

## Purpose

Use this workflow for NEXORA-scale engine work when mesh LOD selection and transition behavior. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define screen-space error or projected-size metric.
2. validate LOD hierarchy and material compatibility.
3. use hysteresis to avoid oscillation.
4. keep required collision geometry independent where necessary.
5. synchronize transition state with streaming and resource lifetime.
6. test rapid camera movement and teleports.
7. measure GPU memory and draw cost.
8. inspect silhouette and shadow continuity.
9. expose chosen LOD and reason.

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

LOD transitions meet visual and memory budgets without oscillation or stale resource use.

Do not use render LOD as authoritative collision data unless explicitly designed. Keep old resources alive until transition consumers finish.

## Trigger examples

- **Positive:** A code change or incident directly involves mesh LOD selection and transition behavior and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
