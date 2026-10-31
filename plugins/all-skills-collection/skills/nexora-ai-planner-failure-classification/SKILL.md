---
name: nexora-ai-planner-failure-classification
description: "Classifies AI planning failures into invalid input, timeout, unavailable service, stale state, and rejected action."
---

# nexora ai planner failure classification

## Purpose

Use this workflow for NEXORA-scale engine work when AI planner failures and NPC recovery. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define typed failure categories and retryability.
2. preserve causal context and correlation IDs.
3. distinguish planning failure from action rejection.
4. apply bounded retry/backoff.
5. choose fallback behavior by gameplay criticality.
6. prevent stale results from being applied.
7. test each failure class.
8. expose metrics without logging sensitive prompts.
9. document operator diagnostics.
10. review fallback behavior for fairness.

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

Each failure class has an explicit recovery policy and no retry loop can grow without bound.

Do not retry invalid input indefinitely. Avoid exposing private prompts or world data in diagnostics.

## Trigger examples

- **Positive:** A code change or incident directly involves AI planner failures and NPC recovery and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
