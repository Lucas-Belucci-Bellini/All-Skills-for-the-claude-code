---
name: nexora-network-entity-generation-guard
description: "Prevents stale network entity IDs from mutating a newly spawned entity after despawn and ID reuse."
---

# nexora network entity generation guard

## Purpose

Use this workflow for NEXORA-scale engine work when network entity handles and stale packet rejection. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define wire identity with generation or session epoch.
2. increment generation on reuse.
3. validate generation before applying updates.
4. handle unknown entities and out-of-order spawn/despawn messages.
5. bound tombstone retention.
6. test ID reuse and reconnect.
7. ensure snapshots rebuild identity mappings atomically.
8. log rejected stale updates.
9. document wire compatibility.

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

Stale packets cannot resolve to newly allocated entities after identifier reuse.

Do not use bare slot indices as durable network identity. Define generation wrap behavior and tombstone limits.

## Trigger examples

- **Positive:** A code change or incident directly involves network entity handles and stale packet rejection and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
