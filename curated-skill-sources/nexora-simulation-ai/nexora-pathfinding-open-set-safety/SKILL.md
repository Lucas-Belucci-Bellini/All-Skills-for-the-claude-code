---
name: nexora-pathfinding-open-set-safety
description: "Prevents runaway memory and invalid ordering in A* or other graph-search open sets."
---

# nexora pathfinding open set safety

## Purpose

Use this workflow for NEXORA-scale engine work when pathfinding correctness and open-set growth. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define graph node identity and deterministic neighbor enumeration.
2. Use a priority queue ordering with a stable tie-breaker.
3. Validate cost values and reject NaN, infinity, or negative costs where unsupported.
4. Track best-known costs separately from stale queue entries.
5. Set node expansion and memory limits with explicit partial-result semantics.
6. Handle cancellation and topology version changes during search.
7. Test unreachable goals, cycles, zero-cost edges, and extreme graphs.
8. Compare returned paths against a simple reference solver on small graphs.
9. Record expansions, peak open-set size, and termination reason.

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

Search terminates within configured limits and returned paths satisfy graph/cost invariants.

Do not return a partial path as complete without a status flag. Never rely on floating-point heap ordering with NaN costs.

## Trigger examples

- **Positive:** A code change or incident directly involves pathfinding correctness and open-set growth and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
