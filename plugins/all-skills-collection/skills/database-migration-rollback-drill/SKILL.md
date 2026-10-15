---
name: database-migration-rollback-drill
description: Practice database migration recovery with backups, expand-contract sequencing, reversible steps, and verification of restored application compatibility.
---

# Database Migration Rollback Drill

## Goal

Ensure a failed schema deployment can be contained or rolled back without silently losing user data.

## Inputs to inspect

Migration files, production-like schema/data, app versions, backup/restore procedures, and deployment pipeline.

## Workflow

1. Classify each migration as additive, backfill, destructive, or behavior-changing; identify data transformations and writes that cannot be trivially reversed.
2. Plan expand-contract phases where old and new application versions must coexist. Define the deployment order and minimum compatibility window.
3. Run the migration against representative data and measure lock duration, row counts, execution time, and any background backfill progress.
4. In an isolated environment, interrupt the migration or deploy a compatible prior app version; exercise documented rollback, forward-fix, or restore steps.
5. Verify constraints, indexes, row counts, application queries, and migration metadata after recovery; document which operations are irreversible.

## Validation checklist

- [ ] A backup is restorable and has a clear recovery point/time expectation.
- [ ] Destructive changes have explicit data-preservation and approval rules.
- [ ] Mixed-version app/schema compatibility is tested when rollout requires it.
- [ ] Rollback or forward-fix procedure is exercised rather than merely documented.
- [ ] Recovered data and application behavior are checked with concrete invariants.

## Required output

Produce a migration risk table, rollout sequence, rollback/forward-fix decision tree, drill evidence, and outstanding irreversible risks.

## Boundaries and failure handling

Do not assume a down migration restores deleted data; do not execute rollback drills against production by default.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
