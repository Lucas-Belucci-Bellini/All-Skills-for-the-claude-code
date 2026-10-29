---
name: nexora-gameplay-tick-profiler
description: "Attributes simulation tick cost to systems and entities without materially perturbing runtime behavior."
---

# nexora gameplay tick profiler

## Purpose

Use this workflow for NEXORA-scale engine work when gameplay tick profiling and performance regressions. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define profiling scopes around tick phases and system boundaries.
2. collect low-overhead samples with stable IDs.
3. distinguish inclusive and exclusive time.
4. capture workload and build metadata.
5. aggregate percentiles.
6. sample entity detail selectively.
7. compare baseline and candidate builds.
8. verify profiler overhead.
9. produce reproducible hotspot reports.
10. turn stable findings into regression benchmarks.

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

The report identifies measured costs with workload and sampling context.

Do not use profiler timings as correctness proof or store unbounded per-entity traces in production.

## Trigger examples

- **Positive:** A code change or incident directly involves gameplay tick profiling and performance regressions and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
