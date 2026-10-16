---
name: event-consumer-offset-recovery
description: "Use when a message consumer may crash between processing an event and committing its offset/checkpoint; not for designing general outbox/inbox architecture."
---

# Event Consumer Offset Recovery

## Purpose

Prevent silent event loss or unbounded duplication when consumer progress and side effects are committed separately.

## Required inputs

Consumer framework, offset/checkpoint semantics, side-effect destination, idempotency keys, retry/dead-letter path, and crash test harness.

## Workflow

1. Document when an event is fetched, processed, side effects become durable, and the offset/checkpoint is committed.
2. Inject crashes or timeouts between each transition, including after a side effect succeeds but before progress is persisted.
3. Verify idempotency or transactional coupling makes replay safe, and confirm poison events stop at a bounded retry/dead-letter policy.
4. Exercise partition reassignment, checkpoint rollback, and replay after restart; compare consumed, applied, skipped, and pending counts.

## Verification checklist

- [ ] Progress is not committed before required side effects are durable unless the semantics explicitly permit it.
- [ ] Replayed events are deduplicated or idempotent at the side-effect boundary.
- [ ] Dead-lettered events remain discoverable with replay provenance.
- [ ] Metrics distinguish fetched, applied, replayed, failed, and checkpointed events.

## Required output

A crash-window table, recovery tests, idempotency requirements, and reconciliation queries or counters.

## Boundaries and failure handling

Use a staging topic or fixture events. Do not seek production offsets backward or replay production side effects without approval.

When required evidence, permissions, or environment details are unavailable, stop at the supported analysis, record the missing prerequisite, and do not report an unexecuted validation as passing.

## Trigger examples

- **Positive:** A worker writes a database row and crashes before committing the queue offset.
- **Negative:** Choosing partition count for throughput without a consumer-recovery question.
