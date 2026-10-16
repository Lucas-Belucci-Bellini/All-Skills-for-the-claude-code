---
name: data-export-consistent-snapshot-validation
description: "Verify whether multi-page or asynchronous exports represent one consistent data snapshot or a documented live view under concurrent writes."
---

# Data Export Consistent Snapshot Validation

## Purpose

Prevent exports that silently omit, duplicate or mix records from different logical times when source data changes during export.

## Required inputs

Export query, database isolation level, ordering keys, pagination strategy, job duration, concurrent mutation profile and consistency guarantee.

## Workflow

1. Identify whether the export promises a point-in-time snapshot, bounded watermark or live traversal; require documentation to choose one.
2. Trace how the export captures the dataset boundary and orders records, including tied keys, deletes and updates during pagination.
3. Build a controlled fixture and mutate records during an export; compare record identities and field versions with the declared model.
4. Verify retries or resumed exports reuse the same snapshot/watermark or explicitly restart with a new export version.
5. Record late-arriving records, post-cutoff changes and metadata needed to reproduce the export.

## Validation checklist

- [ ] Consistency guarantee is explicit and matches query behavior.
- [ ] Ordering is deterministic and includes a stable tie-breaker.
- [ ] Concurrent inserts, updates and deletes have defined outcomes.
- [ ] Resume/retry cannot silently mix snapshots.
- [ ] Metadata identifies cutoff, schema version and query filters.

## Required output

A consistency contract, mutation-test matrix, discrepancy report and snapshot/watermark recommendations.

## Boundaries and failure handling

Deterministic ordering alone does not prove point-in-time consistency. Do not keep a database snapshot open indefinitely without assessing resource impact. If the source cannot meet the promised guarantee, state the weaker one and seek approval.

## Trigger examples

- **Positive:** A 20-minute customer export runs while records are inserted and updated.
- **Negative:** Checking who may download an export without checking how it was produced.
