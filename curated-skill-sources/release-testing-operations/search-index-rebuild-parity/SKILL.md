---
name: search-index-rebuild-parity
description: "Use when rebuilding a search index or derived document store and verifying parity with authoritative records; not for relevance tuning."
---

# Search Index Rebuild Parity

## Purpose

Use when rebuilding a search index or derived document store and verifying parity with authoritative records; not for relevance tuning.

## Required inputs

Inputs: source snapshot/watermark, index mapping, ingestion cursor, dedupe key, transforms, comparison queries.

## Workflow

1. Choose a consistent source snapshot and define how concurrent writes are captured.
2. Compare counts by partition/type, stable IDs, transformed fields, version markers, and deletion tombstones.
3. Test duplicate events, retry, mapping changes, and writes racing with index swap.
4. Run shadow queries and define cutover thresholds and rollback criteria.

## Verification checklist

Checks: count differences are explained; stable IDs map to expected cardinality; rebuild captures concurrent writes; rollback restores old index without losing newer writes.

## Required output

Output: source/index parity report, mismatches, cutover decision, rollback plan.

## Boundaries and failure handling

Boundary: don't cut over based only on matching totals; redact sensitive indexed fields from examples.

If evidence or permissions are missing, record the blocker and don't report unrun validation as passed.

## Trigger examples

- Positive: Positive: a rebuilt index completes but recently updated records disappear.
- Negative: Negative: tuning ranking after a correct rebuild.
