---
name: nexora-mod-hot-reload-state-migration
description: "Reloads a mod while preserving compatible state and rejecting unsafe schema changes."
---

# nexora mod hot reload state migration

## Purpose

Use this workflow for NEXORA-scale engine work when mod hot reload and persisted extension state. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define which state is durable versus transient.
2. version extension state separately from runtime code.
3. stage new module and validate API compatibility.
4. migrate extension data into a candidate state.
5. rebind capabilities and subscriptions only after successful preparation.
6. switch generations at a safe tick boundary.
7. rollback to the old generation on failure.
8. test repeated reload and missing dependencies.
9. report fields that cannot be migrated.

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

Hot reload switches code and state atomically or retains the prior working generation.

Do not reuse stale callbacks or handles from the old generation. Never silently discard incompatible persistent state.

## Trigger examples

- **Positive:** A code change or incident directly involves mod hot reload and persisted extension state and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
