---
name: nexora-editor-command-validation
description: "Validates editor commands before mutation so invalid operations cannot partially modify a scene or world."
---

# nexora editor command validation

## Purpose

Use this workflow for NEXORA-scale engine work when editor tools and invalid edit commands. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define command preconditions and required resource versions.
2. validate permissions and target availability.
3. compute affected resource scope.
4. prepare reversible deltas.
5. apply mutation only after validation succeeds.
6. publish one undo record.
7. update dependent caches and dirty flags.
8. test conflicting edits and invalid targets.
9. report precise failure reasons.
10. verify no-op commands do not pollute history.

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

Invalid commands fail without mutation and successful commands produce one coherent history entry.

Do not mutate state while validating. Avoid swallowing conflicts that indicate stale editor state.

## Trigger examples

- **Positive:** A code change or incident directly involves editor tools and invalid edit commands and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
