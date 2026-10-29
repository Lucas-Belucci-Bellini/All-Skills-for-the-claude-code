---
name: nexora-world-state-hash-contract
description: "Defines stable state hashes for replay checks, save verification, and multiplayer desync diagnosis."
---

# nexora world state hash contract

## Purpose

Use this workflow for NEXORA-scale engine work when simulation state hashing and desynchronization diagnostics. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define authoritative fields and exclude transient state explicitly.
2. serialize values in canonical order and byte representation.
3. include schema/content version identifiers where interpretation changes.
4. avoid pointer values and nondeterministic container iteration.
5. partition hashes by subsystem or region.
6. test equivalent states built through different insertion orders.
7. compare hashes across replay and save/load.
8. report mismatching partitions without sensitive data.
9. version the diagnostic hash algorithm.

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

Equivalent authoritative state yields the same hash under the documented compatibility scope and mismatches are localizable.

Do not use diagnostic hashes as authenticity checks. Distinguish state comparison from cryptographic integrity verification.

## Trigger examples

- **Positive:** A code change or incident directly involves simulation state hashing and desynchronization diagnostics and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
