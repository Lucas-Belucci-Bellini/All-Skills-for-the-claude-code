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

- **Positive:** A code change or incident directly involves nexora runtime budget regression and needs a reproducible validation plan.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The request is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The task is only documentation or content work with no runtime, reliability, or code behavior impact.
