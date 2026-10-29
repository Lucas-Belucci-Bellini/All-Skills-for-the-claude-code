---
name: nexora-live-inspector-snapshot-safety
description: "Reads live engine state for inspection without racing simulation mutations or blocking critical work."
---

# nexora live inspector snapshot safety

## Purpose

Use this workflow for NEXORA-scale engine work when live runtime inspector and concurrent state reads. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Identify the authoritative owner of each inspected subsystem.
2. publish immutable snapshots or use bounded read locks.
3. limit inspector query frequency and result size.
4. avoid invoking mutating callbacks during inspection.
5. version snapshots and indicate staleness.
6. test inspection during world streaming and save.
7. measure lock contention.
8. redact sensitive fields.
9. expose query duration and truncation status.

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

Inspection returns coherent bounded snapshots and does not stall authoritative simulation.

Do not expose unrestricted mutable references through debug APIs. Make stale data explicit instead of blocking indefinitely for freshness.

## Trigger examples

- **Positive:** A code change or incident directly involves live runtime inspector and concurrent state reads and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
