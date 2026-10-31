---
name: sql-query-performance
description: "Diagnoses slow SQL using query plans, workload evidence, and index trade-offs. Use when a query is slow, database load is high, or schema/index changes need performance justification."
---

# SQL Query Performance

## Goal
Improve query latency and resource use based on measured workload evidence, not generic tuning folklore.

## Workflow
1. Capture the exact query, parameters, schema, indexes, row counts, database version, and observed latency/load conditions.
2. Establish a baseline with representative parameters and a repeatable measurement method.
3. Inspect the query plan using the database's supported explain tools; use execution analysis carefully if it actually runs the query.
4. Check cardinality estimates, scans, join strategy, sort/hash spills, repeated lookups, and rows produced versus rows consumed.
5. Verify index usefulness against filters, joins, ordering, selectivity, and write overhead. Consider composite index column order based on real access patterns.
6. Check for avoidable N+1 queries, unnecessary columns, non-sargable predicates, redundant work, and pagination that degrades at large offsets.
7. Consider query rewrites only when semantics remain equivalent, including null handling, duplicates, ordering, and transaction isolation.
8. Benchmark before and after with realistic data and multiple parameter shapes; separate warm-cache and cold-cache effects when relevant.
9. Monitor regressions in CPU, memory, I/O, lock contention, and write throughput, not latency alone.
10. Report measured improvements and the limits of the benchmark.

## Deliverable
- Baseline and query plan findings.
- Specific change with index/write trade-offs.
- Before/after measurements and reproducible commands.

## Acceptance criteria
- Optimization is supported by measurements from representative inputs.
- Query semantics remain correct.
- Added indexes or caching have documented costs and invalidation rules.
- Results are not generalized beyond the tested workload without evidence.

## Guardrails
- Do not run expensive production explain/benchmark workloads without authorization.
- Do not add indexes blindly or use hints before understanding the plan.
- Do not claim performance gains from intuition alone.

