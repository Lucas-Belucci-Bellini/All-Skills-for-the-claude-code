---
name: nexora-runtime-invariant-monitor
description: "Checks critical engine invariants at runtime in development or diagnostic builds without unbounded overhead."
---

# nexora runtime invariant monitor

## Purpose

Use this workflow for NEXORA-scale engine work when runtime invariant checks and engine corruption diagnosis. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Choose invariants with clear detection and response policies.
2. place checks at ownership boundaries.
3. separate cheap always-on checks from expensive sampled audits.
4. include entity/chunk generation and resource lifecycle checks.
5. avoid mutation during observation.
6. test injected invariant violations.
7. rate-limit repeated reports.
8. provide actionable context.
9. define fatal versus recoverable cases.

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

Critical invariant violations are detected near their source and response behavior is explicit.

Do not continue after an invariant violation if authoritative state may be corrupted. Keep expensive checks bounded.

## Trigger examples

- **Positive:** A code change or incident directly involves runtime invariant checks and engine corruption diagnosis and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
