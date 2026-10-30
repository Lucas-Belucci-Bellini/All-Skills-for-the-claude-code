---
name: nexora-client-retained-column-spill-lifecycle
description: "Integrates region-backed spill for edited chunks evicted by the NEXORA windowed client, preserving edits while bounding retained memory and keeping single-container saves complete."
---

# NEXORA Client Retained-Column Spill Lifecycle

## Purpose

Use when extending or reviewing the windowed NEXORA client so edited columns evicted by player streaming no longer accumulate in RAM until shutdown.

This is a client integration workflow, not a replacement for region-file correctness, generic region residency, journal replay, or world-save ordering. It addresses the explicit gap recorded by ADR-0038: the headless slice spills retained edits to region files, while `ClientResidency` still uses memory-only retention.

## Reuse before creating

- `nexora-region-residency-preservation` owns the general rule that disk remains authoritative for nonresident columns and that region merges preserve neighbors.
- `nexora-durable-edit-journal-replay` owns journal replay, deferred column activation, and ordered pending edits.
- `nexora-world-save-quiescence-barrier` owns the save boundary and quiescence requirements.
- `nexora-world-save-checksum-contract` and `nexora-save-write-ordering` own durable save integrity and publication ordering.
- `nexora-memory-budget-admission` owns memory pool admission and pressure policy.

The distinct concern here is wiring the existing region-backed `RetainedChunks` mechanism into the interactive client's residency lifecycle without introducing frame stalls, stale spill data, or incomplete saves.

## Verified NEXORA snapshot

Inspected NEXORA `main` at commit `eed3dbcb68c7540decf08b3d55f2fae7feae8833`:

- `engine/client/src/residency.rs`, blob `550e26bca6ff33f7841dfe44542ca75dec6c65b7`.
- `engine/client/src/lib.rs`, blob `2a90682f74e061c2978b48a97b0eb2ccf7e83ca5`.
- `engine/simulation/src/residency.rs`, blob `c52b99a0c2f58d64077ab78e7ed62422127faa73`.
- `engine/world/src/region.rs`, blob `0f528451200088cec9b59e632153d09a319d01d7`.
- `engine/headless/src/lib.rs`, blob `d45e085931ba7b90a6f8f4b260fe4383d941b51e`.
- `docs/adr/ADR-0038-the-drawn-square-follows-the-player.md`, blob `eeeb9c689a1496ca02502d7663dffd70493d43a5`.
- `docs/plans/NEXORA TECHNICAL DEBT REGISTER.md`, blob `948a4f19015378793882d508a3d1f2b7a94cb8cf`.

Snapshot facts:

- `ClientResidency::new` constructs `RetainedChunks::new()`; it currently has no region-store option.
- The client settles streaming through `WorldResidency`, tracks activated/evicted/persisted counts, and calls `flush_into` before its current single-container `persist::save`.
- `RetainedChunks::backed_by(RegionStore)` already exists. `flush_to_store` writes held columns with `RegionStore::store_columns` and clears the in-memory held set only after the write returns successfully.
- `RegionStore::store_columns` performs a per-region read/merge/write: existing stored neighbors are retained, and incoming columns replace matching coordinates.
- `WorldResidency::activate` can restore a column from the attached store. `flush_into` also reads stored edited columns back into the world, preserving the meaning of the existing single-container save path.
- The headless slice creates a per-run spill directory, uses `RetainedChunks::backed_by`, calls `flush_to_store` after each streaming tick, records spill metrics, then flushes retained data back before the single-container save.
- The headless helper deliberately removes a previous run's spill directory before use; that is safe only because this directory is scratch data for a fresh run, not the authoritative world save.
- ADR-0038 records that the client currently does not spill retained columns to region files, unlike the headless slice. The technical debt register still describes the wider region-store/runtime save-format question separately.

These are pinned-snapshot observations. Recheck the current client lifecycle, save format, and tests before implementation.

## Required inputs

- Pinned NEXORA commit and the current client save/load path.
- World identity, seed, chunk/region shape, block registry/content fingerprint, and save format.
- Spill-store root policy: scratch-only per process, or explicitly durable/recoverable.
- Client frame/threading model and acceptable I/O latency budget.
- Expected eviction rate, edited-column rate, region extent, and memory-pool ceilings.
- Shutdown, crash, restart, and save-failure behavior required by the product.

## Workflow

1. Inspect the client/headless residency paths and pin the exact source revision.
2. Decide whether spill is process-scoped scratch or a durable sidecar protocol.
3. Attach region-backed retention without blocking the streaming eviction callback.
4. Bound and instrument writes, restores, backpressure, and save-time rehydration.
5. Validate movement, failure, shutdown, reload, and frame-time behavior.

### 1. Preserve the current authority boundary

- Streaming decides which columns are resident; `ClientResidency` remains the client adapter and must not become a second chunk generator.
- Keep `WorldResidency` as the only boundary joining streaming and voxel-world residency.
- Never discard an edited column merely because it left the drawn square.
- Keep unedited deterministic columns regenerable; spill only the retained edited columns.
- Do not confuse a column being evicted, retained in memory, written to spill, or included in the durable world save. These are different states.

### 2. Choose and document the spill-store lifetime

For a first client integration that continues to write the existing single-container world save:

- Use a world- and process-scoped scratch spill directory, separate from the durable save path.
- Bind its identity to the world ID, seed, chunk shape, region shape, and the registry/content identity needed to decode stored columns.
- Ensure only one active client process owns a given scratch root; use an ownership marker or exclusive lock rather than assuming path naming prevents concurrent use.
- Create or validate the root before residency begins. Never reuse an unverified directory from a different world, build, or registry.
- On startup, stale scratch cleanup is allowed only after ownership and path canonicalization are verified. Do not recursively delete a user-selected save directory or a directory whose ownership is uncertain.
- Treat scratch spill as an in-process memory-pressure mechanism, not as a durable checkpoint. A crash must recover from the last authoritative save/journal, not silently promote an uncommitted scratch directory into world truth.

If the product instead wants spill files to survive process crashes, stop and design a durable sidecar protocol: session identity, generation/epoch, registry/schema compatibility, journal relationship, startup reconciliation, cleanup, and commit ordering must all be specified and tested. A bare `RegionStore` directory is not by itself a crash-recovery protocol.

### 3. Attach the store without moving disk I/O into eviction

- Construct `RetainedChunks::backed_by(store)` in the client residency owner or an explicit client storage adapter.
- Keep the backend eviction operation cheap: it transfers edited columns to retention and must not synchronously write files inside the streaming manager's budgeted eviction callback.
- Flush held columns only after the streaming tick has returned, following the headless ordering as a correctness reference.
- Do not copy the headless synchronous flush blindly into the interactive frame path. Measure its worst-case cost first; if it threatens frame pacing, introduce a bounded I/O worker/queue with owned immutable payloads, explicit completion, cancellation rules, and backpressure.
- A queued write does not release the retained chunk or its memory accounting until the write has completed and its bytes have been verified. Failed writes leave the column retained and retryable.
- Bound pending flush bytes, number of queued regions, and retry work. When the bound is reached, apply backpressure or defer further eviction; never grow an unbounded queue.
- Preserve the distinction between streaming activation budgets and storage I/O budgets. Do not report an evicted column as safely spilled before durable write verification succeeds.

### 4. Preserve region merge and restore semantics

- Use `RegionStore::store_columns` rather than writing a region from only the currently resident set; the file may already contain nonresident neighbors.
- Verify that the configured region shape matches the store's recorded shape before writing or reading.
- Keep the existing palette/identifier remapping rules. Runtime numeric IDs are not persistent identities.
- On reactivation, prefer the existing `WorldResidency` path so it checks memory retention, spill storage, and deterministic generation in the established order.
- Do not regenerate a column when the spill store contains its edited version.
- Treat an absent column in the spill store as normal only when the column was never spilled; a corrupt existing region or an unknown block identifier is an explicit failure.
- Keep a per-column state machine or equivalent invariant so one coordinate cannot simultaneously be considered resident, pending write, safely spilled, and pending restore.

### 5. Keep the current save boundary complete

The client snapshot currently writes a single-container save, not the spill directory as the authoritative world format.

- Before calling `persist::save`, quiesce residency and all spill writes; no write or restore may still be in flight.
- Call `flush_into(world)` so both in-memory retained columns and previously spilled edited columns are returned to the world.
- If any spill read, verification, or merge fails, abort the save. Do not write a successful-looking snapshot that omits the unavailable edit.
- Only after a complete flush should the client serialize the world and player, write the save atomically, and mark the save complete.
- Keep spill files until the authoritative save has been written and verified. Cleanup before that point can destroy the only copy of an edit.
- After successful save publication, cleanup is permitted only for the exact owned scratch root. Cleanup failure should be reported as leftover scratch, not as a failed world save.
- If the client migrates to RegionStore as its durable save format later, do not call `flush_into` merely to rebuild a monolithic snapshot; instead use the region-store header-last publication contract and the save workflow that owns it.

### 6. Instrument the lifecycle

Report separate counters, not one ambiguous "persisted" number:

- columns evicted;
- edited columns retained in memory;
- columns queued for spill;
- columns whose spill writes were verified;
- region files written and bytes written;
- columns restored from spill;
- columns rehydrated for the single-container save;
- current and peak retained bytes;
- pending write bytes and oldest pending age;
- failed writes/reads and retry count;
- time spent in synchronous spill, async queue wait, write, verification, and shutdown flush.

Keep memory-ledger accounting accurate across the transitions: world pool → retained pool → pending-write ownership → spill storage → restored world pool. Disk bytes must not be reported as freed memory until the owned chunk payload is actually released.

### 7. Validate behavior under movement, failure, and shutdown

- Walk away from an edited column, verify it leaves the active world, spill completes, and retained memory decreases.
- Walk back, verify the exact edit is restored and no seed-generated replacement is used.
- Spill multiple columns in the same region and verify the merge preserves all existing neighbors.
- Spill across negative and positive region coordinates and verify region addressing.
- Force a write/read/checksum failure and prove the edited chunk remains recoverable in memory or in the previous verified file.
- Fill the pending I/O budget and prove eviction applies backpressure instead of growing memory or queue size without bound.
- Save with both in-memory retained columns and disk-spilled columns; reload and compare block identifiers and world state.
- Fail the save after rehydration and prove scratch cleanup does not run prematurely.
- Crash/restart tests must match the declared scratch-versus-durable policy.
- Repeat the same deterministic walk and compare the final saved world digest, not just the number of files written.
- Measure frame p50/p95/p99 and worst-case spill latency on target hardware. Do not infer a performance win from lower retained bytes alone.

## Existing test anchors in the inspected source

Recheck names and behavior before relying on them. These tests were present in the pinned snapshot:

From `engine/simulation/src/residency.rs`:
- `an_edited_chunk_is_retained_and_comes_back_with_its_edit`
- `a_save_written_while_chunks_are_retained_loses_their_edits`
- `flushing_before_the_save_carries_every_edit_across`
- `a_flushed_column_leaves_memory_and_comes_back_from_its_region_file`
- `flushing_bounds_retention_by_what_was_evicted_since_the_last_flush`
- `flush_into_brings_back_the_columns_that_went_to_disk`
- `without_a_store_a_flush_is_a_no_op_and_nothing_changes`

From `engine/world/src/region.rs`:
- `columns_are_filed_under_the_region_that_stores_them`
- `a_stored_column_merges_into_its_region_without_displacing_the_others`
- `a_column_the_store_has_never_seen_reads_as_nothing`
- `a_column_stored_into_a_region_with_no_file_creates_one`
- `reopening_a_store_with_a_different_region_extent_is_refused`

From `engine/client/src/residency.rs`:
- `the_scene_and_its_ring_are_resident_and_nothing_more`
- `an_edit_survives_walking_away_and_back`
- `a_flush_puts_retained_columns_back_for_the_save`

From `engine/headless/src/lib.rs`, the streaming stage already records spill counts and region writes and validates the bounded-retention behavior. The client does not yet have equivalent spill integration in the inspected snapshot.

These are test anchors read from source; this skill authoring task does not claim the NEXORA test suite was executed.

## Validation checklist

- [ ] Spill root is isolated from the durable save and bound to one world/session identity.
- [ ] Concurrent clients cannot own the same scratch root.
- [ ] Stale cleanup is canonicalized and ownership-checked.
- [ ] Eviction callback performs no blocking disk I/O.
- [ ] Flush queue and pending bytes are bounded and backpressured.
- [ ] A retained chunk is released only after a verified spill write.
- [ ] Region writes merge rather than replace unrelated stored columns.
- [ ] Region shape and identifier palette compatibility are checked.
- [ ] Reactivation restores the edited column before generation.
- [ ] Save quiesces all pending spill operations.
- [ ] Single-container save rehydrates every spilled edit before serialization.
- [ ] Spill data is not deleted before authoritative save publication succeeds.
- [ ] Memory and disk metrics account for every ownership transition.
- [ ] Movement, write failure, read failure, save failure, and restart tests pass.
- [ ] Frame-time and spill-latency distributions are measured on target hardware.

## Required output

Produce a client spill lifecycle report containing the pinned NEXORA commit; client and storage code paths; scratch/durable lifetime decision; world/session identity scheme; queue and backpressure limits; region-shape and palette policy; per-column state transitions; spill/restore/save counters; failure injection results; frame-time and I/O latency distributions; exact commands and test output; and unresolved risks. State separately whether edits are preserved in memory, verified on spill, restored on movement, included in the authoritative save, and recoverable after process crash.

## Boundaries and failure handling

- Do not claim the interactive client already spills to region files; the inspected snapshot uses memory-only `RetainedChunks`.
- Do not mistake the headless slice's scratch spill for durable world persistence.
- Do not delete spill data before the save that incorporates it is verified.
- Do not put blocking disk writes inside the streaming eviction callback.
- Do not clear retained chunks or release their memory on a failed/unverified write.
- Do not overwrite region files from the resident set alone; preserve stored neighbors.
- Do not claim frame-time improvement without measurement.
- Do not claim tests ran unless fresh test output proves it.

## Trigger examples

- **Positive:** Add region-backed retained-column storage to the interactive NEXORA client.
- **Positive:** Diagnose retained-memory growth while a player explores and edits a large world.
- **Positive:** Validate that evicted edits return after walking away and back, including after a spill write.
- **Positive:** Prove shutdown saves include both memory-retained and disk-spilled columns.
- **Negative:** The task is only about generic region-file merge or dirty-only writes; use `nexora-region-residency-preservation`.
- **Negative:** The task is only about replaying durable journal records into unloaded columns; use `nexora-durable-edit-journal-replay`.
- **Negative:** The task only changes the authoritative save checkpoint/flush boundary; use `nexora-world-save-quiescence-barrier`.
