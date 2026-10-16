---
name: database-connection-pool-saturation
description: "Use when latency or timeouts may be caused by exhausted database connection pools; not for query-plan optimization without pool pressure."
---

# Database Connection Pool Saturation

## Purpose

Distinguish pool saturation from slow queries, database capacity limits, leaked connections, and downstream request pileups.

## Required inputs

Pool configuration, active/idle/waiting metrics, acquisition timeout, query duration, request concurrency, database connection limits, and timeout logs.

## Workflow

1. Capture pool metrics and acquisition latency alongside query duration, application queue depth, database connection count, and request throughput.
2. Separate time waiting for a connection from time executing a query; identify long-held transactions, leaked checkout paths, and nested acquisition patterns.
3. Reproduce the symptom with a bounded concurrency test while varying one pool or workload parameter at a time.
4. Recommend the smallest safe change: release connection earlier, fix leak, cap concurrency, shorten transaction, or tune pool size against database capacity.

## Verification checklist

- [ ] Pool wait time and query execution time are reported separately.
- [ ] Connection checkout/release paths are paired on success, error, cancellation, and timeout.
- [ ] Proposed pool size respects the database-wide connection budget across all app replicas.
- [ ] Retries cannot multiply waiting load without a bounded backoff or concurrency limit.

## Required output

A saturation diagnosis with metrics, bottleneck classification, supporting time window, and ranked remediation options.

## Boundaries and failure handling

Do not increase pool size blindly; this can move the queue to the database and worsen overload. Redact connection strings and credentials.

When required evidence, permissions, or environment details are unavailable, stop at the supported analysis, record the missing prerequisite, and do not report an unexecuted validation as passing.

## Trigger examples

- **Positive:** Requests time out even though individual SQL queries are short.
- **Negative:** A single query is consistently slow while the pool has free connections.
