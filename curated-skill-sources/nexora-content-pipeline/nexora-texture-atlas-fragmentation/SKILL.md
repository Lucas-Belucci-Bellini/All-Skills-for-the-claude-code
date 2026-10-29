---
name: nexora-texture-atlas-fragmentation
description: "Controls atlas packing and fragmentation as textures are added, removed, or hot-reloaded."
---

# nexora texture atlas fragmentation

## Purpose

Use this workflow for NEXORA-scale engine work when texture atlas packing and fragmentation. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Measure atlas occupancy and wasted area.
2. classify assets by sampling, format, and update frequency.
3. define stable placement versus repack policy.
4. bound atlas dimensions and per-atlas memory.
5. update UV mappings atomically.
6. retain old atlas generations until consumers switch.
7. test add/remove/hot reload bursts.
8. compare fragmentation and upload costs.
9. expose packing diagnostics.

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

Atlas memory and fragmentation remain bounded and UV consumers never observe mixed generations.

Do not move atlas entries without updating all dependent UV data atomically. Avoid repacking every frame.

## Trigger examples

- **Positive:** A code change or incident directly involves texture atlas packing and fragmentation and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
