---
name: nexora-region-residency-preservation
description: "Preserves authoritative region files across chunk residency changes, dirty-only saves, eviction merges, and crash-safe header publication."
---

# NEXORA Region Residency Preservation

## Purpose

Use this workflow when changing NEXORA region-store persistence, chunk streaming eviction, incremental saves, or region-file read/modify/write behavior. The core invariant is that the in-memory resident set is not the complete world and must never be treated as a deletion list for authoritative data already stored on disk.

This skill is specific to region ownership and residency. It does not replace generic atomic file writes, region index validation, region compaction, world-save quiescence, or journal replay.

## Reuse before creating

- `voxel-region-save-transaction` for generic crash-safe region persistence and transaction invariants.
- `nexora-save-write-ordering` for durable publication and platform flush semantics.
- `nexora-world-region-compaction` for generation-based compaction.
- `nexora-world-region-index-integrity` for index and offset validation.
- `nexora-world-region-recovery-scan` for region discovery and recovery.
- `nexora-stream-handle-pin-lifecycle` for residency ownership and eviction eligibility.
- `nexora-world-save-quiescence-barrier` for consistent world snapshots.

Do not duplicate these contracts. This skill owns the relationship between resident columns and authoritative region files.

## Verified NEXORA snapshot

Inspected `engine/world/src/region.rs` on NEXORA `main` (blob `0f528451200088cec9b59e632153d09a319d01d7`), plus `engine/world/src/world.rs` and inline region-store tests.

- Region files are authoritative for their region; a region absent from the resident set is not a delete request.
- `write_all` and `write_dirty` iterate resident-world regions. A region file for an unloaded region remains on disk and is not removed merely because no resident chunk maps to it.
- `write_dirty` skips an existing region only when no resident column in it is dirty; a region with no file is written even when its incoming columns are clean.
- Region shape is persisted in the world header. A store reopened with a different extent is refused before writes because the same address could otherwise point at different columns.
- Region writes use `SaveContainer::write_atomic`; resident chunks are marked saved only after the file has been written and verified.
- The world header is published last. If a crash leaves region files ahead of the header, the newer region data loads with the older clock; the reverse ordering could advance the clock beyond data that reached disk.
- `store_columns` is a streaming-eviction read/modify/write: it reads existing region contents, overlays incoming columns (incoming wins on duplicate coordinates), preserves every stored column not named by the call, then atomically writes the merged region.
- `read_region` treats an absent region as empty, but rejects a present file that fails verification or references unregistered block content.
- `regions_on_disk` filters quarantined/interrupted suffixes and parses valid region addresses in stable sorted order.

These are observations of the pinned source, not permanent guarantees. Re-audit the implementation and call sites before changing the contract.

## Required inputs

- Pinned NEXORA commit and exact RegionStore/World/Chunk APIs.
- Region shape and coordinate-to-region mapping.
- Residency lifecycle: load, dirty mutation, save, eviction, reload, and shutdown.
- Existing on-disk region inventory and header metadata.
- Dirty-state semantics and atomic-write verification guarantees.
- Any background save/eviction concurrency and ownership rules.

## Workflow

1. **Treat disk as authoritative for nonresident regions.** A resident-world enumeration is only the current in-memory subset. Never delete or omit an existing region merely because its chunks are unloaded.
2. **Keep region addressing immutable per save.** Validate the persisted region extent before any write. If region shape changes, use an explicit migration that preserves old address interpretation and verifies the full result.
3. **Merge on eviction.** When storing a departing column, read the existing region, overlay the incoming column by coordinate, preserve every other stored column, and write the merged region. Do not serialize only the currently resident columns into the region file.
4. **Define duplicate precedence.** Incoming data for the same chunk coordinate replaces the stored copy only when the caller's revision is authoritative and current. If concurrent revisions are possible, require a revision/token check rather than trusting arrival order.
5. **Batch by region.** Group multiple evicted columns for the same region and perform one read-modify-write per region. Avoid one full region rewrite per column when a batch is available.
6. **Respect dirty-only saves.** Rewrite an existing region only when at least one contained resident column is dirty; still create a missing region file even if its resident columns are clean.
7. **Mark clean only after durable publication.** Do not clear dirty state before atomic write and read-back verification succeed. A failed write must leave the chunk eligible for retry.
8. **Publish metadata after payloads.** Write all changed region files before the world header/clock metadata. A crash may leave newer region payloads with an older header; recovery must not mistake that safe skew for missing data.
9. **Validate read paths independently.** Test whole-world load, standalone region load, single-column lookup, absent region, and region file with missing/unregistered content.
10. **Preserve quarantined artifacts.** Region discovery must not treat quarantine or interrupted-write suffixes as live region files. Do not delete quarantined bytes as part of ordinary save or eviction.
11. **Bound read-modify-write work.** Account for region decode/encode memory, temporary files, bytes written, and concurrent eviction batches. Define backpressure rather than allowing unbounded region jobs.
12. **Test repeated eviction and reload.** Exercise the same coordinate stored twice, multiple columns in one region, reload after eviction, and region re-entry after a process restart.
13. **Make ownership and revision explicit.** A stale asynchronous eviction must not overwrite a newer resident edit. Use generation/revision validation before publication where jobs can complete out of order.
14. **Report exact persistence scope.** Distinguish regions written, regions skipped as clean, bytes published, columns merged, and files preserved because they were outside the resident set.

## Validation matrix

| Scenario | Required invariant |
|---|---|
| One region leaves residency | Its existing region file remains on disk and reloads with its saved blocks. |
| Evict one column from a multi-column region | Other stored columns remain present after merge. |
| Store same coordinate twice | Newer authoritative incoming column replaces the old one. |
| Dirty edit in one region | Only that region is rewritten; untouched region bytes remain identical. |
| Clean column in missing region | Region file is created even though the column is not dirty. |
| Store reopened with changed region extent | Write is refused before data can be filed under conflicting addresses. |
| Crash after region publication before header | New region payload loads with old header/clock; no data loss is inferred from the skew. |
| Crash before region publication | Dirty state remains and old file remains recoverable. |
| Quarantined file in region directory | It is excluded from live region enumeration and preserved. |
| Missing region file | Read returns no columns, not fabricated empty resident chunks. |
| Unregistered block in region palette | Load refuses by identifier; it does not guess a replacement. |
| Concurrent stale eviction | Older chunk revision cannot overwrite newer saved state. |
| Many evictions to one region | Work is batched and temporary memory/disk remain bounded. |

## Existing test anchors in the inspected source

Recheck names and behavior before relying on them. The following tests existed in the inspected `region.rs` snapshot:

- `an_unchanged_region_is_not_rewritten`
- `writing_only_the_dirty_regions_reads_back_the_same_world`
- `a_region_with_no_file_is_written_even_when_nothing_changed`
- `a_region_that_left_the_resident_set_stays_on_disk`
- `regions_ahead_of_the_header_load_with_the_regions_and_the_older_clock`
- `a_region_file_reads_without_the_header`
- `an_absent_region_reads_as_no_columns`
- `a_stray_save_file_in_the_region_directory_is_reported`
- `a_quarantined_region_is_not_mistaken_for_a_region`
- `a_stored_column_merges_into_its_region_without_displacing_the_others`
- `storing_a_column_twice_keeps_the_second_write`
- `a_column_the_store_has_never_seen_reads_as_nothing`
- `a_column_stored_into_a_region_with_no_file_creates_one`
- `reopening_a_store_with_a_different_region_extent_is_refused`
- `content_blocks_read_back_from_regions_and_their_absence_is_named`

These are source-inspected test anchors; this skill authoring step does not claim they were executed.

## Validation checklist

- [ ] Region files are never deleted because their chunks are not resident.
- [ ] Eviction uses a merge that preserves unnamed stored columns.
- [ ] Duplicate coordinate writes have explicit revision/precedence semantics.
- [ ] Region shape is validated before writing.
- [ ] Dirty state is cleared only after verified durable publication.
- [ ] Missing region files are created when required.
- [ ] Header/clock publication occurs after region payloads.
- [ ] Quarantined files remain outside live enumeration and are preserved.
- [ ] Load paths handle missing content without guessing.
- [ ] Concurrent stale writes cannot replace newer data.
- [ ] Temporary memory, disk, and I/O amplification are measured and bounded.
- [ ] Reload-after-eviction and crash-order tests pass on the current revision.

## Required output

Produce a region-residency persistence report containing the pinned commit; resident versus on-disk region inventory; region shape; dirty region selection; eviction merge plan; duplicate revision policy; write ordering; atomic publication results; preserved/unloaded region evidence; I/O and temporary resource measurements; test commands/results; and unresolved risks.

## Boundaries and failure handling

- Do not equate absence from memory with deletion from disk.
- Do not rewrite a region from only the resident set when older stored columns may exist.
- Do not change region extent without an explicit migration.
- Do not clear dirty state before the region file is verified.
- Do not publish the header before region payloads.
- Do not let stale eviction jobs overwrite newer chunk revisions.
- Do not treat quarantined or interrupted files as live region records.
- Do not silently discard stored columns not named by an eviction call.
- Do not claim crash safety beyond the atomic-write and recovery evidence actually tested.

## Trigger examples

- **Positive:** Chunk eviction must persist a departing column without losing its region neighbors.
- **Positive:** A dirty-only save must preserve off-resident world data and avoid rewriting untouched regions.
- **Positive:** Review crash ordering between region payload files and world header/clock.
- **Negative:** The task only validates generic region index offsets; use `nexora-world-region-index-integrity`.
- **Negative:** The task only compacts fragmented region generations; use `nexora-world-region-compaction`.
- **Negative:** The task only implements generic atomic save transactions; use `voxel-region-save-transaction`.
