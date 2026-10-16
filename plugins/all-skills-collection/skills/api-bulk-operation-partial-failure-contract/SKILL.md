---
name: api-bulk-operation-partial-failure-contract
description: "Specify and test per-item outcomes, retry safety and reconciliation for API requests that process multiple records in one operation."
---

# API Bulk Operation Partial Failure Contract

## Purpose

Prevent clients from treating a partially completed bulk request as all-or-nothing success when only some items committed.

## Required inputs

Bulk endpoint schema, batch-size limit, transaction boundary, per-item identity, idempotency model and client retry behavior.

## Workflow

1. Establish whether the operation is atomic for the whole batch, per item or best-effort.
2. Define a response for every item, including stable identifier, outcome, machine-readable error and retry safety.
3. Map validation, authorization, conflict, transient dependency error and unknown post-timeout outcomes to explicit states.
4. Test duplicate items, repeated batch submission, mixed valid/invalid items, timeout after partial commit and reordered responses.
5. Specify how clients reconcile ambiguous outcomes and retry only retryable items without duplicating completed side effects.

## Validation checklist

- [ ] Atomicity boundary is documented and tested.
- [ ] Every submitted item has a determinable result or explicit unknown state.
- [ ] Per-item errors have stable codes.
- [ ] Retrying completed items is idempotent or safely rejected.
- [ ] Batch size and partial-result retention are bounded.

## Required output

A request/response contract, failure-state matrix, client reconciliation guide and partial-commit/replay tests.

## Boundaries and failure handling

Do not claim a batch rolled back when some items may have committed. Do not retry every item after an ambiguous timeout without reconciliation. Protect per-item errors from cross-tenant disclosure.

## Trigger examples

- **Positive:** An import processes 93 of 100 records before a downstream failure.
- **Negative:** Validating one single-record response with no batch semantics.
