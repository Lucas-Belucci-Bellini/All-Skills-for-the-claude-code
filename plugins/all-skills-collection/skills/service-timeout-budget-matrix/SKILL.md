---
name: service-timeout-budget-matrix
description: "Map deadlines across inbound requests, downstream calls, queues and retries so nested waits cannot exceed the caller's useful time budget."
---

# Service Timeout Budget Matrix

## Purpose

Replace unrelated per-call timeouts with an end-to-end deadline contract that protects latency and capacity.

## Required inputs

Request path, downstream dependency graph, client/server timeouts, retry policy, expected latency budget and cancellation support.

## Workflow

1. Trace a representative request from ingress through synchronous dependencies and any asynchronous boundary.
2. Record connect, TLS, read, total-request, queue-wait and job-deadline settings with units and owning layer.
3. Allocate the caller budget across dependencies, local work and response transmission; account for nested retries.
4. Verify the remaining deadline reaches cancellable downstream work and timeout outcomes do not leave unbounded work running.
5. Exercise slow dependencies, connect stalls, partial responses, cancellation and client disconnect; compare elapsed time to the declared budget.

## Validation checklist

- [ ] Timeout values have unambiguous units and semantics.
- [ ] Downstream budgets cannot silently outlive the end-to-end deadline.
- [ ] Retries fit the remaining budget or stop.
- [ ] Cancellation propagates where supported and lingering work is observable.
- [ ] Timeout responses differ from application failures.

## Required output

A call-chain timeout matrix, propagation gaps, budget recommendations and slow/hung dependency tests.

## Boundaries and failure handling

Do not give every layer the same timeout without considering call depth. Do not claim cancellation succeeded just because the caller returned. State any component that cannot accept deadlines.

## Trigger examples

- **Positive:** The API returns after 2 seconds, but downstream work keeps consuming workers for 30 seconds.
- **Negative:** Choosing connection-pool size without timeout analysis.
