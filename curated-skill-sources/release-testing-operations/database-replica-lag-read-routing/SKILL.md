---
name: database-replica-lag-read-routing
description: "Use when replica lag may violate read-after-write behavior and read routing needs a freshness policy; not for connection-pool saturation."
---

# Database Replica Lag Read Routing

## Purpose

Route reads according to per-path consistency needs and observable replica freshness.

## Required inputs

Database topology, lag metrics, endpoint consistency needs, read-after-write flows, failover behavior, routing configuration.

## Workflow

1. Classify reads as stale-tolerant, bounded-staleness, or requiring read-your-writes.
2. Measure lag and route decisions through delayed replication, failover, and missing telemetry conditions.
3. Test a write followed by dependent reads and fallback when replicas exceed the lag budget.
4. Ensure transaction-dependent or sensitive reads are not routed to stale replicas prematurely.

## Verification checklist

- [ ] Freshness requirements are stated per read path.
- [ ] Lag thresholds map to a documented fallback.
- [ ] Read-your-writes survives lag and primary failover.
- [ ] Missing lag telemetry is not interpreted as zero lag.

## Required output

A consistency matrix, routing policy, lag-fault results, and fallback conditions.

## Boundaries and failure handling

Do not weaken consistency for latency without product approval and documented trade-offs.

When evidence, permissions, or environment details are missing, stop at the supported analysis, record the missing prerequisite, and do not report unexecuted validation as passing.

## Trigger examples

- **Positive:** A saved record reads back as an older value from a replica.
- **Negative:** Diagnosing a slow query when replica lag is not involved.
