---
name: nexora-ai-planner-world-snapshot
description: "Gives AI planners coherent world snapshots without granting mutable access to authoritative simulation state."
---

# nexora ai planner world snapshot

## Purpose

Use this workflow for NEXORA-scale engine work when NPC planning and world-state queries. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define the planner's required world facts.
2. publish versioned immutable snapshots.
3. limit query scope and staleness.
4. separate observations from commands.
5. validate entity generations and loaded regions.
6. avoid exposing hidden multiplayer state.
7. test snapshot age and concurrent world edits.
8. measure copy/query cost.
9. define behavior when the snapshot is stale.
10. document which facts are authoritative.

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

Planning consumes coherent bounded snapshots and mutations still pass through authoritative commands.

Do not hand unrestricted mutable world references to AI code. Make stale observations explicit.

## Trigger examples

- **Positive:** A code change or incident directly involves NPC planning and world-state queries and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
