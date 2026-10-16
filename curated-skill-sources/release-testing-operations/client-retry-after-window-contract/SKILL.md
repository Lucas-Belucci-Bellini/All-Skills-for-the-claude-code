---
name: client-retry-after-window-contract
description: "Validate client behavior for server-provided Retry-After hints, rate-limit reset windows, clock skew and cancellation without synchronized retry bursts."
---

# Client Retry-After Window Contract

## Purpose

Ensure API clients respect server throttling hints and resume work without bypassing rate limits or creating synchronized retry spikes.

## Required inputs

Client retry library, server response codes/headers, rate-limit policy, clock assumptions, caller deadline and background queue.

## Workflow

1. Enumerate responses that instruct the client to wait and define supported Retry-After formats and malformed-hint behavior.
2. Verify delay calculation for seconds and HTTP-date forms, including clock skew, maximum wait and monotonic time measurement.
3. Apply bounded jitter only when the contract permits it; never retry earlier than the server's required delay.
4. Test repeated throttles, concurrent requests, restart, caller cancellation and deadlines that expire before the suggested wait.
5. Record metrics for throttling, scheduled retries, dropped operations and resumed work.

## Validation checklist

- [ ] Valid server hints are parsed with bounded behavior.
- [ ] Malformed values cannot create zero-delay loops or indefinite waits.
- [ ] Cancellation/deadlines stop retries when the caller no longer needs the result.
- [ ] Clients avoid synchronized bursts where the protocol allows jitter.
- [ ] Rate limits are not bypassed by a second retry layer.

## Required output

A response/header matrix, delay rules, fake-clock tests and observability recommendations.

## Boundaries and failure handling

Do not ignore Retry-After because exponential backoff exists. Do not block a shared event loop or worker during long waits. State any server-specific assumptions.

## Trigger examples

- **Positive:** An SDK immediately retries each throttled request despite the server's wait hint.
- **Negative:** Designing server-side quotas without client response handling.
