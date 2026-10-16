---
name: frontend-server-state-cache
description: Design client-side server-state caching, revalidation, invalidation, and concurrency behavior for network-backed UI data.
---

# Frontend Server State Cache

## Goal

Reduce redundant requests without serving stale or mismatched data across account and route changes.

## Inputs to inspect

Data fetching library/hooks, query keys, mutations, navigation, and freshness requirements.

## Workflow

1. Classify data by volatility, identity scope, cacheability, freshness, and whether stale values are safe to display.
2. Define canonical query keys containing all response dimensions, including user/tenant, filters, locale, and pagination.
3. Map mutations to targeted invalidation or optimistic updates and specify reconciliation for failures and concurrent writes.
4. Choose stale time, garbage-collection time, focus/reconnect revalidation, and cancellation rules based on usage.
5. Test rapid route changes, concurrent requests, account switch, rollback, out-of-order results, and offline/online transitions.

## Validation checklist

- [ ] Cache keys cannot leak data across users or tenants.
- [ ] Out-of-order responses cannot overwrite newer view state.
- [ ] Mutations have confirmed, optimistic, and rollback behavior defined.
- [ ] Freshness defaults reflect data risk.
- [ ] Duplicate requests and invalidation storms are measured.

## Required output

Deliver query-key conventions, freshness policy, invalidation map, concurrency tests, and cache observability notes.

## Boundaries and failure handling

Do not share user-scoped cache entries between authenticated sessions; do not optimistically confirm irreversible actions without reconciliation.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
