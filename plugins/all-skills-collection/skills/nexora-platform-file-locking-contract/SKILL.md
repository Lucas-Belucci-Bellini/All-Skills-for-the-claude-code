---
name: nexora-platform-file-locking-contract
description: "Coordinates save and cache access when multiple processes or engine instances can open the same world."
---

# nexora platform file locking contract

## Purpose

Use this workflow for NEXORA-scale engine work when multi-process world access and file locking. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define whether concurrent opens are supported.
2. choose lock scope and ownership metadata.
3. handle stale lock recovery without deleting active locks.
4. validate process identity and lock age carefully.
5. define read-only fallback or explicit refusal.
6. test crash and duplicate-launch scenarios.
7. avoid holding locks during unrelated UI waits.
8. record lock acquisition failures.
9. document network filesystem limitations.

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

Concurrent access follows a documented policy and cannot silently corrupt shared world data.

Do not infer a stale lock from age alone. Never break an active writer's lock without proving ownership and liveness.

## Trigger examples

- **Positive:** A code change or incident directly involves multi-process world access and file locking and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
