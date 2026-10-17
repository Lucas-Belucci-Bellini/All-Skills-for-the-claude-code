---
name: skill-broker-request-idempotency
description: "Makes repeated skill broker requests safe across retries and agent restarts. Use when clients may resend search, gap-report, or proposal requests after timeouts."
---

# Skill Broker Request Idempotency

## Purpose

Prevent network retries or resumed agents from creating duplicate requests, proposals, or side effects.

## Required inputs

Broker endpoint list, operation classes, request IDs, retry policy, record retention, and operations that create or mutate state.

## Workflow

1. Classify endpoints as pure reads, idempotent writes, or non-idempotent side effects; assign an idempotency strategy to every state-changing request.
2. Define a key scope that includes caller/tenant, operation and client-generated request ID, plus a payload hash to detect key reuse with different content.
3. Store the first terminal outcome for the documented retention period and return it when the same equivalent request is retried.
4. Reject reuse of an idempotency key with a materially different payload and define concurrency behavior for two simultaneous submissions.
5. Simulate timeout after server commit, client retry, duplicate delivery, key expiry, and concurrent requests; inspect resulting records.

## Validation checklist

- [ ] Retrying an equivalent request does not duplicate its side effect.
- [ ] Key reuse with changed payload is rejected explicitly.
- [ ] Idempotency scope prevents cross-tenant collisions.
- [ ] Retention and expiry are documented.
- [ ] Timeout-after-commit and concurrent-request cases are tested.

## Required output

An idempotency contract, storage/retention requirements, response semantics, and regression fixtures.

## Boundaries and failure handling

Do not promise exactly-once processing where the underlying system only supports at-least-once delivery. For non-idempotent actions, use explicit state inspection or human approval rather than blind retries.

If required evidence is missing, record the gap and stop before irreversible actions. Do not claim a test, network request, compatibility result, or approval occurred unless its evidence was observed.

## Trigger examples

- **Positive:** An agent resends a missing-skill request after a network timeout and should not create three copies.
- **Negative:** A read-only search has no writes, side effects, or cost amplification concern.
