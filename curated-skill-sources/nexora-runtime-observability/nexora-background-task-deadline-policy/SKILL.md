---
name: nexora-background-task-deadline-policy
description: "Applies deadlines and cancellation to background tasks that can otherwise consume resources indefinitely."
---

# nexora background task deadline policy

## Purpose

Use this workflow for NEXORA-scale engine work when background task timeouts and cancellation. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Classify tasks by criticality and expected duration.
2. define deadline and cancellation propagation.
3. identify non-cancellable commit sections.
4. release reservations and temporary files on cancellation.
5. use bounded retries with backoff.
6. test slow I/O and stuck dependencies.
7. record timeout causes.
8. distinguish deadline expiry from task failure.
9. ensure shutdown honors task policy.

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

Tasks terminate, defer, or report deadline violations under an explicit policy and release owned resources.

Do not cancel required durable writes mid-commit without recovery semantics. Avoid retries that amplify overload.

## Trigger examples

- **Positive:** A code change or incident directly involves background task timeouts and cancellation and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
