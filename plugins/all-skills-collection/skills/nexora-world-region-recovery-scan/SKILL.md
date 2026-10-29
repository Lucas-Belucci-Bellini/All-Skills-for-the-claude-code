---
name: nexora-world-region-recovery-scan
description: "Recovers readable records from damaged region storage only when record boundaries can be established safely."
---

# nexora world region recovery scan

## Purpose

Use this workflow for NEXORA-scale engine work when damaged world region and record recovery. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Preserve the original region file.
2. validate header and index separately.
3. scan only using verifiable framing and bounded record lengths.
4. verify checksums for recovered records.
5. distinguish recovered, rejected, and ambiguous records.
6. write output to a new generation.
7. validate the rebuilt index.
8. compare record counts and references.
9. test truncation and corruption fixtures.
10. produce a recovery manifest for user review.

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

Recovered data is traceable and the original remains available for further recovery.

Do not guess boundaries from arbitrary byte patterns or overwrite the original during recovery.

## Trigger examples

- **Positive:** A code change or incident directly involves damaged world region and record recovery and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
