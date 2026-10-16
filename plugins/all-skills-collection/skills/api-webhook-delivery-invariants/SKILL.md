---
name: api-webhook-delivery-invariants
description: "Use when designing or reviewing webhook delivery, retry, signature, and receiver behavior under duplicate, delayed, or missing events; not for generic event-schema evolution."
---

# Api Webhook Delivery Invariants

## Purpose

Make webhook behavior reliable across retries, duplicate deliveries, reordering, transient receiver failures, and signature-verification failures.

## Required inputs

Webhook event schema, signing protocol, retry/backoff policy, receiver idempotency mechanism, ordering expectations, timeout budget, and delivery logs or test harness.

## Workflow

1. Map the complete delivery lifecycle from event creation through signing, transport, receiver acknowledgement, retry scheduling, and terminal failure.
2. Define invariants for authenticity, at-least-once delivery, idempotent processing, retry limits, and any ordering guarantees the product truly supports.
3. Build tests for duplicate delivery, delayed acknowledgement, network timeout after receiver commit, invalid signature, stale timestamp, and receiver 4xx/5xx outcomes.
4. Review dead-letter handling and operator replay so replay preserves event identity and does not silently bypass signature or idempotency controls.

## Verification checklist

- [ ] Every delivery has a stable event identifier and a documented idempotency strategy.
- [ ] Signature checks use the exact canonical payload and reject stale or malformed requests.
- [ ] Retries are bounded and distinguish retryable from permanent receiver failures.
- [ ] The documentation does not promise ordering unless it is enforced and tested.

## Required output

A webhook invariant matrix, retry state diagram, failure-case test results, and receiver implementation recommendations.

## Boundaries and failure handling

Do not log signing secrets or full sensitive payloads. Do not automatically replay a production event unless authorization and impact are clear.

When required evidence, permissions, or environment details are unavailable, stop at the supported analysis, record the missing prerequisite, and do not report an unexecuted validation as passing.

## Trigger examples

- **Positive:** A webhook receiver occasionally applies the same payment-status event twice after timeouts.
- **Negative:** Changing event field names without any delivery or retry concern.
