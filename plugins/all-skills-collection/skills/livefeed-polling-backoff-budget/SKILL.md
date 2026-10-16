---
name: livefeed-polling-backoff-budget
description: "Design bounded polling, jitter, and retry budgets for feeds that use periodic HTTP requests."
---

# Live Feed Polling Backoff Budget

## Purpose

Reduce unnecessary network load while keeping update delay within an explicit product tolerance.

## Required inputs

Poll intervals, provider quotas, retryable errors, data freshness goals, client counts, and cancellation semantics.

## Workflow

1. Separate normal refresh cadence from error retry cadence and declare provider-specific request budgets.
2. Choose capped exponential backoff with jitter for retryable failures and define when to stop automatic retries.
3. Model expected request volume under multiple open tabs or viewers and include reconnect/reload bursts.
4. Test success recovery, rate-limit responses, server errors, hidden-tab behavior, and explicit cancellation.

## Validation checklist

- [ ] Backoff is capped and jittered where synchronized clients could create a burst.
- [ ] Rate-limit responses respect provider guidance instead of retrying immediately.
- [ ] Visibility and lifecycle changes do not create duplicate poll loops.
- [ ] Retry metrics distinguish failed attempts from scheduled refreshes.

## Required output

A polling schedule, expected request-volume estimate, retry-state table, and regression tests.

## Boundaries and failure handling

Do not use aggressive polling to infer events beyond the source's intended public update frequency.

## Trigger examples

- **Positive:** A live map creates repeated requests during an outage or overwhelms a public endpoint after a reload.
- **Negative:** A request to increase polling beyond provider limits or evade rate-limiting.
