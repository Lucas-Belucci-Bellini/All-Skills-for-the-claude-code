---
name: nexora-chunk-change-feed-gap-recovery
description: "Defines safe consumer behavior for NEXORA's bounded chunk change journal, including dropped-history detection, snapshot resynchronization, and retry-safe feed handling."
---

# NEXORA Chunk Change Feed Gap Recovery

## Purpose

Use this workflow when connecting NEXORA's chunk change journal to history, replication, editor undo, analytics, derived-data invalidation, or another incremental consumer. It defines how consumers must react when the bounded journal discards older changes.

This workflow is about **consumer correctness when a delta feed is incomplete**. It does not replace chunk dirty-state tracking, persistence snapshots, edit transactions, or general event-bus design.

## Reuse before creating

- `voxel-chunk-dirty-state-contract` for dirty flags, stale derived data, and chunk mutation ownership.
- `nexora-voxel-memory-workload-benchmark` for bounded memory accounting and workload measurement.
- `nexora-world-save-quiescence-barrier` for authoritative save snapshots and safe persistence boundaries.
- `nexora-world-edit-conflict-resolution` and `engine-voxel-edit-transaction-rollback` for edit conflicts and transactional rollback.
- `nexora-mod-event-subscription-lifecycle` for subscriber registration and teardown when the consumer is a mod.
- `nexora-stream-handle-pin-lifecycle` for chunk residency ownership when consumers need a chunk to remain loaded.

Do not reproduce dirty-state, persistence, transaction, or subscriber-lifecycle policies. This skill owns the gap semantics and resynchronization protocol for the bounded per-chunk change feed.

## Verified NEXORA snapshot

Inspected `engine/world/src/chunk.rs` on NEXORA `main` (source blob `25573fa5c7c77492a834a30c2dd3a9b2e8e03d8a`) and its inline tests.

- `MAX_JOURNAL_ENTRIES` is 4,096. When full, `record` drops the oldest entry with `VecDeque::pop_front` and increments `dropped_journal_entries`.
- `ChangeFeed` contains `changes: Vec<VoxelChange>` and `dropped: u64`; `is_complete()` is true only when `dropped == 0`.
- `ChangeFeed::is_empty()` and `ChangeFeed::is_complete()` are independent: a feed can contain no retained changes and still report a gap.
- `Chunk::take_journal()` transfers the retained changes and the dropped count together, then resets both journal and counter.
- `Chunk::clear_journal()` intentionally discards both retained changes and the gap. Its documented use is setup paths such as newly generated or decoded chunks, where no downstream consumer should observe construction edits.
- `VoxelChange` records world position, previous state, next state, and `WorldTime`. The inspected type has no explicit sequence number or feed epoch.
- The chunk's `dirty_sections` set is separate from the journal. It records which sections changed since `mark_clean`; draining or clearing the journal does not clear dirty sections.
- The technical-debt register's DEBT-0004 notes that the previous O(n) front-removal cost was replaced with `VecDeque` and that the gap is now returned with the data. It also says downstream history/replication consumers were not yet wired in the inspected plan snapshot.

These are snapshot observations, not permanent API guarantees. Re-run a repository-wide call-site search before implementing a consumer.

## Required inputs

- Pinned NEXORA commit and exact `Chunk`, `ChangeFeed`, and `VoxelChange` definitions.
- Every call site of `take_journal` and `clear_journal`, including tests and feature-gated crates.
- Consumer purpose: history, replication, undo, analytics, mesh invalidation, or diagnostics.
- Consumer's authoritative baseline and its last successfully applied cursor/revision.
- Recovery source: current chunk snapshot, world snapshot, durable event log, or an explicit refusal to continue.
- Chunk identity, lifecycle/residency guarantees, retry semantics, and any cross-chunk ordering requirement.

## Workflow

### Consumer contract

1. **Treat the journal as a bounded delta window.** It is not a durable event log, complete history, or persistence source. The authoritative current voxel state remains the chunk/world data.
2. **Inspect completeness before applying changes.** Read `feed.dropped` or `feed.is_complete()` before interpreting `feed.changes` as a complete interval. Do not infer completeness from a non-empty vector.
3. **On a gap, invalidate incremental continuity.** If `dropped > 0`, mark the consumer's view as stale and initiate its defined recovery path. Do not silently apply the retained suffix as if it were the entire history.
4. **Handle empty-but-incomplete feeds.** An empty feed with `dropped > 0` is a resynchronization signal, not a no-op. Preserve and surface that signal to the consumer's owner.
5. **Use an authoritative snapshot to rebuild state.** For derived state that must match the current world, reacquire a consistent chunk/world snapshot and rebuild from it. If the consumer requires historical events that cannot be reconstructed from current state, record an explicit history gap and do not fabricate missing events.
6. **Define the snapshot/feed handoff.** Prevent edits from falling between snapshot acquisition and subsequent delta subscription. Use a world/chunk revision, lock/quiescence barrier, or another proven atomic handoff. If the current APIs cannot provide one, document the race and keep the consumer in a stale/unavailable state until a safe contract exists.
7. **Preserve the chunk identity with the feed.** `ChangeFeed` itself does not carry the owning chunk coordinate in the inspected snapshot. A consumer must retain the source chunk identity alongside the drained feed and must not mix feeds from different chunks.
8. **Respect per-chunk ordering only.** The retained deque is oldest-first for one chunk. Do not infer a total order across chunks from drain timing or `WorldTime`; if a consumer needs global ordering, define a stable cross-chunk sequence/epoch contract.
9. **Do not infer exactly-once delivery from timestamps.** The inspected `VoxelChange` has no explicit sequence/cursor. For asynchronous, retryable, or durable consumers, add an explicit revision/sequence and acknowledgement contract before claiming exactly-once or resumable delivery.
10. **Make draining retry-safe.** `take_journal` resets the source immediately. Move the returned feed into an owned queue or durable handoff before acknowledging it; if processing fails, retry the same owned feed or rebuild from a snapshot. Do not discard a feed and then expect the chunk to replay it.
11. **Keep `clear_journal` narrowly scoped.** Use it only when intentionally discarding construction/setup edits that no consumer should observe. Never call it to suppress an overflow warning or to make an incomplete feed appear complete.
12. **Keep dirty tracking independent.** A feed gap does not mean the chunk's dirty-section set is complete history, and draining the journal does not make a chunk clean. Persistence and current-state invalidation must follow their own dirty/snapshot contracts.
13. **Bound downstream queues too.** A bounded source journal does not prevent an unbounded subscriber queue. Define queue limits, overflow behavior, backpressure, subscriber isolation, and teardown semantics.
14. **Avoid accidental replay amplification.** If a consumer coalesces multiple changes to the same position, prove that its output only needs final state. History/undo consumers generally need ordered cause/effect events and cannot coalesce without changing semantics.
15. **Test chunk lifecycle races.** Exercise feed draining around unload, save, reload, generation, eviction, and reacquisition. Do not keep a stale chunk reference or consume deltas after its identity/revision has changed.
16. **Report the recovery result honestly.** Distinguish complete incremental application, successful snapshot rebuild, explicit historical gap, retry pending, and unrecoverable consumer state.

## Validation scenarios

| Scenario | Required invariant |
|---|---|
| Feed below cap | All retained changes are delivered oldest-first and marked complete. |
| Exactly 4,096 entries | No drop is reported until the next real mutation exceeds the cap. |
| 4,097th mutation | Oldest entry is dropped and `dropped == 1`. |
| Multiple overflow mutations | Dropped count equals the number of discarded entries, not the current retained length. |
| Empty but incomplete | Consumer initiates recovery even if `changes` is empty. |
| Drain then drain again | First feed carries the gap; second feed does not repeat it unless new overflow occurred. |
| Consumer processing failure | The owned feed remains retryable, or consumer rebuilds from an authoritative snapshot. |
| Snapshot concurrent with edits | No mutation is lost between snapshot and subsequent feed subscription. |
| Multiple chunks | Feeds retain chunk identity; no invented global ordering. |
| Save/load or generation | Setup journal clearing does not erase user-visible history or dirty state. |
| Slow subscriber | Downstream queue remains bounded and overflow is observable. |
| Unload/reload | Consumer cannot apply stale feed data to a new chunk incarnation. |

## Existing test anchors in the inspected source

Recheck names and behavior before using them. The following tests were present in the inspected `chunk.rs` snapshot:

- `the_journal_records_cause_and_effect`
- `draining_the_feed_hands_back_the_gap_it_leaves_behind`
- `a_feed_can_be_empty_and_still_incomplete`
- `clearing_the_feed_drops_the_gap_with_it`
- `the_journal_is_bounded_and_reports_what_it_dropped`
- `rewriting_the_same_state_does_not_dirty_or_journal`
- `dirty_tracking_is_per_section`

These are source-inspected test anchors; this skill authoring step does not claim they were executed.

## Validation checklist

- [ ] All `take_journal` and `clear_journal` call sites were inventoried.
- [ ] Consumers inspect `dropped` before applying deltas.
- [ ] Empty-but-incomplete feeds trigger a visible recovery path.
- [ ] Incomplete suffixes are never mislabeled as complete history.
- [ ] Snapshot-to-feed handoff cannot lose concurrent edits, or its limitation is explicit.
- [ ] Chunk identity and per-chunk ordering are preserved.
- [ ] No exactly-once or resumability claim is made without a sequence/ack contract.
- [ ] Drained feeds remain owned and retryable until consumer acknowledgement.
- [ ] Dirty sections and persistence snapshots remain independent from journal completeness.
- [ ] Downstream queues have bounded capacity and observable overflow.
- [ ] Generation, save/load, unload/reload, and consumer teardown are tested.
- [ ] Historical gaps are represented honestly rather than reconstructed from guesses.

## Required output

Produce a change-feed integration report containing the pinned commit; complete call-site inventory; consumer type and authoritative baseline; feed completeness policy; gap detection and recovery state machine; snapshot/feed handoff protocol; chunk identity and ordering semantics; retry/ack behavior; downstream queue budgets; lifecycle/race test matrix; test commands/results; and unresolved gaps. Explicitly state whether the consumer provides current-state convergence, complete historical replay, best-effort deltas, or no delivery guarantee.

## Boundaries and failure handling

- Do not treat the 4,096-entry journal as an archival history store.
- Do not process an incomplete retained suffix as a complete change interval.
- Do not equate an empty feed with a complete feed.
- Do not discard the `dropped` signal after `take_journal` has reset the source counter.
- Do not use `clear_journal` as an overflow recovery mechanism.
- Do not assume timestamps establish global ordering or exactly-once delivery.
- Do not use dirty-section tracking as a substitute for a missing event history.
- Do not invent missing events or claim historical reconstruction from a current snapshot.
- Do not claim that history/replication consumers exist in NEXORA until a fresh call-site audit proves it.

## Trigger examples

- **Positive:** Connect the bounded chunk journal to history, replication, undo/redo, or incremental analytics.
- **Positive:** A consumer must recover when `ChangeFeed.dropped > 0` or when a feed is empty but incomplete.
- **Positive:** Design a retry-safe snapshot-plus-delta handoff for chunk consumers.
- **Negative:** The task only changes dirty-section flags or mesh invalidation; use `voxel-chunk-dirty-state-contract`.
- **Negative:** The task only changes save snapshot quiescence or file atomicity; use the dedicated world-save workflows.
- **Negative:** The task only changes generic mod event subscription teardown; use `nexora-mod-event-subscription-lifecycle`.
