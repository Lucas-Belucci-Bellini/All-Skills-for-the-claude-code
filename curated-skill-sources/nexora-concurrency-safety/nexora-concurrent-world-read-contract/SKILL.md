---
name: nexora-concurrent-world-read-contract
description: "Defines consistent read semantics when multiple systems query world state while edits and streaming continue."
---

# nexora concurrent world read contract

## Purpose

Use this workflow for NEXORA-scale engine work when concurrent world reads and mutation. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Identify authoritative mutation boundaries.
2. choose snapshot, lock, or version-check semantics per query.
3. prevent mixed-version multi-chunk reads.
4. tag query results with world/chunk revisions.
5. bound lock duration and snapshot memory.
6. test concurrent edits and streaming.
7. validate retries after version mismatch.
8. measure contention and stale-read rates.
9. document whether eventual consistency is acceptable.

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

Each query returns a coherent documented view or reports that the view became stale.

Do not combine fields from different world revisions as if they were atomic. Avoid long-lived read locks across I/O.

## Trigger examples

- **Positive:** A code change or incident directly involves concurrent world reads and mutation and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
