---
name: nexora-streaming-long-session-residency-soak
description: "Validates NEXORA world-streaming residency, pin lifetimes, byte accounting and budget behavior across prolonged traversal and repeated load/unload cycles."
---

# NEXORA Streaming Long-Session Residency Soak

## Purpose

Use this workflow when NEXORA must remain stable during long play sessions, repeated world traversal, teleports, observer changes, chunk activation/eviction, or sustained memory pressure. It focuses on the concrete streaming manager contract: tracked targets, resident targets, request pins, backend-reported bytes, per-tick activation/eviction budgets, deferred work, shedding, and retained backend failures.

This is not a generic memory-leak checklist, a worker-pool soak test, or a voxel-generation benchmark. Reuse `nexora-memory-leak-lifecycle-test` for cross-subsystem ownership leaks and `nexora-job-system-long-run-health` for worker/result retention. This workflow asks whether the streaming subsystem converges to a bounded, explainable residency state under realistic long-running movement.

## Verified source boundary

The audited NEXORA snapshot exposes the following implementation facts; re-check the active commit before relying on them:

- `engine/streaming/src/system.rs` stores interest sources, tracked targets, pin slots, per-target pin counts, retained backend failures, a dropped-failure counter, and aggregate backend-reported bytes.
- Interest sources are keyed by stable IDs; updating an existing source replaces its position rather than creating another source that can keep an old region resident.
- `request` creates a generation-checked `StreamHandle`, increments the target pin count, and makes the target desired at full residency. `cancel` rejects stale generations and decrements the pin count; the target may be released on a later tick, subject to budgets.
- `resident_count`, `tracked_count`, `bytes`, `is_pinned`, `take_failures`, and `dropped_failures` expose subsystem-level observations.
- `tick` applies promotions, demotions, then post-activation byte-budget shedding; its report includes activated, evicted, deferred, shed, failed, resident, tracked and backend-reported bytes.
- The current byte budget is enforced after promotions by `shed_over_budget`; transient over-budget states can therefore occur. Pinned targets may prevent the manager from returning under the configured byte limit.
- Backend-reported bytes are not process RSS, allocator-reserved memory, or GPU residency unless the backend explicitly defines and measures them as such.
- Backend failures are retained up to `MAX_RETAINED_FAILURES`; excess failures increment a separate dropped-failure counter. A long run that never drains diagnostics can lose individual older error details while preserving the aggregate dropped count.

These observations describe code structure and reported semantics, not a claim that the soak procedure has already run or that a specific memory ceiling is met.

## Required inputs

- Exact NEXORA commit, Rust toolchain, target OS, build profile and hardware profile.
- Streaming backend implementation and the meaning/units of its returned byte count.
- Interest-source identities, movement paths, radii/LOD policy, teleport cases and observer add/remove schedule.
- Pin/request ownership map: which systems create handles, which code cancels them, and expected pin lifetime.
- StreamingBudget values, expected resident/byte envelope, and acceptable transient overshoot policy.
- Backend failure injection hooks or deterministic fake backend, if available.
- Sampling interval, soak duration, warmup period, repeat count and artifact-retention policy.

## Workflow

1. **Pin and map the implementation.** Record the NEXORA commit. Trace `StreamingSystem::request`, `cancel`, `set_interest`, `remove_interest`, `tick`, promotion, demotion, shedding and backend activation/release. Confirm current constants and report fields in source rather than assuming this historical snapshot is unchanged.
2. **Define the expected residency envelope.** Translate the active interest sources and LOD radii into an expected set or upper bound of desired targets. Separately account for pinned targets, tracked-but-nonresident targets, and temporary transitions. Do not equate the maximum resident count with a byte ceiling.
3. **Create repeatable traversal scenarios.** Include a steady route, a long one-way route, a loop returning to the starting region, repeated teleports, rapid direction reversals, observer add/remove, chunk-boundary oscillation, and periods with no interest source. Fix seeds, route coordinates, tick cadence and budgets.
4. **Establish a warm baseline.** Run the route once to populate expected caches, then record a second baseline run. Sample resident, tracked, backend bytes, pin count by target, activations, evictions, deferred, shed, failed, and diagnostic-drop counters at fixed intervals. Record process RSS, allocator metrics and GPU memory separately when those measurements are available.
5. **Track pins by owner and lifetime.** Instrument or log every request handle with owner, target, creation event and cancellation event. At each scenario boundary, reconcile outstanding handles against an explicit allowlist of intentionally pinned targets. A target remaining resident is not automatically a leak if a live pin or interest source still requires it.
6. **Verify observer replacement and removal.** Move an existing interest source repeatedly and confirm its old region becomes eligible for demotion. Remove a source and verify the old region drains after the declared budget-limited delay. Check that duplicate observer identities are not silently accumulating.
7. **Exercise pressure and convergence.** Run with representative and deliberately constrained `max_resident` and `max_bytes` budgets. Confirm deferrals remain retryable, shedding is visible, and the system converges when demand falls. Record transient overshoot caused by promotion-before-shedding separately from steady-state overrun.
8. **Exercise pinned overrun intentionally.** Pin targets whose aggregate backend-reported bytes exceed the budget. Verify that the report and diagnostics expose the overrun and that the system does not evict data it is contractually required to keep resident. Cancel pins, advance enough ticks for bounded eviction work, and confirm recovery.
9. **Inject backend failures.** Fail selected activation, persistence and release operations. Confirm failed work is reported, unsafe eviction does not discard unpersisted edits, diagnostic retention/drop counters behave as specified, and a later healthy tick can make progress.
10. **Check accounting invariants.** Reconcile the system's aggregate bytes with the sum of tracked target byte values for resident entries according to the actual update rules. Detect underflow, double subtraction, stale byte values and counter drift. Do not require exact RSS equality with backend bytes.
11. **Analyze slopes, not isolated peaks.** Compare warm-baseline and soak time series for resident count, tracked count, pin count, backend bytes, RSS/heap and GPU memory. Identify monotonic growth after returning to the same route and same interest state. Separate allocator/cache warmup from unexplained retained targets or resources.
12. **Repeat for determinism and recovery.** Run identical route/budget/failure fixtures at least twice. Compare event order and final logical residency state using the project's deterministic comparison method. Document any platform/backend-dependent memory measurements separately.
13. **Produce a boundedness decision.** Classify each observed increase as required residency, live pin, expected cache, deferred eviction, backend-reported byte change, allocator retention, GPU allocation, diagnostic retention, or unexplained growth. Assign an owner and follow-up for every unexplained category.

## Validation checklist

- [ ] The exact NEXORA revision and backend byte-count semantics are recorded.
- [ ] Interest sources are updated by stable identity and removed sources stop retaining old regions.
- [ ] Every request handle has an owner and a documented cancellation path.
- [ ] Outstanding pins reconcile with the expected pinned-target allowlist at scenario boundaries.
- [ ] Resident and tracked counts return to the expected envelope after returning to the same route and interest state.
- [ ] Backend-reported bytes are reconciled with per-target state without being mislabeled as RSS or GPU memory.
- [ ] Activation, eviction, deferral, shedding and failure counters are captured independently.
- [ ] Promotion-before-shedding transient overshoot is distinguished from persistent budget overrun.
- [ ] Pinned over-budget behavior is explicit, observable and recovers after cancellation.
- [ ] Failed persistence/release does not silently discard world edits.
- [ ] Failure-retention overflow is visible through the dropped-failure counter.
- [ ] Repeated traversal does not create unexplained monotonic growth in resident targets, pins or backend bytes.
- [ ] Identical deterministic fixtures produce equivalent logical final residency state.
- [ ] Source and generated plugin copies are byte-identical; catalog, JSON catalog, manifest and plugin versions reconcile.
- [ ] Runtime soak duration, commands, hardware, metrics and skipped checks are reported honestly.

## Required output

Return:

- Exact NEXORA commit, backend and test environment.
- A residency ownership map for interest sources, pins and backend resources.
- Scenario definitions, warmup policy, duration, repeat count and budgets.
- Time-series data for resident, tracked, pinned, backend bytes, deferred, shed, failed and diagnostic drops.
- RSS/heap/GPU metrics only when collected through separately identified measurement sources.
- A pin-lifetime reconciliation and final outstanding-pin list.
- Failure-injection results and recovery behavior.
- A classification of expected cache growth, temporary overshoot, intentional pinning and unexplained retention.
- Exact commands and outcomes; explicitly list unexecuted runtime, platform and soak checks.
- A decision: bounded, bounded with documented exceptions, regressed, or inconclusive.

## Boundaries and failure handling

- Do not lower budgets or force-evict pinned targets merely to make a graph look healthy.
- Do not classify every resident target as a leak; active interest and pins are legitimate residency causes.
- Do not claim that backend-reported bytes equal RSS, heap commitment, VRAM or total process memory.
- Do not hide post-activation overshoot or a pinned overrun behind an end-of-tick average.
- Do not treat deferred work as lost work; verify it remains eligible for later ticks.
- Do not discard edited world data after persistence failure.
- Do not infer long-session stability from a short unit test or one traversal.
- This skill is a workflow and validation specification. It does not change NEXORA runtime code and does not claim that a soak test or benchmark has been executed.

## Trigger examples

- **Positive:** Repeatedly traversing the same world route leaves more chunks resident after each loop.
- **Positive:** Backend-reported streaming bytes rise over a long session even after observers return to their starting positions.
- **Positive:** A world region remains pinned after a teleport, save or asynchronous request completes.
- **Positive:** Validate recovery after constrained budgets, backend failures and intentional pinned overrun.
- **Negative:** The task concerns worker queue growth or forgotten job outcomes rather than world residency.
- **Negative:** The task is a one-shot chunk-generation benchmark with no residency lifecycle or long-session behavior.
- **Negative:** The only available evidence is process RSS without backend target accounting or an ownership/reproduction trace.
