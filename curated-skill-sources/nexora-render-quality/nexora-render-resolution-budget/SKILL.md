---
name: nexora-render-resolution-budget
description: "Chooses render resolution and dynamic scaling based on measured GPU/CPU constraints without destabilizing frame pacing."
---

# nexora render resolution budget

## Purpose

Use this workflow for NEXORA-scale engine work when dynamic resolution and render budget. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Measure GPU and CPU frame times separately.
2. define target intervals and scale bounds.
3. filter noisy samples with hysteresis.
4. update resolution only at safe frame boundaries.
5. account for render-target memory and history invalidation.
6. preserve UI resolution separately.
7. test fast workload changes and low-end devices.
8. measure image-quality and latency trade-offs.
9. expose scaling decisions and confidence.

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

Resolution scaling responds to sustained measured pressure without oscillation or hidden quality regressions.

Do not use CPU submission time as a GPU timing substitute. Avoid oscillating scale from single-frame spikes.

## Trigger examples

- **Positive:** A code change or incident directly involves dynamic resolution and render budget and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
