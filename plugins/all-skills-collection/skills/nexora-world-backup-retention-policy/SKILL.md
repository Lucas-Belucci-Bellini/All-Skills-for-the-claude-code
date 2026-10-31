---
name: nexora-world-backup-retention-policy
description: "Defines backup rotation that preserves recovery points without exhausting disk capacity."
---

# nexora world backup retention policy

## Purpose

Use this workflow for NEXORA-scale engine work when world backup retention and disk budgets. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define backup triggers and recovery objectives.
2. calculate expected size and disk headroom.
3. retain a minimum number or time window of verified generations.
4. validate each backup before rotation.
5. delete only after a newer valid recovery point exists.
6. handle low-disk conditions before writes.
7. test interrupted rotation.
8. expose retained generations and storage use.
9. document manual pinning and user override.

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

Backup rotation preserves the declared recovery window and never deletes the last verified usable copy.

Do not rotate by timestamp alone or delete the only verified backup to make room.

## Trigger examples

- **Positive:** A code change or incident directly involves world backup retention and disk budgets and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
