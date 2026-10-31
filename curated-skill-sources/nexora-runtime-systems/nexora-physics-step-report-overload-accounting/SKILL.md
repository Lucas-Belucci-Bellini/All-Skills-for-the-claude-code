---
name: nexora-physics-step-report-overload-accounting
description: "Audits NEXORA physics catch-up reports, dropped-time accounting and workload telemetry without overstating executed simulation work."
---

# NEXORA Physics StepReport Overload Accounting

## Purpose

Use this workflow when diagnosing physics falling behind world time, interpreting `StepReport`, designing catch-up telemetry, or validating how the fixed-step cap reports executed and discarded simulation work.

This is narrower than `nexora-physics-fixed-step-stability`: it focuses on the truthfulness and reconciliation of report fields, counter semantics and lost-time observability at the boundary between `FixedStep` and `PhysicsWorld`.

## Evidence boundary

The audited NEXORA snapshot documents:

- `engine/physics/src/step.rs` accumulates integer-scaled world ticks, computes earned substeps, caps execution, reports full dropped substeps and clears the remaining accumulator when the cap is exceeded.
- `engine/physics/src/world.rs` exposes `StepReport { substeps, dropped_substeps, stats }`; `stats` merges work performed by executed substeps only, and `fell_behind()` is true when dropped substeps are nonzero.
- The existing world-level overload test checks eight executed substeps and eight simulated bodies, but does not assert the exact dropped count or reconcile every report field.
- `engine/physics/src/budget.rs` defines thresholds for one substep of a 1,000-awake-body workload. Its comments explicitly say the constants are data and do not read a clock.
- The fixed-step accumulator clears a fractional remainder when it drops whole substeps. `dropped_substeps` alone therefore does not reconstruct every unit of elapsed time discarded during overload.

Re-check the exact NEXORA commit and code before applying this workflow. These facts are not a promise that the implementation remains unchanged.

## Required inputs

- Exact NEXORA commit, Rust toolchain, target platform and build profile.
- Current `FixedStep`, `StepPlan`, `StepReport`, `StepStats` and physics budget definitions.
- The configured tick rate, steps per second, maximum substeps and elapsed-time source.
- Tests for exact-cap, over-cap, repeated-stall and zero-elapsed behavior.
- Any telemetry or benchmark consumer that reads report fields, with workload identity and units.
- A clear distinction between measured runtime data, derived arithmetic and proposed instrumentation.

## Workflow

1. **Trace the accounting path.** Follow elapsed `WorldDuration` through `FixedStep::accumulate`, `StepPlan`, `Stepper::advance` and `StepReport`. Record the units and integer conversions at each boundary.
2. **Reconcile earned work.** For a pinned configuration, calculate earned substeps from scaled elapsed ticks and the step cost. Separate the earned count from the number capped for execution.
3. **Reconcile executed work.** Verify that `StepReport.substeps` equals the number of substeps actually run and that `StepStats` aggregates only those executions.
4. **Reconcile dropped work.** Verify that `dropped_substeps` represents full substeps refused by the cap. Do not silently treat them as simulated work or as solver iterations.
5. **Inspect fractional remainder behavior.** Determine whether a remainder is retained after a normal call and whether it is cleared when whole substeps are dropped. State explicitly whether the report exposes that fractional loss.
6. **Check the overload signal.** Confirm that `fell_behind()` agrees with the dropped-step count and define how consumers handle a zero-substep call, a capped call and repeated overload.
7. **Define metric semantics.** Give every counter a unit, aggregation window, reset boundary, workload identity and source. Keep per-call counts separate from per-substep averages and frame-level totals.
8. **Separate budget domains.** Compare one-substep physics time only with the matching `CROWD_SUBSTEP` workload and machine evidence. Do not compare it directly with full-frame CPU time, GPU execution or presentation wait.
9. **Test exact boundaries.** Cover just below the cap, exactly at the cap, one step above it, a large stall, fractional elapsed remainder, repeated calls and a zero-elapsed follow-up.
10. **Test recovery semantics.** After overload, verify whether the next call starts without phantom accumulated debt and whether the reported state matches the documented policy.
11. **Audit downstream consumers.** Search logs, dashboards, profiling output and gameplay decisions for assumptions that dropped work ran, that all discarded time is represented by an integer count, or that a budget threshold is a live measurement.
12. **Report evidence honestly.** Separate source-derived arithmetic, tests present, tests actually executed, benchmark measurements, proposed telemetry and unresolved observability gaps.

## Validation checklist

- [ ] The report's executed substep count matches the loop iterations actually run.
- [ ] Dropped substeps are never included in simulated-body, contact, pair or solver-work totals.
- [ ] Exact-cap and over-cap cases assert both executed and dropped counts at the `StepPlan` and `StepReport` boundaries.
- [ ] Fractional accumulator remainder retention and clearing behavior are explicitly tested and documented.
- [ ] A zero-elapsed follow-up proves that discarded debt does not reappear as phantom steps.
- [ ] `fell_behind()` agrees with the dropped-substep count for all tested cases.
- [ ] Telemetry defines units, aggregation window, reset boundary and workload identity.
- [ ] Per-substep budget thresholds are not presented as measured whole-frame latency.
- [ ] CPU simulation, GPU execution, presentation wait and dropped world time remain separate metrics.
- [ ] Source and generated plugin copies are byte-identical and catalog counts reconcile.
- [ ] Test commands, skipped tests and benchmark provenance are recorded without inference.

## Required output

Return:

- The exact source revision and accounting path inspected.
- A reconciliation table for elapsed ticks, earned substeps, executed substeps, dropped substeps and retained/discarded remainder.
- The exact meaning and aggregation boundary of each `StepReport` and `StepStats` field.
- Any gap between dropped full-step count and total discarded elapsed time.
- The telemetry contract, including units, workload identity and reset semantics.
- Tests run with exact commands/results, plus skipped tests.
- Benchmark measurements with machine/build/workload provenance, or an explicit statement that no measurement was made.
- Remaining risks and whether the result is an audit, proposal, implementation or verified runtime behavior.

## Boundaries and failure handling

- Do not count dropped substeps as simulated physics work.
- Do not infer exact discarded world time from `dropped_substeps` alone when a fractional accumulator remainder may also have been cleared.
- Do not label the accumulator remainder as a persistent backlog after the over-cap path clears it.
- Do not interpret a static budget constant as a live timing measurement.
- Do not mix per-substep physics time with render-frame, GPU or presentation metrics.
- If consumers require exact discarded duration but the current report cannot provide it, document the information gap and evaluate an explicit contract separately; do not invent a value.
- This skill audits report and telemetry semantics. It does not change NEXORA runtime code or claim that tests/benchmarks were executed.

## Trigger examples

- **Positive:** A physics hitch reports eight executed substeps and dropped time, and the team needs to verify what the counters actually mean.
- **Positive:** Review whether `StepReport.stats` includes only work that ran and whether discarded fractional time is observable.
- **Positive:** Design telemetry that distinguishes physics substep cost from whole-frame CPU time and GPU presentation.
- **Negative:** The task only changes the fixed timestep algorithm without examining report or telemetry semantics.
- **Negative:** The issue concerns GPU frame pacing or render interpolation with no physics catch-up accounting.
