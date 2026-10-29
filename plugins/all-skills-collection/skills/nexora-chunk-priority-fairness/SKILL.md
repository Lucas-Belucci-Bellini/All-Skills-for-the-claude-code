---
name: nexora-chunk-priority-fairness
description: "Ensures distant or lower-priority chunk requests eventually progress without starving urgent visible work."
---

# nexora chunk priority fairness

## Purpose

Use this workflow for NEXORA-scale engine work when chunk generation queue fairness. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define priority classes and aging policy.
2. separate latency-sensitive visible chunks from background work.
3. cap work reserved for any one player or region.
4. update priority when camera or player relevance changes.
5. prevent duplicate requests from consuming queue capacity.
6. test sustained movement and multiple players.
7. measure wait-time percentiles per class.
8. expose starvation diagnostics.
9. define cancellation and requeue behavior.

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

Urgent work stays responsive while lower-priority requests make bounded progress.

Do not rely solely on strict distance ordering under sustained load. Keep stale cancelled jobs from occupying fairness quotas.

## Trigger examples

- **Positive:** A code change or incident directly involves chunk generation queue fairness and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
