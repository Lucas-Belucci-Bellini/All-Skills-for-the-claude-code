---
name: nexora-entity-despawn-cascade
description: "Defines safe cleanup when entities own children, effects, inventory, tasks, or network identities."
---

# nexora entity despawn cascade

## Purpose

Use this workflow for NEXORA-scale engine work when entity despawn and owned-resource cleanup. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Enumerate ownership relationships separately from non-owning references.
2. Define cascade order and behavior for cycles or shared children.
3. Invalidate generation-bearing handles before reusing entity slots.
4. Cancel entity-owned tasks and detach event subscriptions.
5. Release renderer, audio, navigation, and network resources through their owners.
6. Make repeated despawn requests idempotent.
7. Test parent removal during iteration, save, and network replication.
8. Track leaked child entities and orphaned resources in debug runs.
9. Document which references become null, invalid, or redirected.

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

Despawning an entity leaves no owned live resources or stale handles and repeated requests are safe.

Do not cascade-delete shared assets or resources merely referenced by an entity. Avoid cleanup callbacks that recursively mutate the same storage without a policy.

## Trigger examples

- **Positive:** A code change or incident directly involves entity despawn and owned-resource cleanup and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
