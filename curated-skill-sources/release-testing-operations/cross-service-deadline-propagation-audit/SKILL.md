---
name: cross-service-deadline-propagation-audit
description: "Trace absolute deadlines through gateways, RPCs, queues and downstream services to find lost cancellation context or work that continues after callers give up."
---

# Cross-Service Deadline Propagation Audit

## Purpose

Verify that an operation's time budget remains meaningful across service boundaries rather than resetting at every hop.

## Required inputs

Distributed call graph, request-context mechanism, deadline metadata, asynchronous boundaries, timeout policy and cancellation telemetry.

## Workflow

1. Trace a business operation across ingress, service calls, queue submission and background execution; record where deadline context is set or dropped.
2. Distinguish absolute deadlines from per-hop timeouts and document clock-skew assumptions.
3. Verify downstream clients receive the remaining budget and reject malformed or expired deadline metadata safely.
4. Test slow hops, retries, queue delay, client disconnect and cancellation races; check if orphaned work is bounded and observable.
5. Compare distributed traces with elapsed time and correlate cancellation/timeout outcomes at each hop.

## Validation checklist

- [ ] Deadline propagation is explicit at synchronous boundaries.
- [ ] A downstream hop cannot reset the entire request budget silently.
- [ ] Invalid/expired deadlines are handled predictably.
- [ ] Queue work uses a separate documented deadline when appropriate.
- [ ] Traces distinguish caller timeout from downstream failure.

## Required output

A hop-by-hop deadline map, propagation gaps, failure-injection evidence and prioritized remediation.

## Boundaries and failure handling

Do not trust caller-supplied deadlines without validation and policy caps. Do not report work stopped unless downstream cancellation was observed or work remains bounded by its own deadline.

## Trigger examples

- **Positive:** Each microservice applies a fresh 3-second timeout and the overall request exceeds the user's deadline.
- **Negative:** Selecting one HTTP client's timeout without a distributed call chain.
