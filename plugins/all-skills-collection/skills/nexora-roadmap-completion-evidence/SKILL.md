---
name: nexora-roadmap-completion-evidence
description: "Prevents roadmap milestones from being marked complete based only on plans or skill catalog entries."
---

# nexora roadmap completion evidence

## Purpose

Use this workflow for NEXORA-scale engine work when engineering roadmap acceptance and milestone completion. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Translate milestone goals into observable acceptance criteria.
2. map each criterion to code, tests, and runtime evidence.
3. distinguish planned, prototyped, implemented, and verified status.
4. identify dependencies and remaining blockers.
5. run the relevant acceptance tests.
6. review evidence against target workloads.
7. record scope exclusions.
8. update roadmap status only after validation.
9. retain historical decision context.
10. assign follow-up owners.

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

Milestone status reflects verified implementation and explicitly records gaps.

A skill or design document is not proof that the corresponding engine feature is implemented.

## Trigger examples

- **Positive:** A code change or incident directly involves engineering roadmap acceptance and milestone completion and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
