---
name: cache-invalidation-contract
description: Define cache keys, invalidation triggers, freshness guarantees, and stampede controls for application data.
---

# Cache Invalidation Contract

## Goal

Keep cached values consistent with source-of-truth updates while retaining the performance benefits of caching.

## Inputs to inspect

Cache layer, data ownership, update flows, TTL policy, invalidation events, and acceptable staleness.

## Workflow

1. Identify every cached value, its source of truth, readers, writers, tenancy dimensions, and maximum acceptable stale window.
2. Design cache keys that include all identity, locale, authorization, query, and schema dimensions that affect the result.
3. Map write operations and background events to invalidation/update triggers; handle delete, rename, permission change, and transaction rollback.
4. Choose TTL, stale-while-revalidate, version tokens, or targeted invalidation based on the data's correctness needs; plan for cache stampedes and partial outages.
5. Test concurrent updates, duplicate invalidations, stale replicas, missing events, tenant collisions, and cache backend downtime.

## Validation checklist

- [ ] Key design cannot mix data across tenants or authorization scopes.
- [ ] Every critical write path has a documented cache consistency rule.
- [ ] Invalidation failure has bounded recovery through TTL, retry, versioning, or reconciliation.
- [ ] Stampede protection does not cause indefinite stale data.
- [ ] Observability separates hit rate, stale-serving time, invalidation lag, and backend load.

## Required output

Produce a data-to-cache matrix, key schema, invalidation map, staleness contract, outage behavior, and concurrency test plan.

## Boundaries and failure handling

Do not cache authorization-sensitive data without incorporating identity/permissions; do not claim strong consistency from an eventually updated cache.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
