---
name: redis-cache-stampede-control
description: "Use when simultaneous cache misses trigger duplicate expensive work for one key; not for general cache invalidation correctness."
---

# Redis Cache Stampede Control

## Purpose

Use when simultaneous cache misses trigger duplicate expensive work for one key; not for general cache invalidation correctness.

## Required inputs

Inputs: cache keys/TTL, origin cost, concurrency profile, coalescing/lock method, stale policy, metrics.

## Workflow

1. Correlate hot-key expiry with origin spikes and estimate fan-in.
2. Compare request coalescing, bounded locks, TTL jitter, background refresh, and stale-while-revalidate against freshness requirements.
3. Stress synchronized expiry, lock-holder crash, slow origin, and high-cardinality cold keys.
4. Measure duplicate origin reduction, waiter latency, staleness, and coordination failure behavior.

## Verification checklist

Checks: bounded origin computations per hot key; lock failure doesn't block indefinitely; stale serving follows contract; metrics distinguish misses from duplicate work.

## Required output

Output: reproduction, control comparison, before/after origin-load metrics, fallback policy.

## Boundaries and failure handling

Boundary: coordination must not bypass authorization or freshness checks.

If required evidence or permissions are missing, record the blocker and don't report unrun checks as passed.

## Trigger examples

- Positive: Positive: hundreds of requests recompute one popular value after expiry.
- Negative: Negative: invalidation targets the wrong key and leaves stale data.
