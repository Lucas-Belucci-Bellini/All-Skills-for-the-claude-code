---
name: chunk-save-dirty-region-tracking
description: Validate dirty-state tracking for chunk mutations, region aggregation, autosave scheduling, and successful persistence acknowledgement.
---

# Chunk Save Dirty Region Tracking

## Goal

Prevent world edits from being lost or causing constant unnecessary saves by keeping dirty ownership and save completion explicit.

## Inputs to inspect

Voxel/entity mutation APIs, dirty flags or revision counters, region save jobs, write acknowledgements and shutdown flushing.

## Workflow

1. Map every authoritative mutation path to the chunk or region revision it increments, including indirect changes from simulation, structures and entity data.
2. Trace how dirty chunks are grouped into region writes and how a successful save acknowledges a particular revision rather than clearing newer edits.
3. Test mutations during an in-flight save, cancellation, write failure, region unload, autosave overlap and process shutdown.
4. Measure bytes saved, dirty age, retry count and time from last mutation to durable acknowledgement under representative workloads.
5. Add revision-based tests proving edits made after snapshot creation remain dirty until a later snapshot persists them.

## Validation checklist

- [ ] Dirty state clears only when the persisted snapshot covers the current authoritative revision.
- [ ] Failed or interrupted writes remain retryable and report actionable errors.
- [ ] Region aggregation does not omit boundary chunks or serialize stale entity state.
- [ ] Shutdown policy defines whether it waits, warns or intentionally defers outstanding writes.

## Required output

A mutation-to-save map, revision acknowledgement contract, failure tests and persistence-latency metrics.

## Boundaries and failure handling

Do not clear a global dirty flag after a partial region save without proving every affected chunk revision was included.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
