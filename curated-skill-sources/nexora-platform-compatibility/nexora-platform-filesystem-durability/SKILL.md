---
name: nexora-platform-filesystem-durability
description: "Documents and tests filesystem durability guarantees for world saves across supported operating systems."
---

# nexora platform filesystem durability

## Purpose

Use this workflow for NEXORA-scale engine work when cross-platform filesystem durability. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Inventory supported filesystems and OS targets.
2. define temp-file, flush, rename, and directory-sync behavior.
3. distinguish atomicity from durability.
4. use same-volume replacement where supported.
5. test interruption around commit points.
6. document platform-specific guarantees.
7. detect unsupported operations and surface degraded guarantees.
8. keep a recovery generation.
9. run integration tests on actual target platforms.

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

Save durability claims match tested platform behavior and recovery paths are explicit.

Do not promise identical durability across filesystems. Preserve old data when a durability primitive is unavailable.

## Trigger examples

- **Positive:** A code change or incident directly involves cross-platform filesystem durability and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
