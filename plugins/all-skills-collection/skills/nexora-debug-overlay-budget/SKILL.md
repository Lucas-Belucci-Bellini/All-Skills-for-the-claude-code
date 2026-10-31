---
name: nexora-debug-overlay-budget
description: "Keeps debug overlays useful without dominating frame time or allocating unbounded transient geometry."
---

# nexora debug overlay budget

## Purpose

Use this workflow for NEXORA-scale engine work when debug overlays and runtime visualization. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Inventory overlay sources and update frequencies.
2. define per-overlay vertex and text budgets.
3. batch compatible primitives.
4. reuse transient buffers where safe.
5. sample high-cardinality labels.
6. avoid blocking render work on simulation locks.
7. test dense entity scenes and long-running sessions.
8. measure overlay CPU/GPU cost.
9. allow selective disablement.
10. document what is omitted under budget pressure.

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

Debug visualization cost and memory stay bounded with visible diagnostics when data is sampled or omitted.

Do not let debug overlays mutate authoritative state. Avoid production builds retaining unbounded diagnostic geometry.

## Trigger examples

- **Positive:** A code change or incident directly involves debug overlays and runtime visualization and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
