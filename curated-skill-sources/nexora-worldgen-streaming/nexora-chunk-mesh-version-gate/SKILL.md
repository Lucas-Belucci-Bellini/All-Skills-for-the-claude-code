---
name: nexora-chunk-mesh-version-gate
description: "Prevents stale mesh jobs from publishing geometry after chunk edits or neighbor changes."
---

# nexora chunk mesh version gate

## Purpose

Use this workflow for NEXORA-scale engine work when chunk mesh jobs and stale result publication. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Assign chunk data and neighbor dependency versions.
2. capture versions when meshing starts.
3. validate all relevant versions before publishing.
4. discard or retry stale results.
5. avoid holding world locks during expensive meshing.
6. bound repeated invalidation retries.
7. test edits during worker execution.
8. instrument stale-result discard rate.
9. ensure GPU upload uses the same accepted version.

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

Only meshes built from current dependencies are published and stale work is bounded.

Do not publish stale geometry and hope the next job repairs it. Avoid infinite retry loops under continuously changing chunks.

## Trigger examples

- **Positive:** A code change or incident directly involves chunk mesh jobs and stale result publication and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
