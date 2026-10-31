---
name: nexora-combat-hitbox-consistency
description: "Keeps visual animation hitboxes and authoritative collision volumes aligned within documented tolerances."
---

# nexora combat hitbox consistency

## Purpose

Use this workflow for NEXORA-scale engine work when combat hitboxes and animation synchronization. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define authoritative hitbox source and animation sampling time.
2. separate visual meshes from collision proxies.
3. specify interpolation and root-motion offsets.
4. validate hitbox transforms at tick boundaries.
5. test frame-rate changes and interrupted animations.
6. compare sampled poses against reference fixtures.
7. verify network replication uses the same tick.
8. measure collision/query cost.
9. document acceptable visual deviation.

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

Hit detection follows the authoritative tick and declared hitbox model without double-applying animation transforms.

Do not trust client-only hitboxes for authoritative damage. Avoid reading mutable render pose from simulation without a synchronization contract.

## Trigger examples

- **Positive:** A code change or incident directly involves combat hitboxes and animation synchronization and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
