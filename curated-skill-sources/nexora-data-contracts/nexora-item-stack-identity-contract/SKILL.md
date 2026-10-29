---
name: nexora-item-stack-identity-contract
description: "Defines stack merging and splitting rules without conflating items that carry distinct metadata or ownership."
---

# nexora item stack identity contract

## Purpose

Use this workflow for NEXORA-scale engine work when item stack merging and splitting. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define which item fields affect stack identity.
2. distinguish cosmetic metadata from gameplay-affecting state.
3. validate maximum stack sizes.
4. preserve provenance and durability during splits.
5. make merge operations deterministic.
6. test boundary counts and heterogeneous metadata.
7. version serialized stack identity rules.
8. ensure crafting and network replication use the same contract.
9. document invalid legacy stack recovery.

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

Stacks merge only when all identity-relevant fields match and counts remain within limits.

Do not merge items based only on display name or type ID when metadata changes behavior.

## Trigger examples

- **Positive:** A code change or incident directly involves item stack merging and splitting and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
