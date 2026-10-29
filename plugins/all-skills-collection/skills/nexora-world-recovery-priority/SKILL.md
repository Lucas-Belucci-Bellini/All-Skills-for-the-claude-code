---
name: nexora-world-recovery-priority
description: "Prioritizes recovery of essential world state when a large world has partial corruption or missing optional assets."
---

# nexora world recovery priority

## Purpose

Use this workflow for NEXORA-scale engine work when world recovery and partial dependency failure. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Classify records as authoritative, required dependencies, and optional presentation content.
2. recover only records with valid framing and references.
3. load required dependencies before dependent state.
4. quarantine uncertain records.
5. preserve ownership and coordinates.
6. test missing mod assets and corrupt optional caches.
7. report partial recovery status.
8. prevent writes that would erase unrecovered records.
9. define user confirmation for partial world use.

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

Recovery preserves authoritative data where verifiable and clearly labels partial or read-only state.

Do not present a partially recovered world as fully healthy. Never discard quarantined records automatically.

## Trigger examples

- **Positive:** A code change or incident directly involves world recovery and partial dependency failure and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
