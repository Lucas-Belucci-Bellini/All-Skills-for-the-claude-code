---
name: nexora-streaming-report-outcome-classification
description: "Audits NEXORA StreamingReport semantics so quiet state, budget saturation, backend failure, and pending work are not conflated."
---

# NEXORA Streaming Report Outcome Classification

## Purpose

Use this workflow when a consumer treats a quiet streaming tick as success, when a system appears idle despite deferred work or backend errors, or when dashboards combine budget pressure and backend failure into one status.

This workflow classifies report semantics and consumer behavior. It does not change runtime helpers, define a retry policy, or replace bounded failure-detail retention.

## Evidence boundary

The audited NEXORA snapshot is `19486829d18bd864fea00cac0711f519a5c07a70`.

In `engine/streaming/src/budget.rs`:

- `StreamingReport::is_quiet()` checks only `activated == 0`, `evicted == 0`, `promoted == 0` and `demoted == 0`.
- `StreamingReport::is_saturated()` checks only `deferred > 0 || shed > 0`.
- `failed` counts backend refusals; `deferred` counts work refused by the current budget but retained for a later tick; `shed` counts resident targets evicted despite continuing interest because of memory/count pressure; `persisted` counts targets written before release.
- The helpers answer different questions. Quiet means no counted residency/tier transition occurred; it does not mean no error, no pending work, no saturation, or overall health.
- Saturated means budget pressure deferred or shed work; it does not mean the backend failed.

In `engine/streaming/src/system.rs`, `settle()` uses `is_quiet()` as a state-change stopping condition. The backend-failure test demonstrates a tick can report a failure while unrelated neighboring targets still load. Release can persist a dirty target and then fail to evict it, producing both persistence and failure counts without a completed eviction.

Re-open the current source and consumers before applying this workflow. Field definitions and helper semantics may change. The audited SHA is evidence, not a permanent API guarantee.

## Required inputs

- Exact NEXORA commit SHA, Rust toolchain and test command.
- `engine/streaming/src/budget.rs`, `system.rs`, and all consumers of `is_quiet()` and `is_saturated()`.
- A `StreamingReport` sample with all fields retained.
- Context for the caller: tick loop, UI status, telemetry, test settle helper, or shutdown condition.
- Whether the caller needs state convergence, backend health, budget health, or user-visible progress.

## Workflow

1. **Pin the implementation.** Record the NEXORA SHA, relevant source paths, toolchain and commands.
2. **Read the helpers literally.** List every field read by `is_quiet()` and `is_saturated()`. Do not infer semantics from helper names alone.
3. **Separate report dimensions.**
   - State transitions: activated, evicted, promoted and demoted.
   - Persistence: persisted.
   - Budget pressure: deferred and shed.
   - Backend refusals: failed.
   - End-of-tick snapshot: resident, tracked and bytes.
4. **Audit every consumer.** Search for `is_quiet()` and `is_saturated()`. Classify each call as a state-convergence check, health check, retry/termination condition, or presentation status.
5. **Test quiet with failure.** Cause a backend refusal before any successful state transition. Confirm that `failed > 0` can coexist with `is_quiet() == true` and `is_saturated() == false`.
6. **Test quiet with deferred work.** Configure a valid but tight activation budget. Confirm whether the tick can have `deferred > 0` while no transition occurs, making it both quiet and saturated.
7. **Test failure with partial progress.** Mix a failing target with successful neighbors. Confirm that `failed > 0` does not imply the entire tick made no progress.
8. **Test persistence followed by eviction failure.** Use a dirty target and a backend that accepts persistence but refuses eviction. Record `persisted`, `failed`, `evicted` and the resulting residency state separately.
9. **Define caller-specific decisions.** A state-settle loop may stop when no transitions occur, but a health indicator must inspect failures; a pending-work indicator must inspect deferred/shed and remaining desired work. Do not silently repurpose one helper for every decision.
10. **Report evidence.** Separate source inspection, tests executed, proposed tests and runtime observations.

## Validation checklist

- [ ] Exact fields read by each helper are recorded.
- [ ] Quiet is described as absence of the four counted state transitions, not success or health.
- [ ] Saturation is described as deferred or shed work, not backend failure.
- [ ] Backend failures are reported independently from budget saturation.
- [ ] Consumers of both helpers are enumerated and classified by purpose.
- [ ] Quiet plus failure is tested or explicitly represented in a report fixture.
- [ ] Quiet plus deferred work is tested or explicitly represented in a report fixture.
- [ ] Partial progress alongside backend failure is represented.
- [ ] Persistence followed by eviction failure is accounted for without treating persistence as completed eviction.
- [ ] UI/telemetry labels do not collapse state, health and budget pressure into one status.

## Validation matrix

| Scenario | Expected classification |
|---|---|
| No transitions, no failures, no deferred/shed work | Quiet; not saturated; no reported backend failure |
| Backend failure, no transitions | Quiet may be true; failed is non-zero; saturation may remain false |
| Activation deferred before any transition | Quiet may be true; saturated is true |
| One target fails while neighbors activate | Not quiet; failed is non-zero; progress and failure coexist |
| Memory/count pressure sheds an interested target | Saturated is true because shed is non-zero |
| Dirty target persists but eviction fails | Persisted and failed may both increase; eviction must not be counted as complete |
| Work remains desired but no current transition occurs | Quiet alone is insufficient to declare convergence |
| All transitions complete with no pending work | Quiet may indicate no more state changes for this pass; caller must still apply its own completion criteria |

Run focused budget/report tests first, then the streaming crate suite. Do not claim any test passed unless it was executed against the pinned checkout.

## Common failure modes

- Treating `is_quiet()` as a healthy/successful tick.
- Treating `is_saturated()` as a general error flag.
- Assuming `failed > 0` means no other target progressed.
- Assuming `deferred == 0` means the desired world state is complete.
- Treating `persisted > 0` as proof that eviction succeeded.
- Using a settle helper's stopping condition as a production health signal.
- Hiding separate report dimensions behind a single green/yellow/red status without preserving the underlying counters.
- Claiming a report helper means more than its implementation checks.

## Required output

Produce a short audit containing:

1. Pinned NEXORA SHA and relevant source/consumer paths.
2. Exact boolean expressions used by `is_quiet()` and `is_saturated()`.
3. A report-field classification table for state transitions, persistence, budget pressure, backend failures and end-state counters.
4. Consumer-by-consumer interpretation and any unsafe use as a health or completion signal.
5. Test scenarios, commands and observed results.
6. Any mismatch between UI/telemetry wording and actual report semantics.
7. Explicit limits: this workflow does not modify runtime helpers or establish runtime health.

## Boundaries and failure handling

Do not modify NEXORA runtime code as part of a skill-only task. If a consumer uses a state-change helper as a health or completion signal incorrectly, open a separate NEXORA issue with a concrete caller and acceptance tests. Do not change `is_quiet()` or `is_saturated()` semantics without a separate design decision and compatibility review.

## Trigger examples

- **Positive:** A streaming tick is reported as healthy because `is_quiet()` returned true even though the report contains backend failures.
- **Positive:** A world-loading loop appears idle while activations are deferred, and the caller must distinguish state quiescence from budget saturation.
- **Negative:** A request is only about how many error details are retained or how overflow is counted; use the failure-retention workflow.
- **Negative:** A request is about measuring physics substep overload or frame pacing rather than NEXORA streaming report semantics.
