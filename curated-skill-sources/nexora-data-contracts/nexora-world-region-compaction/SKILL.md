---
name: nexora-world-region-compaction
description: "Compacts append-only or fragmented region storage without losing recoverable records."
---

# nexora world region compaction

## Purpose

Use this workflow for NEXORA-scale engine work when world region compaction and save space reclamation. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Measure fragmentation and define compaction triggers.
2. select a consistent snapshot of live records.
3. copy records into a new region generation.
4. verify checksums and references.
5. atomically publish the new index and generation.
6. preserve the old generation until commit is confirmed.
7. handle concurrent edits with revision checks.
8. test interruption at every phase.
9. measure I/O and temporary disk requirements.

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

Compaction reduces fragmentation while retaining every committed live record and a recoverable prior generation.

Do not compact in place without a crash-safe protocol. Reserve enough temporary disk space before beginning.

## Trigger examples

- **Positive:** A code change or incident directly involves world region compaction and save space reclamation and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
