---
name: nexora-streaming-failure-retention-accounting
description: "Audits bounded retention of NEXORA streaming backend failures, dropped-diagnostic accounting, draining semantics, and failure isolation."
---

# NEXORA Streaming Failure Retention and Accounting

## Purpose

Use this workflow when investigating repeated streaming-backend failures, missing diagnostic details, a growing failure buffer, unexpected failure counters, or the interaction between `take_failures()` and subsequent streaming ticks.

This is a diagnostic-retention contract. It is not a retry policy, a general job-queue health audit, a memory-ledger workflow, or a replacement for streaming backpressure.

## Evidence boundary

The audited NEXORA snapshot is `19486829d18bd864fea00cac0711f519a5c07a70`.

In `engine/streaming/src/system.rs`:

- `MAX_RETAINED_FAILURES` is 64.
- `StreamingSystem` stores diagnostic errors in `failures: Vec<Error>` and tracks overflow separately in `dropped_failures: u64`.
- A backend failure increments the current tick's `StreamingReport.failed` and is passed to `record_failure`.
- `retained_failures_are_bounded_and_the_overflow_is_counted` exercises a burst larger than the retention cap.
- `take_failures()` drains the retained error details; the dropped counter has a separate accessor and lifecycle.

Re-open the current source before applying this workflow. Constants, ordering, and counter reset behavior may change. The audited commit is evidence, not a permanent API guarantee.

## Inputs

- Exact NEXORA commit SHA and Rust toolchain.
- `engine/streaming/src/system.rs`, `budget.rs`, backend implementations, and streaming tests.
- The exact `StreamingReport`, retained error sample, and dropped-failure count for the reproduction.
- A deterministic workload describing target coordinates, observer interest, backend refusal pattern, tick count, and budget.
- Whether the consumer drains diagnostics once per tick, periodically, or only after an incident.

## Procedure

1. **Pin the implementation.** Record the NEXORA SHA, relevant source paths, toolchain, and test command. Do not combine observations from different revisions.
2. **Trace one failure.** Follow the backend error from the failing operation to the per-tick `failed` counter and the retention helper. Confirm that the tick continues processing independent targets where intended.
3. **Map the four quantities separately.**
   - Tick failures: failures observed during the current tick.
   - Retained details: error objects still available for inspection.
   - Dropped details: diagnostic entries omitted because the retention cap was reached.
   - Drained details: entries returned to the caller by the most recent drain.
   Never add these values together as if they were disjoint event totals.
4. **Establish retention order.** Read `record_failure` directly to determine whether overflow discards the oldest or newest detail. Verify the policy with distinguishable synthetic errors; do not infer it from vector length alone.
5. **Exercise the cap.** Generate fewer than, exactly, and more than the configured maximum number of backend failures. Assert the retained length never exceeds the cap and the overflow count matches the implementation's documented semantics.
6. **Exercise draining.** Drain an empty buffer, a partially filled buffer, and an over-cap buffer. Verify whether draining resets only retained details or also affects overflow accounting. Record the actual contract rather than assuming both are cleared together.
7. **Exercise multiple ticks.** Repeat failures across ticks with and without intervening drains. Check counter monotonicity, reset boundaries, and integer-overflow handling. If the counter uses saturating arithmetic, assert saturation rather than wraparound.
8. **Check failure isolation.** Mix failing and successful targets in one tick. Confirm that one backend refusal does not prevent unrelated work, and compare report totals with the deterministic input set.
9. **Review observability consumers.** Ensure logs and dashboards label tick counts, retained samples, and dropped diagnostics distinctly. A truncated sample is not a complete incident history.
10. **Report evidence.** Separate source inspection, tests executed, tests proposed, and runtime observations. Include the exact command and result for every executed test.

## Invariants

- Retained diagnostic details remain bounded by the configured cap.
- Every observed backend failure contributes to the per-tick failure count according to the report contract, even when its detail is not retained.
- Overflow accounting is not silently inferred from the number of retained errors.
- Draining diagnostic details does not retroactively change the report for a completed tick.
- Failure retention does not change backend retry behavior, residency decisions, or the streaming budget.
- A failed target must not be reported as successfully activated.
- A truncated diagnostic sample must be identified as incomplete.

## Validation matrix

| Scenario | Expected observation |
|---|---|
| No backend failures | Zero tick failures; empty retained details |
| Fewer failures than cap | All details retained; no overflow |
| Exactly cap failures | Retention reaches cap; no overflow |
| More failures than cap | Retention stays bounded; overflow is counted |
| Drain after burst | Returned detail count matches retained sample; counter behavior matches source contract |
| Consecutive failing ticks | Per-tick report remains scoped; cumulative diagnostic counter follows documented reset/saturation rules |
| Mixed success and failure | Independent successful targets still progress |
| Distinguishable failure messages | Retention ordering is proven, not guessed |
| Counter boundary test | No wrapping arithmetic or silent loss of overflow evidence |

Use focused unit tests first, then the streaming crate test suite. Run broader workspace tests only when dependencies and time permit. Do not claim any test passed unless it was executed against the pinned checkout.

## Common failure modes

- Treating the retained error vector as the total number of failures.
- Assuming `take_failures()` resets the dropped counter.
- Assuming overflow always drops the oldest item without reading the helper.
- Comparing a per-tick report with a cumulative counter.
- Treating a sampled error list as a complete incident timeline.
- Increasing the cap to hide repeated backend failures instead of fixing their cause.
- Adding retries in the retention path and accidentally changing streaming determinism.
- Reporting test coverage from source presence without running the tests.

## Outputs

Produce a short audit containing:

1. Pinned NEXORA SHA and relevant implementation paths.
2. Retention cap and exact overflow policy.
3. A table distinguishing tick failures, retained details, dropped details, and drained details.
4. Test scenarios, commands, and observed results.
5. Any uncovered reset, overflow, ordering, or failure-isolation gap.
6. Explicit limits: this workflow does not implement runtime fixes or establish performance gains.

## Boundaries

Do not modify NEXORA runtime code as part of a skill-only task. If a runtime defect is found, open a separate NEXORA issue with a minimal reproduction and acceptance tests. Do not claim that a new skill fixes the engine.
