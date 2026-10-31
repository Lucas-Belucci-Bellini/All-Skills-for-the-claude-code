---
name: nexora-frame-allocation-budget
description: "Defines a measurable allocation budget for rendering frames and simulation ticks."
---

# nexora frame allocation budget

## Purpose

Use this workflow for NEXORA-scale engine work when per-frame allocation budget and latency spikes. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Choose representative scenes and tick workloads.
2. measure allocations by phase in release-like builds.
3. identify transient versus retained allocation sources.
4. define a budget and acceptable warm-up exceptions.
5. eliminate avoidable hot-path allocation or bound it.
6. verify allocator behavior under concurrency.
7. test worst-case scenes and streaming bursts.
8. compare p95/p99 frame time.
9. publish baseline and regression threshold.

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

The target workload stays within an evidence-based allocation budget and violations identify the responsible phase.

Do not claim zero allocation unless instrumentation proves it. Separate startup and warm-up allocations from steady-state behavior.

## Trigger examples

- **Positive:** A code change or incident directly involves per-frame allocation budget and latency spikes and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
