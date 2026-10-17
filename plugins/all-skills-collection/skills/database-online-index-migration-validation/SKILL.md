---
name: database-online-index-migration-validation
description: "Review online index migration for lock behavior, concurrent writes, uniqueness failures, build progress and safe rollback in production-sized databases."
---

# Database Online Index Migration Validation

## Purpose

Reduce deployment risk for index changes that must coexist with live writes and overlapping application versions.

## Required inputs

Database engine/version, migration scripts, table size and write rate, target index, uniqueness expectations, deployment process and rollback constraints.

## Workflow

1. Verify engine/version-specific semantics for online or concurrent index operations; do not assume syntax and lock behavior are portable.
2. Estimate build load and inspect query workload, existing duplicate/null data, index dependencies and constraints.
3. Define expand/validate/contract steps for adding or replacing an index while old and new app versions run.
4. Test interrupted build, duplicate values, lock timeout, restart and cleanup of invalid/partial index objects.
5. Capture build progress, lock waits, replication impact and query plans; prepare a bounded abort/rollback path.

## Validation checklist

- [ ] Online behavior and transaction boundaries match the actual engine/version.
- [ ] Uniqueness/null assumptions are checked against production-like data.
- [ ] Failed-build cleanup is idempotent and documented.
- [ ] Migration remains compatible with overlapping application versions.
- [ ] Query plans and write impact are measured afterward.

## Required output

A migration runbook, preflight queries, failure/restart matrix, monitoring thresholds and cleanup instructions.

## Boundaries and failure handling

Do not call a migration online without validating the specific engine/version. Do not run destructive index changes in production without approval and recovery planning.

## Trigger examples

- **Positive:** A unique index must be added to a heavily written table without a long write-blocking lock.
- **Negative:** Adding an index to an empty disposable database.
