---
name: nexora-streaming-byte-budget-post-activation-shedding
description: "Audits NEXORA streaming byte-budget enforcement after activation, including transient overshoot, pinned residency, and shedding failures."
---

# NEXORA Streaming Byte-Budget Post-Activation Shedding

## Purpose

Use this workflow when NEXORA streaming reports bytes above its configured budget, when a memory spike appears during chunk activation, or when pinned targets prevent the system from returning below its byte limit.

This workflow documents the current pipeline and creates evidence for memory-budget decisions. It does not implement preflight reservations, change pin semantics, or claim that the configured byte limit is a hard admission ceiling.

## Evidence boundary

Audited snapshot: `19486829d18bd864fea00cac0711f519a5c07a70`, primarily `engine/streaming/src/system.rs` and `engine/streaming/src/budget.rs`.

The current `tick()` order is:

1. Validate the budget.
2. Compute desired tiers and split promotions/demotions.
3. Apply promotions.
4. Apply demotions.
5. Call `shed_over_budget()`.
6. Populate report residency, tracked count and bytes.

In `apply_promotions()`:

- Resident-entry work checks the activation-count quota and `resident_count() >= budget.max_resident`.
- It does not compare `self.bytes` or the backend's projected activation size with `budget.max_bytes` before calling `backend.activate()`.
- On success, the backend-reported byte count is added to the internal ledger.

In `shed_over_budget()`:

- The system checks `self.bytes > budget.max_bytes` after promotions and demotions have run.
- It selects the furthest resident target that is not pinned, releases it, and repeats until both count and byte limits are met or no eligible victim can be released.
- Pinned residents are never selected as victims.
- If every resident is pinned, the loop returns while the byte or count limit remains exceeded.
- If persistence or backend eviction fails while releasing a victim, the loop returns early; the target remains resident and the budget can remain exceeded.

Therefore `max_bytes` is enforced through post-operation shedding in this implementation, not by a pre-activation reservation check. The system can temporarily exceed the configured limit between successful activation and shedding. A final report can also remain over budget when all possible victims are pinned or release fails.

The internal byte ledger uses the byte count returned by the residency backend. It is not necessarily process RSS, GPU allocation, allocator committed memory, or total machine memory. Re-open current source before applying this workflow; implementation details may change.

## Required inputs

- Exact NEXORA commit SHA and Rust toolchain.
- `engine/streaming/src/system.rs`, `budget.rs`, and the backend implementation.
- Configured `max_bytes`, `max_resident`, activation and eviction budgets.
- Backend-reported byte size for each target and whether each target is pinned or dirty.
- Tick-by-tick report fields, internal ledger bytes and backend residency.
- A deterministic workload covering activation, shedding, pinning and release failures.

## Workflow

1. **Pin the implementation.** Record SHA, toolchain, source paths and backend implementation. Confirm the current order of promotions, demotions and shedding.
2. **Trace admission checks.** Identify every check before `backend.activate()`. Confirm whether it reserves or estimates bytes, or only checks activation count and resident count.
3. **Trace byte accounting.** Record where the backend returns a byte count and how the internal ledger updates after activation, tier changes and release.
4. **Measure transient overshoot.** Use a backend test double that returns controlled byte sizes. Activate a target whose size pushes the ledger above `max_bytes`; instrument the point immediately after activation and before shedding.
5. **Verify post-operation correction.** Confirm that shedding begins after promotions/demotions and selects the furthest non-pinned resident target.
6. **Test all-pinned overrun.** Pin all resident targets, set `max_bytes` below their combined backend-reported size, and verify that shedding cannot select a victim. Record the final report bytes and the fact that the limit remains exceeded.
7. **Test release failure.** Use a dirty victim whose persistence fails, then a clean/dirty victim whose eviction fails. Confirm that shedding stops and the byte ledger is not reduced for the failed release.
8. **Separate accounting domains.** Label backend-reported resident bytes separately from process RSS, GPU memory, allocator reserved memory and total system RAM. Do not compare unlike quantities as if they were equivalent.
9. **Evaluate proposals separately.** If preflight reservation is proposed, specify how projected size is known, how concurrent activations reserve capacity, how reservations are released after failure, and how unknown backend sizes are handled.
10. **Report evidence.** Separate code-derived behavior, test-double results, actual runtime measurements and proposed design changes.

## Validation checklist

- [ ] Pinned NEXORA SHA and pipeline order are recorded.
- [ ] Pre-activation checks for activation count and resident count are documented.
- [ ] Presence or absence of a pre-activation byte reservation is verified.
- [ ] Backend-reported bytes and internal ledger updates are traced.
- [ ] Transient overshoot between activation and shedding is tested or instrumented.
- [ ] Shedding victim selection excludes pinned residents.
- [ ] All-pinned overrun is represented and not mislabeled as successful enforcement.
- [ ] Persistence and eviction failures during shedding are tested independently.
- [ ] Report bytes are distinguished from process RSS and GPU memory.
- [ ] Any preflight/reservation proposal is clearly marked as a proposal, not current behavior.

## Validation matrix

| Scenario | Expected behavior to verify |
|---|---|
| Current bytes below limit after activation | Shedding does not need to remove a target for byte pressure |
| Activation pushes bytes above limit | Activation succeeds first; byte pressure is evaluated later in shedding |
| Multiple activations occur in one tick | Temporary peak may exceed final post-shedding bytes |
| Furthest non-pinned target exists | Shedding attempts to release the furthest eligible target |
| All resident targets are pinned | No victim is selected; final bytes may remain above `max_bytes` |
| Dirty victim persistence fails | Release fails; shedding stops; resident bytes are not subtracted |
| Backend eviction fails | Release fails; shedding stops; target remains resident |
| Byte limit and resident-count limit both exceeded | Each loop iteration evaluates both; record which condition required each release |
| Backend byte report differs from process/GPU telemetry | Keep the accounting domains separate and report the discrepancy |

## Common failure modes

- Describing `max_bytes` as a hard pre-activation admission ceiling.
- Assuming a successful tick always ends at or below the byte limit.
- Ignoring the temporary peak between activation and shedding.
- Assuming pinned targets can be evicted to satisfy memory pressure.
- Treating a failed persist/evict attempt as freed memory.
- Confusing backend-reported resident bytes with RSS or GPU memory.
- Proposing byte reservations without a way to estimate or reserve backend allocation safely.
- Treating post-activation shedding as proof that no transient allocation spike occurred.

## Required output

Produce a concise audit containing:

1. Pinned NEXORA SHA and exact pipeline order.
2. Pre-activation admission checks and whether byte reservation exists.
3. Per-target backend-reported bytes and internal ledger changes.
4. Peak bytes before shedding and final bytes after shedding, if instrumented.
5. Victim selection, pin status and release outcomes.
6. All-pinned and release-failure behavior.
7. Distinction between internal resident-byte accounting, RSS and GPU memory.
8. Separate current behavior, measured evidence and proposed improvements.

## Boundaries and failure handling

Do not modify NEXORA runtime code as part of a skill-only task. If transient overshoot is unacceptable, open a separate runtime design issue with a defined allocation contract, projected-size source, reservation lifecycle, failure rollback and concurrency model. Do not break pins or claim a hard memory ceiling without explicit design and tests.

## Trigger examples

- **Positive:** A chunk activation briefly pushes the streaming byte ledger above `max_bytes` before shedding runs.
- **Positive:** The final report remains above the byte limit because all resident targets are pinned.
- **Negative:** A request asks which target should be evicted based on nearest-observer priority or tie-breaking; use the streaming priority/fairness workflow.
- **Negative:** A request asks how pin handles are created, cancelled or protected from stale handles; use the stream-handle pin-lifecycle workflow.
