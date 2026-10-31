---
name: nexora-ai-perception-query-budget
description: "Bounds perception and target-selection queries for large numbers of NPCs."
---

# nexora ai perception query budget

## Purpose

Use this workflow for NEXORA-scale engine work when NPC perception, sensing, and target selection. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. List sensors and the data each one needs.
2. Partition cheap broad-phase filtering from expensive narrow-phase checks.
3. Set query cadence by sensor type and gameplay importance.
4. Reuse spatial indices with explicit update/version semantics.
5. Bound candidate counts and define deterministic tie-breaking.
6. Prevent perception queries from accessing unloaded or unauthorized regions.
7. Add worst-case tests for dense crowds and many candidate targets.
8. Track query cost, candidate counts, and stale-sense age.
9. Verify that budget reductions do not break critical gameplay rules.

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

Perception cost is bounded and stale-sense behavior is visible and intentional.

Do not use an approximate broad phase as the final authority for collision or damage. Avoid unbounded per-NPC world scans.

## Trigger examples

- **Positive:** A code change or incident directly involves NPC perception, sensing, and target selection and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
