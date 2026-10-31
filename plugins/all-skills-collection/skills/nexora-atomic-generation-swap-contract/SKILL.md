---
name: nexora-atomic-generation-swap-contract
description: "Provides a shared pattern for replacing renderer, asset, config, or registry generations without exposing mixed state."
---

# nexora atomic generation swap contract

## Purpose

Use this workflow for NEXORA-scale engine work when hot reload and atomic generation replacement. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define immutable generation contents and readiness conditions.
2. prepare candidate generation privately.
3. validate compatibility with active consumers.
4. publish one generation pointer or owner-controlled swap at a safe boundary.
5. retain prior generation until readers and GPU work finish.
6. rollback if preparation fails.
7. test concurrent readers and repeated swaps.
8. track active and retired generations.
9. bound retained memory.
10. document consumer pinning rules.

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

Consumers observe one complete generation and old generations retire only after all required consumers finish.

Do not mutate the active generation in place. Account for GPU completion and asynchronous readers, not only CPU references.

## Trigger examples

- **Positive:** A code change or incident directly involves hot reload and atomic generation replacement and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
