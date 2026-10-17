---
name: postgresql-transaction-isolation-audit
description: "Use when a PostgreSQL workflow depends on concurrency semantics and may suffer from write skew, lost updates, or unexpected serialization failures; not for index/query-plan tuning."
---

# Postgresql Transaction Isolation Audit

## Purpose

Check whether transaction isolation and locking match the invariants of concurrent application operations.

## Required inputs

PostgreSQL version, transaction boundaries, read/write queries, invariant being protected, isolation level, retry policy, and concurrency test harness.

## Workflow

1. Write the business invariant and concurrent operations as a minimal interleaving scenario instead of relying on ORM method names.
2. Identify the configured isolation level, explicit locks, constraints, and transaction boundaries that enforce the invariant.
3. Run two-or-more session tests for conflicting updates, predicate reads, uniqueness races, retries, and serialization failures.
4. Select the simplest safe control: database constraint, targeted row/advisory lock, serializable transaction with retry, or revised transaction shape.

## Verification checklist

- [ ] Tests demonstrate the invariant under simultaneous operations, not only sequential unit tests.
- [ ] Retryable transaction failures are retried from the transaction boundary, not mid-transaction.
- [ ] Uniqueness and referential invariants are enforced by the database where possible.
- [ ] Lock scope and deadlock risk are documented.

## Required output

A concurrency schedule, isolation/locking assessment, executable test scenario, and recommended invariant enforcement.

## Boundaries and failure handling

Do not assume stronger isolation is free of throughput costs. Validate behavior on the exact supported PostgreSQL version and schema.

When required evidence, permissions, or environment details are unavailable, stop at the supported analysis, record the missing prerequisite, and do not report an unexecuted validation as passing.

## Trigger examples

- **Positive:** Two workers both read remaining capacity and reserve the final slot.
- **Negative:** Choosing an index for a query that has no concurrency correctness requirement.
