---
name: nexora-incident-timeline-correlation
description: "Correlates engine errors, job events, world revisions, and runtime metrics into a bounded incident timeline."
---

# nexora incident timeline correlation

## Purpose

Use this workflow for NEXORA-scale engine work when engine incident diagnosis and cross-subsystem correlation. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define correlation IDs and event timestamp domains.
2. collect subsystem state transitions and relevant counters.
3. record world/tick revisions where safe.
4. bound timeline size and sampling.
5. redact secrets and private content.
6. order events using monotonic sequence when clocks differ.
7. test high-volume incidents.
8. export a compact report.
9. link timeline entries to reproducible fixtures when available.

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

The timeline identifies causal ordering and relevant state without unbounded logs or sensitive payloads.

Do not infer causality from wall-clock timestamps alone. Avoid collecting full world snapshots by default.

## Trigger examples

- **Positive:** A code change or incident directly involves engine incident diagnosis and cross-subsystem correlation and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
