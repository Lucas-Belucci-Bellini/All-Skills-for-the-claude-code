---
name: nexora-world-region-index-integrity
description: "Validates region indexes and offsets before reading or updating large world files."
---

# nexora world region index integrity

## Purpose

Use this workflow for NEXORA-scale engine work when region index corruption and offset safety. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define index format, offset width, and record length rules.
2. validate offsets against file bounds and non-overlap requirements.
3. use checked arithmetic for offset plus length.
4. verify index and payload checksums.
5. detect duplicate or unreachable entries.
6. build candidate indexes before publication.
7. test truncation and integer overflow fixtures.
8. provide a recovery scan only when framing permits.
9. report suspicious entries without mutating the source.

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

Every index entry points to a bounded valid record or is rejected with a precise diagnostic.

Never trust offsets from corrupted files. Do not repair indexes by guessing record boundaries.

## Trigger examples

- **Positive:** A code change or incident directly involves region index corruption and offset safety and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
