---
name: nexora-editor-asset-preview-isolation
description: "Prevents editor previews from corrupting or pinning production asset resources."
---

# nexora editor asset preview isolation

## Purpose

Use this workflow for NEXORA-scale engine work when asset preview lifecycle and editor/runtime separation. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Separate preview resource ownership from runtime registry ownership.
2. build previews in disposable scopes.
3. cap preview memory and concurrent jobs.
4. cancel previews on context change.
5. release GPU resources after completion fences.
6. avoid writing preview outputs into production caches without validation.
7. test repeated preview open/close and failed imports.
8. monitor leaks and stale handles.
9. document preview-only transformations.

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

Preview resources are isolated and released without changing runtime asset state.

Do not let preview code mutate shared material or texture state. Retain GPU resources until in-flight preview draws complete.

## Trigger examples

- **Positive:** A code change or incident directly involves asset preview lifecycle and editor/runtime separation and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
