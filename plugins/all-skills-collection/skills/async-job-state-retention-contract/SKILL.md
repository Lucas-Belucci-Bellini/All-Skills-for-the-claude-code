---
name: async-job-state-retention-contract
description: "Define lifecycle, expiry and retrieval behavior for asynchronous job resources after queued, running, successful, failed or cancelled states."
---

# Async Job State Retention Contract

## Purpose

Keep asynchronous status useful for clients and operators without retaining sensitive payloads or stale state indefinitely.

## Required inputs

Job API, state machine, client polling/webhook mechanism, result storage, retention policy, retry/cancellation model and data classification.

## Workflow

1. Enumerate valid states and transitions, including queued, running, retrying, succeeded, failed, cancelled and expired where applicable.
2. Define which state/result fields remain visible after completion and whether downloadable results expire separately.
3. Specify polling guidance, change tokens, retry-after hints and behavior for unknown, unauthorized or expired job IDs.
4. Test concurrent status reads, delayed transitions, repeated cancellation, retry, completion racing with expiry and polling after terminal state.
5. Verify cleanup removes sensitive result payloads according to policy while retaining only required non-sensitive audit metadata.

## Validation checklist

- [ ] Terminal state semantics are stable and unambiguous.
- [ ] Status and result retention periods are distinct where needed.
- [ ] Expired jobs do not leak existence across tenants.
- [ ] Cleanup is observable, idempotent and concurrency-tested.
- [ ] Client polling backs off and stops after terminal state.

## Required output

A state/retention table, endpoint contract, expiry tests, cleanup observability and polling recommendations.

## Boundaries and failure handling

Do not retain large or sensitive output indefinitely just because a job row is cheap. Do not delete job identity before required idempotency, support or audit windows without documenting the impact.

## Trigger examples

- **Positive:** Completed job records accumulate forever and clients cannot distinguish missing from expired jobs.
- **Negative:** Setting a queue retry delay with no public status resource.
