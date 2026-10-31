---
name: nexora-structured-diagnostic-event
description: "Defines structured diagnostic events that are actionable, bounded, and safe to retain."
---

# nexora structured diagnostic event

## Purpose

Use this workflow for NEXORA-scale engine work when engine diagnostics and structured event logging. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define stable event names and schema versions.
2. distinguish dimensions from free-form messages.
3. attach subsystem, tick, build, and correlation IDs where safe.
4. bound event size and rate.
5. redact sensitive fields before serialization.
6. define sampling for high-volume events.
7. test schema evolution and hostile strings.
8. ensure logging cannot block critical threads.
9. document retention and export policy.

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

Events are queryable, bounded, schema-versioned, and do not leak secrets or block critical work.

Do not put arbitrary entity IDs or paths into metric labels. Avoid synchronous disk writes on the render or audio thread.

## Trigger examples

- **Positive:** A code change or incident directly involves engine diagnostics and structured event logging and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
