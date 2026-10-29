---
name: nexora-navmesh-invalidation-contract
description: "Keeps NPC navigation queries correct when terrain, doors, voxel chunks, or modded obstacles change."
---

# nexora navmesh invalidation contract

## Purpose

Use this workflow for NEXORA-scale engine work when navigation graph invalidation and dynamic obstacles. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Identify the authoritative geometry and navigation data sources.
2. Define which edits invalidate local tiles, links, or whole regions.
3. Version navigation snapshots and tag queries with the version used.
4. Coalesce nearby invalidations to avoid rebuild storms.
5. Cancel or restart paths that reference obsolete topology.
6. Define fallback movement while navigation data is rebuilding.
7. Test edits at tile and chunk boundaries and during active movement.
8. Measure rebuild latency and query staleness under streaming load.
9. Expose diagnostics linking a failed path to the invalidated region.

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

Navigation never treats stale topology as current without an explicit bounded fallback.

Do not rebuild the entire world for a local edit unless measured correctness requires it. Avoid dereferencing freed chunk geometry.

## Trigger examples

- **Positive:** A code change or incident directly involves navigation graph invalidation and dynamic obstacles and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
