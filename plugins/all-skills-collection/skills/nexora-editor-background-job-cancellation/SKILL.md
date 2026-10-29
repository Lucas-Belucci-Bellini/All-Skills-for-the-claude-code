---
name: nexora-editor-background-job-cancellation
description: "Cancels stale editor import, preview, and build jobs when selection or project context changes."
---

# nexora editor background job cancellation

## Purpose

Use this workflow for NEXORA-scale engine work when editor background jobs and stale previews. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Assign each request a generation or cancellation token.
2. propagate cancellation into expensive work.
3. validate the request generation before publishing results.
4. release temporary resources on cancellation.
5. bound concurrent preview jobs.
6. coalesce repeated requests.
7. test rapid selection changes and project close.
8. measure stale-result discard rates.
9. report non-cancellable operations clearly.

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

Only results for the current editor context are published and obsolete work releases resources.

Do not assume cancellation means work has already stopped. Prevent cancelled jobs from overwriting newer outputs.

## Trigger examples

- **Positive:** A code change or incident directly involves editor background jobs and stale previews and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
