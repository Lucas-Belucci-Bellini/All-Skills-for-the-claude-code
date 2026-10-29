---
name: nexora-cache-eviction-policy
description: "Defines bounded cache retention and eviction semantics for assets, meshes, navigation, and world data."
---

# nexora cache eviction policy

## Purpose

Use this workflow for NEXORA-scale engine work when engine cache growth and eviction behavior. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Inventory cache keys, size estimates, and dependency invalidation.
2. define hard capacity and soft pressure thresholds.
3. select eviction policy by recomputation cost and recency.
4. protect in-flight or pinned entries.
5. prevent cache thrashing with admission controls.
6. test rapid camera movement and repeated asset access.
7. measure hit rate and eviction churn.
8. expose eviction reasons.
9. verify correctness after eviction and reload.

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

Caches remain within budgets and eviction never invalidates live consumers or authoritative state.

Do not evict resources still referenced by CPU/GPU jobs. Cache misses must not change authoritative simulation results.

## Trigger examples

- **Positive:** A code change or incident directly involves engine cache growth and eviction behavior and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
