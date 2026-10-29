---
name: nexora-migration-observability
description: "Makes long-running migrations observable without exposing private data or adding unsafe mutation paths."
---

# nexora migration observability

## Purpose

Use this workflow for NEXORA-scale engine work when large save and content migrations. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define migration phases and progress units.
2. expose counts and elapsed time without dumping records.
3. distinguish work completed from work durably committed.
4. report current generation and estimated remaining work where defensible.
5. bound update frequency.
6. persist checkpoints only at safe boundaries.
7. test cancellation and restart.
8. redact private identifiers.
9. provide phase-specific failure diagnostics.
10. verify telemetry does not affect migration ordering.

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

Progress reports match committed work and failures identify the phase without leaking sensitive content.

Do not report staged records as committed. Avoid estimates that imply precision unsupported by workload variability.

## Trigger examples

- **Positive:** A code change or incident directly involves large save and content migrations and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
