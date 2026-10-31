---
name: nexora-ai-tool-budget-contract
description: "Defines resource budgets and cancellation semantics for engine-integrated AI tools and NPC planning operations."
---

# nexora ai tool budget contract

## Purpose

Use this workflow for NEXORA-scale engine work when AI tools and engine task budgets. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Inventory AI operations and their cost profiles.
2. classify synchronous and asynchronous tool calls.
3. define per-call and global time, memory, and output budgets.
4. validate tool inputs and world ownership.
5. propagate cancellation and deadlines.
6. bound retries and parallelism.
7. test slow and malformed tool responses.
8. record sanitized tool outcome metrics.
9. define deterministic fallback behavior where gameplay authority requires it.

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

AI tool execution remains bounded and failures have explicit recovery semantics.

Do not let an AI tool bypass engine capability checks or run unbounded work on the simulation thread.

## Trigger examples

- **Positive:** A code change or incident directly involves AI tools and engine task budgets and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
