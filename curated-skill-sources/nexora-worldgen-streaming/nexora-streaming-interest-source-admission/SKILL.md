---
name: nexora-streaming-interest-source-admission
description: "Audits bounded admission, stable identity updates, removal and reconnection semantics for NEXORA streaming interest sources."
---

# NEXORA Streaming Interest-Source Admission

## Purpose

Use this workflow when a streaming system rejects a new observer, reaches its interest-source cap, duplicates an observer after movement or reconnect, or releases residency unexpectedly after an interest source is removed.

This workflow covers source identity and admission. It does not replace chunk hysteresis, per-target pin handles, streaming backpressure, or region persistence.

## Evidence boundary

The audited NEXORA snapshot is `19486829d18bd864fea00cac0711f519a5c07a70`.

In `engine/streaming/src/system.rs`:

- `MAX_INTEREST_SOURCES` is 256.
- `set_interest` checks whether the incoming `InterestId` already exists before applying the capacity rejection. An existing identity can be updated even when the map is at capacity.
- A new identity is rejected when 256 sources are already stored.
- `remove_interest` removes the source; residency changes are reconciled on the next `tick`, subject to the eviction budget.
- `too_many_interest_sources_are_refused_but_moving_one_never_is` covers rejection at the cap and successful update of an existing identity.
- Other system tests cover two independent observers, moving one observer, disconnect/reconnect, and preserving the remaining observer's region.

Re-open the current source and tests before applying this workflow. The constant and lifecycle semantics may change. The audited SHA is evidence, not a permanent API guarantee.

## Required inputs

- Exact NEXORA commit SHA and Rust toolchain.
- `engine/streaming/src/system.rs`, `interest.rs`, and the relevant streaming tests.
- The configured source limit and the set of `InterestId` values in the reproduction.
- A deterministic sequence of add, move/update, remove, reconnect and tick operations.
- The `StreamingBudget` used during residency reconciliation and the backend's resident-set observations.
- Expected identity cardinality before and after each operation.

## Workflow

1. **Pin the implementation.** Record the NEXORA SHA, source paths, toolchain and test command. Do not combine results from different revisions.
2. **Trace admission.** Follow `set_interest` from identity lookup through capacity validation to insertion. Confirm that the existing-ID check happens before the new-ID capacity rejection.
3. **Test the boundary.** Exercise 255, 256 and 257 distinct IDs. Verify that the 257th new ID is rejected and that the stored source count remains at the cap.
4. **Test update-at-cap.** At 256 sources, update the center and radii of an existing ID. Verify success, unchanged cardinality and exactly one entry for that identity.
5. **Test rejection atomicity.** Attempt to add a new ID at capacity and verify that no unrelated identity, source position or count changes as a side effect.
6. **Test independent observers.** Add two IDs at distant centers. Move or remove one and verify that the other observer continues to drive its own region.
7. **Test removal timing.** Remove an ID, then inspect state before and after the next tick. Do not assume removal itself performs backend eviction.
8. **Test reconnect semantics.** Re-add the same ID after removal and verify that it creates one active source and restores the expected region without leaving a duplicate old source.
9. **Separate source count from work cost.** Record source cardinality separately from the number of candidate chunks, radius area, activations, evictions and bytes. Do not infer one metric from another.
10. **Report evidence.** Separate source inspection, tests executed, tests proposed and runtime observations. Include exact commands and results for executed tests.

## Validation checklist

- [ ] A new identity is accepted below the configured cap.
- [ ] A new identity is rejected at capacity without changing existing source state.
- [ ] An existing identity can be updated at capacity without increasing cardinality.
- [ ] Updating an identity does not create duplicate source entries.
- [ ] Removing an identity affects only that source.
- [ ] Residency release is observed on the next tick and remains subject to the eviction budget.
- [ ] Re-adding a removed identity restores one source, not parallel duplicate identities.
- [ ] Independent observers continue to retain their own regions.
- [ ] Source cardinality is reported separately from candidate-target and residency counts.

## Validation matrix

| Scenario | Expected observation |
|---|---|
| 255 distinct IDs | New ID is accepted |
| 256 distinct IDs | Capacity is reached |
| 257th distinct ID | Rejected; count remains 256 |
| Update existing ID at capacity | Accepted; count remains 256 |
| Duplicate ID update | One map entry; latest source data wins |
| Remove one of two IDs | Only that source is removed |
| Remove then tick | Residency reconciles subject to eviction budget |
| Re-add removed ID | One active identity; expected region returns |
| Two distant observers | Both regions remain driven independently |

Run focused streaming-system tests first, then the streaming crate test suite. Broader workspace tests are optional unless the change under investigation crosses crate boundaries. Do not claim any test passed unless it was executed against the pinned checkout.

## Common failure modes

- Treating a move as a new source and exhausting the cap with duplicate identities.
- Assuming the capacity check applies to updates as well as new IDs.
- Assuming `remove_interest` synchronously evicts every target.
- Confusing the number of interest sources with the number of candidate chunks or resident targets.
- Removing a shared identity while another subsystem still expects to own it.
- Reconnecting under a new ID without an explicit ownership policy.
- Interpreting a successful `set_interest` call as proof that backend residency has already changed.
- Reporting tests from source presence without executing them.

## Required output

Produce a short audit containing:

1. Pinned NEXORA SHA and relevant implementation paths.
2. Configured source cap and exact new-ID versus existing-ID behavior.
3. A before/after identity-count table for add, update, reject and remove operations.
4. Residency observations before and after tick reconciliation.
5. Test scenarios, commands and observed results.
6. Any uncovered identity collision, capacity, removal or reconnect gap.
7. Explicit limits: this workflow does not implement runtime fixes or establish performance gains.

## Boundaries and failure handling

Do not modify NEXORA runtime code as part of a skill-only task. If a runtime defect is found, open a separate NEXORA issue with a minimal reproduction and acceptance tests. Do not claim that a new skill fixes the engine. Do not raise the source cap merely to mask identity leaks or repeated registration.

## Trigger examples

- **Positive:** A multiplayer session reaches the 256-interest-source cap and needs to distinguish new observer registration from movement of an existing observer.
- **Positive:** A disconnect/reconnect flow leaves a region resident or duplicates an observer identity, and the add/remove/tick lifecycle needs auditing.
- **Negative:** A request is about hysteresis radius transitions or chunk activation order without an interest-source admission or identity problem.
- **Negative:** A request is about per-target pin handles, diagnostic failure retention, or IO backpressure rather than observer-source identity.
