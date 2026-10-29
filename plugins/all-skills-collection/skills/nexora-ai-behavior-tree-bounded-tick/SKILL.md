---
name: nexora-ai-behavior-tree-bounded-tick
description: "Ensures behavior-tree evaluation has bounded cost and explicit semantics when a tick budget expires."
---

# nexora ai behavior tree bounded tick

## Purpose

Use this workflow for NEXORA-scale engine work when behavior tree evaluation and NPC scaling. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Inventory node types and worst-case branching.
2. define evaluation budgets and resumability rules.
3. prevent recursive cycles in tree definitions.
4. separate pure condition checks from side effects.
5. preserve node state across budget deferral.
6. cancel obsolete branches on state changes.
7. test deep and cyclic trees.
8. measure evaluations per tick.
9. report budget exhaustion and deferred nodes.

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

Behavior-tree cost is bounded and deferral does not duplicate side effects or corrupt node state.

Do not restart a tree from the root on every budget overrun if that repeats side effects. Reject cycles or define bounded semantics.

## Trigger examples

- **Positive:** A code change or incident directly involves behavior tree evaluation and NPC scaling and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
