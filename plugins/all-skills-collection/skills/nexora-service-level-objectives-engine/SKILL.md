---
name: nexora-service-level-objectives-engine
description: "Defines measurable reliability and performance objectives for engine workloads and release decisions."
---

# nexora service level objectives engine

## Purpose

Use this workflow for NEXORA-scale engine work when engine SLOs and release quality gates. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Choose user-visible indicators such as tick p99, load latency, crash rate, and save success.
2. define workload cohorts and measurement windows.
3. establish baseline and acceptable error budgets.
4. separate hard correctness gates from statistical performance targets.
5. instrument metrics with bounded labels.
6. define release-blocking thresholds and rollback triggers.
7. test metric validity.
8. publish trend reports.
9. revisit objectives when workload assumptions change.

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

Objectives are measurable, tied to representative workloads, and actionable in release decisions.

Do not define SLOs from a single machine or average-only metrics. Avoid metrics that expose private world or player identifiers.

## Trigger examples

- **Positive:** A code change or incident directly involves engine SLOs and release quality gates and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
