---
name: background-job-retry-design
description: Design bounded retries, backoff, deduplication, and dead-letter recovery for background jobs and scheduled workers.
---

# Background Job Retry Design

## Goal

Make transient failures recoverable without creating retry storms, duplicate side effects, or permanently stuck jobs.

## Inputs to inspect

Job queue, failure modes, retry policy, job payload, idempotency model, and operational dashboard.

## Workflow

1. Classify errors as transient, permanent, rate-limited, cancelled, or unknown; state which failures should retry and which should stop.
2. Choose bounded attempts, exponential backoff with jitter, maximum age, and queue-specific retry budgets to prevent correlated retry storms.
3. Ensure job side effects are idempotent or use checkpoints/operation keys; define whether partial progress is safe to resume.
4. Design dead-letter visibility, safe replay controls, payload versioning, and operator guidance for poison jobs.
5. Test worker crash, lease expiry, downstream rate limit, repeated permanent error, duplicate delivery, and deployment during in-flight work.

## Validation checklist

- [ ] Retries have finite bounds and measurable delay/attempt limits.
- [ ] Permanent failures do not loop indefinitely.
- [ ] Duplicate execution cannot repeat protected side effects.
- [ ] Dead-letter replay validates current payload/schema and uses explicit permissions.
- [ ] Metrics distinguish queue wait, execution time, retry count, and exhausted jobs.

## Required output

Deliver a retry matrix, backoff formula, idempotency/checkpoint plan, dead-letter runbook, and failure-injection test results.

## Boundaries and failure handling

Do not retry every exception uniformly; do not replay dead-letter jobs in bulk without validating blast radius and duplicate safety.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
