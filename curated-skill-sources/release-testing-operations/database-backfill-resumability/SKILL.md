---
name: database-backfill-resumability
description: "Use when a large data migration/backfill must pause, retry, or resume without corrupting progress; not for schema-only migration rollback planning."
---

# Database Backfill Resumability

## Purpose

Make backfills restartable and observable under process crashes, transient failures, and partial batch completion.

## Required inputs

Source/target schema, stable traversal key, transformation function, batch size, checkpoint store, retry policy, and rollback/repair strategy.

## Workflow

1. Choose a stable cursor and deterministic transformation; establish idempotency for repeated processing of the same record.
2. Define the checkpoint commit order relative to data writes, including what happens if the process crashes between those operations.
3. Simulate restart, duplicate batch, partial write, malformed row, throttling, and cancellation; verify resume continues from a safe boundary.
4. Add progress, lag, failure counts, checkpoint age, and estimated remaining work without logging sensitive row contents.

## Verification checklist

- [ ] Rerunning a completed batch does not duplicate or damage data.
- [ ] A checkpoint never advances past work that is not durably committed.
- [ ] Poison records have an explicit quarantine/skip policy and do not cause endless loops.
- [ ] The backfill can be paused and resumed using documented operator commands.

## Required output

A resumability design, checkpoint semantics, failure-injection results, and safe run/pause/resume/abort instructions.

## Boundaries and failure handling

Test against fixtures or a staging copy first. Do not change production rows or delete checkpoints without an approved recovery plan.

When required evidence, permissions, or environment details are unavailable, stop at the supported analysis, record the missing prerequisite, and do not report an unexecuted validation as passing.

## Trigger examples

- **Positive:** A backfill times out mid-run and must continue next deployment.
- **Negative:** An ordinary DDL migration that completes atomically and needs only rollback validation.
