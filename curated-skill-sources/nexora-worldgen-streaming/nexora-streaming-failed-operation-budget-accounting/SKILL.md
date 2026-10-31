---
name: nexora-streaming-failed-operation-budget-accounting
description: "Audits whether failed NEXORA streaming backend operations consume per-tick activation and eviction quotas, and how that affects deferred work."
---

# NEXORA Streaming Failed-Operation Budget Accounting

## Purpose

Use this workflow when backend failures appear to reduce streaming throughput, when later targets are deferred after an earlier refusal, or when a budget dashboard needs to distinguish attempted operations from successful state changes.

The workflow describes current quota accounting. It does not decide whether failed attempts should receive a quota refund and does not modify the NEXORA runtime.

## Evidence boundary

Audited snapshot: `19486829d18bd864fea00cac0711f519a5c07a70`.

In `engine/streaming/src/system.rs`:

- `apply_promotions()` identifies an activation as a resident transition from a non-resident tier. It checks the activation quota and resident cap, increments its local `activations` counter, and only then calls `backend.activate()`.
- If `backend.activate()` returns an error, `report.failed` increases and the failure is retained, but the local activation counter is not decremented. The failed attempt therefore consumes one activation slot for that tick.
- `apply_demotions()` identifies a release as a transition from resident to non-resident. It checks the eviction quota, increments its local `evictions` counter, and only then calls `release()`.
- `release()` may fail while persisting dirty state or while evicting the backend target. Either failure returns without completing the release, but the caller's eviction counter is not decremented. The failed release attempt therefore consumes one eviction slot for that tick.
- A promotion that changes LOD but does not enter residency does not consume an activation slot. A demotion that changes LOD but does not leave residency does not consume an eviction slot.
- The promotion and demotion schedules are deterministic. A failed earlier attempt can use a slot that otherwise could have been spent on a later target in that tick. The later target remains tracked/deferred for a subsequent tick; this is temporary throughput loss, not proof of permanent starvation.

The activation/eviction counters are local to their respective pipeline methods and reset on the next tick. The report's `failed` and `deferred` counters are separate observations: a failed attempt is not automatically counted as deferred. Re-open current source before applying this workflow; these details may change after runtime refactors.

## Required inputs

- Exact NEXORA commit SHA and Rust toolchain.
- `engine/streaming/src/system.rs` and `engine/streaming/src/budget.rs`.
- Activation and eviction budget values.
- A deterministic ordered set of promotion/demotion targets.
- Backend test double capable of refusing activation, persistence and eviction independently.
- Per-target call log and complete `StreamingReport` for each tick.

## Workflow

1. **Pin the source.** Record SHA, toolchain, build profile and source paths. Locate quota counter increments and their ordering relative to backend calls.
2. **Classify quota-consuming work.** Identify only resident-entry activation attempts and resident-exit release attempts. Separate LOD-only transitions from IO/residency transitions.
3. **Inject activation refusal.** Configure activation quota to one or two. Refuse the first scheduled activation and allow the next. Record calls, local quota behavior, report counters and residency after the tick.
4. **Inject persistence refusal.** Select a dirty target scheduled for release, refuse `persist()`, and allow a later target's release. Verify that the first release attempt consumed the eviction slot even though the target remained resident.
5. **Inject eviction refusal.** Allow persistence, refuse `evict()`, and record that the target remains resident and the release attempt consumed the quota.
6. **Test mixed transitions.** Include a non-resident-to-resident promotion that requires IO, a resident LOD promotion that does not, a resident-to-non-resident demotion, and a resident LOD demotion that does not release residency. Verify exactly which counters advance.
7. **Trace subsequent ticks.** Keep inputs stable and verify whether deferred targets are retried. Do not claim eventual convergence unless the test reaches it under stated assumptions.
8. **Separate policy from implementation.** Record that current behavior charges attempts. If a refund-on-failure policy is proposed, analyze duplicate backend side effects, partial failures, retry storms and fairness separately.
9. **Report dimensions independently.** Show attempted calls, successful calls, quota consumed, failures, deferred work and final residency. Do not infer one counter from another.
10. **Report evidence.** Distinguish source-derived semantics, tests actually run, proposed tests and production telemetry.

## Validation checklist

- [ ] SHA and exact quota increment locations are recorded.
- [ ] Activation quota increment is verified to occur before `backend.activate()`.
- [ ] Eviction quota increment is verified to occur before `release()`.
- [ ] Activation failure is shown to consume a tick-local activation slot.
- [ ] Persistence failure is shown to consume a tick-local eviction slot.
- [ ] Eviction failure is shown to consume a tick-local eviction slot.
- [ ] LOD-only promotion/demotion are distinguished from residency IO transitions.
- [ ] Later scheduled targets and deferred counts are recorded.
- [ ] Next-tick retry behavior is checked rather than assumed.
- [ ] No policy recommendation is presented as current implementation behavior.

## Validation matrix

| Scenario | Quota accounting to verify |
|---|---|
| Activation succeeds | One activation slot consumed; resident transition succeeds |
| Activation fails | One activation slot consumed; failure reported; target remains non-resident |
| Activation quota is exhausted | Later resident-entry promotions are deferred without backend activation |
| Promotion changes resident LOD only | No activation slot consumed |
| Dirty target persistence fails during release | One eviction slot consumed; release incomplete; target remains resident |
| Persistence succeeds but backend eviction fails | One eviction slot consumed; release incomplete; target remains resident |
| Clean target eviction succeeds | One eviction slot consumed; release completes |
| Demotion changes resident LOD only | No eviction slot consumed |
| Failed first attempt with a later eligible target | Later target may be deferred when quota is exhausted |
| Following tick | Tick-local quota resets; still-desired work can be attempted again |

## Common failure modes

- Assuming the budget counts only successful operations.
- Assuming a failed backend call refunds a quota slot.
- Treating `report.failed` as equivalent to `report.deferred`.
- Treating a failed release as an eviction or as freed memory.
- Counting LOD-only changes as backend IO.
- Assuming later targets are permanently starved because an earlier attempt failed.
- Claiming next-tick success without a test or production evidence.
- Recommending quota refunds without analyzing backend partial side effects and retry behavior.

## Required output

Produce a concise audit containing:

1. Pinned NEXORA SHA and source paths.
2. Quota definitions and the exact counter increment locations.
3. Attempted versus successful activate/persist/evict calls.
4. Per-tick activation and eviction slots consumed.
5. Failure, deferred and final residency counters.
6. Mixed LOD-only and residency-transition cases.
7. Subsequent-tick retry evidence, if tested.
8. A separate section for policy proposals; never describe a proposal as existing behavior.

## Boundaries and failure handling

Do not modify NEXORA runtime code as part of a skill-only task. If failed attempts consuming quota is considered undesirable, open a separate runtime issue with a reproducible backend double, expected semantics and acceptance tests. Do not refund quota slots or alter scheduling policy without an explicit design decision. A backend error may have partial external side effects, so retry/refund semantics require careful review.

## Trigger examples

- **Positive:** A streaming backend rejects the first activation and the caller wants to know whether later chunks can still use that tick's activation budget.
- **Positive:** Dirty chunk persistence fails during eviction, and the team needs to know whether the eviction budget slot is restored.
- **Negative:** A request asks whether a tick is healthy or quiet despite backend failures; use the StreamingReport outcome-classification workflow.
- **Negative:** A request asks how many failure details remain in memory; use the failure-retention accounting workflow.
