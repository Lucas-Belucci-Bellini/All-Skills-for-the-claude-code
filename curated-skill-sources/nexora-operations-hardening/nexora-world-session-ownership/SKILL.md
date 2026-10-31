---
name: nexora-world-session-ownership
description: "Ensures one authoritative owner controls mutations for a world session."
---

# nexora world session ownership

## Purpose

Use this workflow for NEXORA-scale engine work when world session ownership and duplicate server instances. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define ownership identity and lease semantics.
2. acquire ownership before allowing writes.
3. detect conflicting live owners.
4. handle stale leases with liveness evidence.
5. distinguish read-only inspection from mutation.
6. test duplicate launch and crash recovery.
7. make ownership renewal bounded.
8. log sanitized ownership transitions.
9. document network-filesystem limitations.

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

Only the authorized session mutates a world at a time and recovery does not steal active ownership.

Do not treat an old timestamp as proof that an owner is dead. Avoid split-brain writers.

## Trigger examples

- **Positive:** A code change or incident directly involves world session ownership and duplicate server instances and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
