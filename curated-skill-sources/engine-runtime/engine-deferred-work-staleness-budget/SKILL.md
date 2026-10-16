---
name: engine-deferred-work-staleness-budget
description: Set and validate maximum staleness budgets for deferred updates, cached derived data, and background refreshes.
---

# Engine Deferred Work Staleness Budget

## Goal

Use deferred computation safely by specifying how old a result may be before gameplay, rendering, or authoritative simulation must refresh it.

## Inputs to inspect

Deferred task queues, derived-data consumers, timestamp/revision metadata, priority classes and observed update lag.

## Workflow

1. Inventory deferred results and identify whether consumers need freshness by elapsed time, source revision, tick index or world generation.
2. Set per-consumer staleness limits and specify behavior when the limit is exceeded: promote priority, compute synchronously, return an explicit stale status or block.
3. Stress backlog, rapid source changes and consumer demand spikes to observe stale-result age and whether deadlines remain bounded.
4. Check that coalescing, cancellation and cache reuse preserve version correctness and cannot make an old result appear fresh by resetting a timestamp.
5. Add staleness histograms and regression scenarios that trigger the selected fallback once the declared limit is crossed.

## Validation checklist

- [ ] Freshness is measured against the source revision or clock that actually determines validity.
- [ ] A refresh cannot publish an older source version after a newer update exists.
- [ ] Urgent consumers have a documented fallback when deferred work exceeds its budget.
- [ ] Telemetry reports both stale age and the number of consumers using stale results.

## Required output

A consumer freshness matrix, fallback state machine, staleness telemetry and regression thresholds.

## Boundaries and failure handling

Do not silently serve stale authoritative state when the consumer requires current data; distinguish acceptable visual lag from correctness requirements.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
