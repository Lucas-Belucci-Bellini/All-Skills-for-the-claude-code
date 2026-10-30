---
name: nexora-stream-handle-pin-lifecycle
description: "Reviews NEXORA streaming request handles, pin counts, slot reuse, stale cancellation, and residency guarantees."
---

# NEXORA StreamHandle and pin lifecycle

## Purpose

Use this workflow when changing `StreamingSystem::request`, `cancel`, pin-slot allocation, pin counts, stream reasons, or the guarantees that keep a chunk resident independently of observer interest.

This is narrower than generic generational resource-handle guidance: it covers the complete relationship between a streaming request, its handle, the target's pin count, and the next residency tick.

## Required inputs

- Exact NEXORA commit SHA and the proposed diff or reproduction.
- `engine/streaming/src/system.rs`, `target.rs`, `lod.rs`, and the streaming budget/backend implementation.
- Existing streaming tests and relevant world-continuity/streaming contract documents.
- Target chunk coordinates, observer configuration, pin acquisition/cancellation sequence, and expected residency.
- Whether the request is about API semantics, slot reuse, memory pressure, persistence, or a backend failure.

## Current implementation facts to re-verify

At the audited NEXORA `main` snapshot on 2026-10-30:

- `request(target, reason)` allocates or reuses a pin slot, increments `pin_counts[target]`, records the reason in the tracked target state, and returns an index-plus-generation `StreamHandle`.
- Multiple handles can pin the same target. `pin_counts` is the aggregate count; the target remains pinned until the last valid handle is cancelled.
- `cancel(handle)` checks slot bounds, generation equality, and whether the slot is occupied before changing state.
- Successful cancellation takes the target out of the slot, advances the generation, and returns the slot to the free list only when `checked_add(1)` succeeds. A generation-exhausted slot is retired instead of reused.
- A stale, already-cancelled, or out-of-range handle returns `false` and must not decrement any target's pin count.
- A pin requests `Lod::Full`, is excluded from memory-pressure shedding, and is independent of observer interest.
- Cancellation releases the pin, not the target synchronously. The next `tick` reconciles desired residency under the configured budgets.
- `TargetState.reason` is a single recorded reason, not a per-handle reason ledger. Do not assume it represents every active pin.

These are snapshot-specific facts. Re-read the implementation and tests before applying them to a later commit.

## Core invariants

1. **One valid handle, one pin contribution.** Each successful `request` increments exactly one target count; each successful `cancel` decrements exactly one.
2. **Stale handles are inert.** A stale handle cannot cancel a newer request, even when its slot index has been reused.
3. **No underflow or cross-target release.** Invalid or repeated cancellation cannot decrement another target's count.
4. **Multiple owners are independent.** Cancelling one of several handles for the same target leaves the target pinned while any valid handle remains.
5. **Pins outrank interest-based eviction.** Observer movement or memory/count pressure must not evict a pinned target.
6. **Cancellation is not eviction completion.** A successful cancel removes the pin; the residency state changes only when the streaming system processes the next tick and its budgets allow it.
7. **Generation exhaustion fails closed.** Never wrap a slot generation back to a value that can make an old handle valid again.
8. **Persistence safety remains in force.** Once a cancelled target becomes eligible for release, the normal persist-before-evict contract still applies.

## Workflow

1. **Record the baseline.** Capture the exact commit, Rust toolchain, crate version and current public API.
2. **Trace acquisition.** Follow `request` from slot selection through `pin_counts`, target tracking, reason assignment and returned handle.
3. **Trace release.** Follow `cancel` through bounds/generation/occupancy checks, slot clearing, generation advancement, free-list insertion and pin-count decrement.
4. **Model the slot lifecycle.** Document states such as free, occupied and retired. Verify that only a successful cancellation moves an occupied slot to free or retired.
5. **Model target aggregation.** For each target, test zero, one and multiple handles. Verify that the aggregate count reaches zero only after the last valid cancellation.
6. **Exercise slot reuse.** Cancel a handle, request another target, and verify the old handle cannot cancel the new occupant of the reused index.
7. **Exercise independent targets.** Interleave requests for different chunks and cancel them in a different order; confirm counts and residency do not cross-contaminate.
8. **Exercise residency.** Pin a target outside every observer radius, tick the system, and confirm it becomes resident. Apply memory/count pressure and confirm the pin is respected.
9. **Exercise cancellation timing.** Cancel the last pin while interest is absent, then tick with constrained and unconstrained budgets. Assert the pin is gone immediately but eviction follows normal tick/budget behavior.
10. **Exercise failure paths.** Combine last-pin cancellation with dirty state, failed persistence and failed eviction. The ordinary persistence safety rule must prevent data loss.
11. **Inspect observability.** Check whether reports expose deferred work, shed work and backend failures accurately; do not infer pin ownership from a single `TargetState.reason`.
12. **Review generation exhaustion.** Verify the implementation retires an exhausted slot. If practical testing cannot reach `u32::MAX`, use a focused internal test seam or a carefully scoped unit test rather than billions of cancellations.
13. **Report gaps separately.** Distinguish behavior already covered by tests from new tests proposed or actually executed.

## Validation matrix

- [ ] A valid handle cancels exactly once.
- [ ] Cancelling the same handle twice returns `false` on the second call.
- [ ] An out-of-range handle is inert.
- [ ] A stale handle cannot cancel a newer occupant after slot reuse.
- [ ] Two handles for one target require two successful cancellations before the target is unpinned.
- [ ] Cancelling a handle for target A does not change target B's pin count.
- [ ] A pinned target outside observer interest becomes resident after a tick.
- [ ] A pinned target survives memory and resident-count pressure.
- [ ] Cancelling one of several pins leaves the target pinned.
- [ ] Cancelling the final pin allows the normal demotion/eviction path on a later tick.
- [ ] Budget deferral does not silently discard a still-required transition.
- [ ] Dirty data is persisted before eviction; failed persistence keeps the target resident.
- [ ] Failed backend eviction is reported and does not falsely decrement resident bytes/state.
- [ ] Generation overflow retires the slot rather than reintroducing an old generation.
- [ ] Repeated equivalent request/cancel sequences produce deterministic state and reports.

## Suggested test names

Use existing naming conventions; these are proposed coverage targets, not claims that tests already exist:

- `cancelling_the_last_of_two_pins_releases_only_after_the_next_tick`
- `cancelling_one_of_two_pins_keeps_the_target_pinned`
- `a_cancelled_handle_cannot_release_a_reused_slot_for_another_target`
- `cancelling_a_handle_for_one_target_does_not_change_another_target`
- `a_generation_exhausted_pin_slot_is_never_reused`
- `a_cancelled_pin_still_obeys_persist_before_evict`

## Suggested focused checks

Confirm the package name from the current workspace manifest before running:

```bash
cargo test -p nexora-streaming
cargo fmt --all -- --check
cargo clippy -p nexora-streaming --all-targets
```

Run the relevant workspace validation documented by NEXORA as well. Do not report any command as executed unless its output was observed on the target commit.

## Required output

Report:

- Commit SHA and exact files reviewed.
- Acquisition/release state transitions and pin-count invariants.
- Existing tests versus proposed additions.
- Commands run and their pass/fail/blocked/not-run status.
- Whether cancellation, residency transition, persistence and eviction were each observed.
- Remaining edge cases, especially generation exhaustion and backend failure behavior.

## Boundaries and failure handling

- Do not replace the streaming pin system with a generic resource-handle abstraction without evidence that the API contract requires it.
- Do not assume `cancel` synchronously evicts a chunk.
- Do not treat `TargetState.reason` as a list of active request owners.
- Do not allow an invalid handle to mutate a slot, free list, or pin count.
- Do not claim generation-overflow behavior is runtime-tested unless a test actually exercises it.
- If a backend, local checkout, or test seam is unavailable, record the limitation instead of inferring success.

## Trigger examples

- **Positive:** A change touches `StreamingSystem::request`, `cancel`, `StreamHandle`, pin slots, `pin_counts`, or target pin semantics.
- **Positive:** A bug report says a chunk unloads while an explicit request is active, a stale handle releases a newer request, or a chunk remains pinned after cancellation.
- **Negative:** The change concerns generic entity/asset handles but does not interact with NEXORA streaming.
- **Negative:** The request is only about chunk priority, IO queue backpressure, or streaming hysteresis without changing request ownership or pin lifetime.
