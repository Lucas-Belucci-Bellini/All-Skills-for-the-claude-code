---
name: nexora-world-edit-conflict-resolution
description: "Resolves overlapping world edits from tools, mods, or multiplayer commands without hidden last-writer behavior."
---

# nexora world edit conflict resolution

## Purpose

Use this workflow for NEXORA-scale engine work when concurrent world edits and conflict policy. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Assign edit transaction IDs and capture source revisions.
2. define conflict policy by edit type.
3. validate revisions before commit.
4. detect overlapping voxel and derived-resource scopes.
5. order authoritative commands deterministically.
6. reject or rebase stale edits explicitly.
7. test simultaneous edits and retries.
8. preserve audit information for accepted/rejected changes.
9. verify undo semantics after conflicts.

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

Conflicts follow a documented deterministic policy and rejected edits do not partially mutate the world.

Do not let thread completion order decide the winner. Never rebase an edit without rechecking permissions and invariants.

## Trigger examples

- **Positive:** A code change or incident directly involves concurrent world edits and conflict policy and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
