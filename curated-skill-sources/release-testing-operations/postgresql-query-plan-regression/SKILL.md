---
name: postgresql-query-plan-regression
description: Detect PostgreSQL query-plan regressions using representative data, EXPLAIN evidence, and repeatable performance budgets.
---

# Postgresql Query Plan Regression

## Goal

Catch queries that become unexpectedly expensive as schemas, statistics, or data distributions change.

## Inputs to inspect

Critical SQL statements, schema/index migrations, representative dataset shape, database version, and latency/throughput goals.

## Workflow

1. Select queries that matter to user-visible latency or batch completion; record expected row counts, selectivity, ordering, and concurrency assumptions.
2. Capture `EXPLAIN (ANALYZE, BUFFERS)` in a safe environment with representative data and identify scans, joins, sorts, spills, and estimate errors.
3. Compare plans after schema, query, data, or database-version changes; distinguish harmless plan changes from measured latency, buffer, or cardinality regressions.
4. Build fixtures or performance checks around stable invariants such as rows touched, index usage when required, and bounded latency under a controlled environment.
5. Document reproduction commands and thresholds; mark tests that require production-scale data or cannot run reliably in shared CI.

## Validation checklist

- [ ] Timing evidence comes from comparable data, settings, and database versions.
- [ ] Plan shape is not treated as a failure unless relevant to a documented invariant or measured regression.
- [ ] Queries with sensitive data are tested on sanitized or synthetic fixtures.
- [ ] Statistics, parameter skew, and concurrency effects are considered where material.
- [ ] The result contains the plan and a clear accepted/regressed decision.

## Required output

Produce a query inventory, before/after plans, measured impact, likely cause, and a reproducible regression test or monitoring rule.

## Boundaries and failure handling

Do not execute expensive EXPLAIN ANALYZE against production without approval; do not force an index based only on one tiny fixture.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
