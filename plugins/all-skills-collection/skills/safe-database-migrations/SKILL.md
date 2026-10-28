---
name: safe-database-migrations
description: "Plans and executes backward-compatible database schema changes with explicit rollout, backfill, and rollback considerations. Use when adding, renaming, transforming, or removing fields and tables in a live or shared database."
---

# Safe Database Migrations

## Goal
Change database structure and data with controlled risk, including deployments where old and new application versions overlap.

## Workflow
1. Inspect the current schema, data volume, constraints, application readers/writers, and deployment topology.
2. Classify the change by compatibility, lock duration, table rewrite risk, and reversibility.
3. Prefer expand-and-contract: add compatible schema first, deploy code that can tolerate both states, backfill safely, switch reads/writes, then remove obsolete schema in a later release.
4. Make backfills resumable, bounded, observable, and idempotent; define batching, checkpoints, throttling, and conflict handling.
5. Check lock behavior and database-specific DDL semantics using the actual database/version documentation.
6. Define preflight checks, backups or recovery strategy, success metrics, and a stop condition before production execution.
7. Test migration from a realistic prior schema, including empty, representative, and malformed legacy data.
8. Coordinate application and schema rollout so mixed versions do not fail during deployment.
9. Prefer forward repair for irreversible data transformations; do not assume a down migration can reconstruct lost information.
10. Verify postconditions: counts, constraints, null rates, query behavior, and application health.

## Deliverable
- Migration and rollout sequence.
- Backfill and observability plan.
- Recovery/forward-fix strategy.
- Evidence from staging or representative tests.

## Acceptance criteria
- The deployment sequence supports the stated version overlap.
- Data transformations are repeatable or safely resumable.
- Lock, downtime, and recovery risks are documented.
- Destructive steps are delayed until compatibility is confirmed.

## Guardrails
- Do not run destructive production migrations without explicit authorization.
- Do not claim rollback safety if data loss is irreversible.
- Do not run unbounded backfills inside a single long transaction without evaluating impact.

