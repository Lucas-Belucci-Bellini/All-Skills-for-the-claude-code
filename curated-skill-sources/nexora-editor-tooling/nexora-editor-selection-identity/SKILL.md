---
name: nexora-editor-selection-identity
description: "Keeps editor selections stable when entities, assets, or chunk resources are reloaded or recreated."
---

# nexora editor selection identity

## Purpose

Use this workflow for NEXORA-scale engine work when editor selection and resource identity. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define stable selection identity separately from transient pointers.
2. validate generation and world ownership before use.
3. handle deleted or unloaded targets.
4. reconcile selection after undo/redo.
5. define multi-selection ordering.
6. prevent selection from retaining strong ownership of expensive resources.
7. test rapid delete/reload and scene changes.
8. expose invalid-selection diagnostics.
9. ensure UI updates occur on the proper thread.

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

Selections never resolve to a different resource after ID reuse and stale entries are cleared predictably.

Do not store raw pointers as durable editor selection. Avoid silently redirecting selection to a reused entity slot.

## Trigger examples

- **Positive:** A code change or incident directly involves editor selection and resource identity and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
