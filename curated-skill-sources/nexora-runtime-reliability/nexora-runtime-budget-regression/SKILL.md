---
name: nexora-runtime-budget-regression
description: "Detects performance regressions against explicit CPU, memory, frame-time, and workload budgets in large Rust runtimes."
---

# nexora runtime budget regression

## Purpose

Use this workflow for NEXORA-scale engine work when runtime budgets and benchmark regression. Treat current repository behavior as the source of truth and mark missing architecture or constraints as unknown rather than inventing them.

## Required inputs

- The relevant source files, owning crates/modules, and current change or incident.
- Acceptance criteria, supported platforms, compatibility constraints, and known resource limits.
- Existing tests, logs, fixtures, and a minimal reproduction when available.
- Explicit assumptions and unresolved questions; do not infer unverified NEXORA implementation details.

## Workflow

1. Define representative workloads and machine/runtime conditions.
2. separate hard safety ceilings from noisy performance targets.
3. capture baseline median and tail latency plus peak memory.
4. benchmark release builds with warm-up and repeated samples.
5. compare confidence intervals or robust percentage deltas rather than single runs.
6. identify the changed subsystem before tuning.
7. add a reproducible regression fixture.
8. record hardware, compiler, flags, seed, and dataset.
9. fail CI only on stable thresholds and publish noisy measurements for review.

## Validation checklist

- [ ] The change is tied to a measurable requirement or a reproducible failure.
- [ ] Ownership, lifecycle, compatibility, and failure behavior are documented.
- [ ] Tests cover normal, boundary, repeated, and failure-path behavior.
- [ ] No hidden assumptions about unverified NEXORA subsystems remain.
- [ ] Focused tests, formatting, and applicable lint/static checks were run; skipped checks are listed.
- [ ] Performance or reliability claims include reproducible evidence where relevant.

## Required output

- A concise decision and scope statement.
- The invariants and implementation plan or reviewed diff.
- Tests run, results, and reproducible evidence.
- Risks, compatibility implications, and unresolved follow-up items.

## Boundaries and failure handling

Benchmarks are comparable, thresholds are justified, and regressions have reproducible evidence.

Do not invent target hardware or hide variance. If runner noise dominates, mark the result inconclusive and move enforcement to a stable runner.

## Trigger examples

- "Audit runtime budgets and benchmark regression in NEXORA before merging this change."
- "Create a regression test and recovery plan for this engine subsystem."
- "Review the current implementation without assuming missing infrastructure exists."
