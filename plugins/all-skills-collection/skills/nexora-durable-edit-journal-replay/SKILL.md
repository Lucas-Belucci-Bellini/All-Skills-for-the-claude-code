---
name: nexora-durable-edit-journal-replay
description: "Defines safe semantic replay of durable world edit journals, including per-column deferral, missing-content handling, damage reporting, and recovery completeness."
---

# NEXORA Durable Edit Journal Replay

## Purpose

Use this workflow when implementing, reviewing, or debugging recovery of voxel-world edits recorded between authoritative snapshots. It covers semantic replay, ordering, residency deferral, partial recovery reporting, and the boundary between durable persistence journals and transient chunk diagnostics.

This skill does not define save-generation selection, file write ordering, corruption quarantine, snapshot quiescence, or the bounded in-memory chunk change feed.

## Reuse before creating

- `nexora-save-recovery-generation-select` for choosing a committed compatible snapshot generation.
- `nexora-save-corruption-quarantine` for preserving and quarantining damaged save bytes.
- `nexora-save-write-ordering` for durable publication and crash consistency.
- `nexora-world-save-quiescence-barrier` for obtaining a consistent snapshot.
- `nexora-world-recovery-priority` for required versus optional world content.
- `nexora-chunk-change-feed-gap-recovery` for the separate bounded in-memory diagnostic feed.
- `nexora-save-forward-compatibility` and registry migration workflows for content/schema compatibility.

Do not conflate these responsibilities. This skill owns the meaning and application of durable world edit records after the persistence layer has framed and validated the journal.

## Verified NEXORA snapshot

Inspected `engine/world/src/recovery.rs` on NEXORA `main` (blob `06f11dd88c446191aafc3a1248d91ad099175914`), plus `engine/world/src/chunk.rs` and the recovery module's inline tests.

- Durable replay receives `nexora_persistence::journal::Replay`; the persistence layer owns framing/checksum and reports optional `Damage`.
- `EditRecord::SetBlock` encodes world coordinates and a namespaced `Identifier`, not a process-local `BlockStateId`. Replay resolves the identifier against the current registry.
- Records are applied in journal order. The final write to a position must remain the final state.
- An edit refused only because its chunk is not resident is indexed in `PendingEdits` by `ChunkCoord`. Each column's records retain journal order; different columns have no overwrite dependency under the current single-position edit variant.
- `PendingEdits::apply_column` removes that column's pending vector before applying it. Remaining failures are returned as `refused`, not silently requeued forever.
- Unknown block identifiers are reported as `SkipReason::UnknownBlock`; they are not deferred because waiting for residency cannot make missing content appear.
- Malformed/unknown-tag records become `Undecodable`; one bad record does not prevent later valid records from being attempted.
- `RecoveryReport::is_complete` requires no skipped edits and no journal damage. Deferred work therefore means initial replay is not complete.
- The report carries applied count, indexed skips, damage, and pending edits; a column later reports applied/refused counts.
- The transient `Chunk` journal is a separate bounded 4,096-entry diagnostic ring. It drops old entries and is not the durable replay source.

These are observations of the pinned snapshot, not promises that future APIs remain unchanged. Re-run call-site and schema audits before implementation.

## Required inputs

- Pinned NEXORA commit and exact snapshot, persistence journal, registry, and recovery APIs.
- Journal format/version, framing/checksum result, and any torn-tail or damage metadata.
- Current registry identifiers and content/mod compatibility policy.
- World/chunk residency state and the owner that will request deferred columns.
- Recovery lifecycle: startup, region/column arrival, reload, and shutdown.
- A durable checkpoint/acknowledgement policy for replay progress and pending work.

## Workflow

### Semantic replay

1. **Separate physical validation from semantic application.** First validate journal framing, record lengths, checksums, and supported version in the persistence layer. Then decode world edit records in the world layer.
2. **Persist stable identifiers.** Never serialize runtime registry IDs as durable block identity. Resolve namespaced identifiers against the active registry during replay.
3. **Preserve journal order.** Apply records in their original order. For repeated writes to the same position, the last journaled write wins.
4. **Classify failures by recoverability.** Distinguish undecodable record, unknown content, nonresident/nonwritable column, and journal damage. Do not collapse them into one generic failure count.
5. **Continue after isolated bad records.** Report each failed record with its original journal index while continuing to process independent records, unless the persistence layer marks the entire journal unsafe.
6. **Defer residency-only failures.** Index a decoded edit by its owning column only when loading that column can make the write valid. Do not defer unknown identifiers, malformed records, or permanent policy refusals.
7. **Preserve per-column order.** When deferring multiple edits for a column, retain their original relative order. Only parallelize across columns after proving there are no cross-column dependencies in the record model.
8. **Apply on column arrival.** Remove and process the pending list for that column once it becomes writable. Return residual refusals explicitly; do not endlessly requeue permanent failures.
9. **Track unresolved work.** Expose pending edit count, columns waiting, applied count, refusal reasons, and journal damage. A startup phase must not claim full recovery while any pending work remains.
10. **Make recovery progress durable.** If replay can be interrupted, define whether it restarts from the snapshot and replays the journal, or checkpoints an acknowledged cursor. Never persist a cursor ahead of durable world application.
11. **Avoid duplicate application ambiguity.** Current `EditRecord` has no explicit record sequence or idempotency key. Before introducing asynchronous retries/checkpointing, define replay epochs, cursor identity, and atomicity between world mutation and progress acknowledgement.
12. **Handle damage conservatively.** Carry torn-tail/checksum damage into the final report. Recover valid independent records only where the persistence contract permits; never report complete recovery if damage exists.
13. **Keep pending memory bounded.** Bound journal size, pending edit count, bytes per record, number of deferred columns, and lifetime. Define backpressure or a safe refusal when limits are reached.
14. **Do not confuse journals.** The bounded per-chunk change feed is diagnostic and lossy; the durable persistence journal is the recovery input. Never use `take_journal()` to rebuild saved world state.
15. **Keep future record variants compatible.** `EditRecord` is non-exhaustive; version and tag additions need explicit compatibility behavior for older readers and unknown variants.
16. **Report the recovery outcome honestly.** Distinguish fully applied, partially applied with deferred residency, skipped due to missing content, damaged journal, and unrecoverable state.

## Validation matrix

| Scenario | Required invariant |
|---|---|
| Stable identifier round-trip | Encoded record resolves to the same namespaced content identity. |
| Registry runtime IDs reordered | Replay still places the intended block. |
| Multiple writes to one position | Journal order is preserved; last write wins. |
| Edits span multiple columns | Per-column deferral preserves each column's order without inventing global order. |
| Column not resident | Edit is deferred and indexed under exactly its owning column. |
| Column arrives later | Deferred edits apply in order and pending count falls correctly. |
| Column never arrives | Pending work remains visible; recovery is not marked complete. |
| Unknown block identifier | Reported as missing content and not deferred. |
| Truncated/unknown-tag record | Record is refused with its journal index; later independent valid records are handled according to policy. |
| Torn journal tail | Damage is preserved in report; recovery is not marked complete. |
| One malformed record among valid records | Valid independent records still apply. |
| Interrupted replay | Restart/checkpoint semantics cannot skip or double-acknowledge mutations. |
| Pending memory limit reached | Bounded, observable refusal/backpressure; no silent loss. |
| Chunk diagnostic ring overflow | Durable recovery remains unaffected and does not consume the transient feed. |

## Existing test anchors in the inspected source

Recheck names and behavior before relying on them. The following tests existed in the inspected `recovery.rs` snapshot:

- `an_edit_waiting_on_a_column_is_applied_when_the_column_arrives`
- `a_deferred_column_keeps_its_records_in_journal_order`
- `an_unknown_block_is_not_deferred_because_waiting_cannot_help`
- `a_column_with_nothing_waiting_recovers_nothing_and_says_so`
- `an_edit_record_round_trips`
- `a_truncated_record_is_refused_rather_than_partially_read`
- `an_unknown_tag_is_refused`
- `replaying_a_journal_reapplies_the_edits_it_recorded`
- `edits_are_applied_in_order_so_the_last_write_wins`
- `an_unregistered_block_is_reported_as_missing_content_not_guessed`
- `one_bad_record_does_not_cost_the_rest_of_the_journal`
- `an_edit_into_a_chunk_that_is_not_resident_is_reported`
- `journal_damage_is_carried_into_the_recovery_report`
- `a_snapshot_id_is_derived_from_the_bytes_that_were_saved`

These are source-inspected test anchors; this skill authoring step does not claim they were executed.

## Validation checklist

- [ ] Stable identifiers, record tags, and schema compatibility are verified.
- [ ] Physical journal validation is separated from semantic replay.
- [ ] Original journal ordering is preserved.
- [ ] Deferred edits are grouped by owning column and ordered within each column.
- [ ] Missing content is reported, never guessed or deferred.
- [ ] Pending edits are applied exactly when residency makes them eligible.
- [ ] Permanent failures are returned, not endlessly requeued.
- [ ] Pending work and journal damage prevent a false complete-recovery status.
- [ ] Replay interruption, retry, cursor, and acknowledgement semantics are explicit.
- [ ] Pending memory and record sizes are bounded.
- [ ] Durable journal and transient chunk diagnostic feed remain separate.
- [ ] Tests cover registry reorder, multi-column replay, corruption, partial load, and restart.

## Required output

Produce a durable-journal replay report containing the pinned commit; record schema and stable identity; physical validation result; replay order; per-record applied/skipped status; deferred-column inventory; recovery completeness; damage metadata; retry/checkpoint semantics; memory bounds; compatibility plan; test commands/results; and unresolved risks.

## Boundaries

- Do not treat runtime block IDs as durable identity.
- Do not silently skip missing content or invent replacement blocks.
- Do not reorder writes to the same position.
- Do not defer failures that residency cannot fix.
- Do not mark recovery complete while edits are pending or journal damage remains.
- Do not retry permanent refusals forever.
- Do not confuse the lossy chunk diagnostic ring with the durable persistence journal.
- Do not claim exactly-once replay without a sequence/cursor and atomic acknowledgement contract.
- Do not claim tests ran unless their results are recorded from the current revision.

## Trigger examples

- **Positive:** Implement or review `Snapshot + Journal → Recovery` for voxel edits.
- **Positive:** Defer journal records until the owning chunk/column becomes resident.
- **Positive:** Diagnose missing registry content, torn tails, or partial replay.
- **Negative:** The task only chooses a save generation; use `nexora-save-recovery-generation-select`.
- **Negative:** The task only quarantines corrupt bytes; use `nexora-save-corruption-quarantine`.
- **Negative:** The task only handles the bounded in-memory change feed; use `nexora-chunk-change-feed-gap-recovery`.
