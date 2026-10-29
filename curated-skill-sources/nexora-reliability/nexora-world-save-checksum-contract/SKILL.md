---
name: nexora-world-save-checksum-contract
description: "Detects accidental corruption in world saves and region records before corrupted state is loaded."
---

# nexora world save checksum contract

## Purpose

Use this workflow for NEXORA-scale engine work when world save integrity and checksum validation. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define record framing and checksum coverage.
2. select checksum strength based on accidental-corruption versus adversarial-tampering needs.
3. version the checksum field.
4. verify length bounds before reading payloads.
5. validate checksums before decoding.
6. report the exact region and record offset.
7. test bit flips and truncation.
8. preserve damaged source data for recovery.
9. benchmark validation cost on large saves.

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

Corrupt records are detected before state mutation and diagnostics locate the affected record.

A checksum is not authentication. Do not overwrite the only original file during repair.

## Trigger examples

- **Positive:** A code change or incident directly involves world save integrity and checksum validation and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
