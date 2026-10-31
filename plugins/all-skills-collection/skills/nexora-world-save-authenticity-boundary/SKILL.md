---
name: nexora-world-save-authenticity-boundary
description: "Separates accidental corruption detection from authenticity and tamper resistance for world data."
---

# nexora world save authenticity boundary

## Purpose

Use this workflow for NEXORA-scale engine work when world save integrity and trust assumptions. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Classify threats as accidental corruption, malicious modification, or unauthorized replacement.
2. choose checksums, MACs, or signatures only where the threat model warrants them.
3. define key ownership and rotation if authentication is used.
4. validate format and bounds before expensive processing.
5. preserve compatibility for legacy saves.
6. test tampering and corrupted data separately.
7. report trust status clearly.
8. document recovery limits.

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

The system states exactly what integrity checks prove and does not confuse checksums with authenticity.

Do not invent a secret embedded in the client as a strong authenticity guarantee. Preserve user data when authenticity cannot be established.

## Trigger examples

- **Positive:** A code change or incident directly involves world save integrity and trust assumptions and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
