---
name: nexora-ai-agent-tick-budget
description: "Budgets NPC and agent computation per simulation tick so AI load remains bounded in large worlds."
---

# nexora ai agent tick budget

## Purpose

Use this workflow for NEXORA-scale engine work when NPC AI scheduling and tick budgets. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Inventory agent types and define a representative high-density scenario.
2. Measure decision, perception, pathfinding, and script costs separately.
3. Define per-agent and global budgets with explicit priority classes.
4. Schedule bounded work across ticks without starving critical reactions.
5. Cache only data whose invalidation rules are explicit.
6. Provide deterministic fallback behavior when an agent misses its budget.
7. Instrument queue depth, deferred decisions, and worst-case tick cost.
8. Stress test dense crowds, combat, and mass chunk activation.
9. Compare tail latency and gameplay quality against the baseline.

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

AI work remains bounded and deferred work has predictable gameplay semantics.

Do not silently skip safety-critical or authoritative decisions; never use average CPU cost as the only budget signal.

## Trigger examples

- **Positive:** A code change or incident directly involves NPC AI scheduling and tick budgets and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
