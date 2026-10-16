---
name: livefeed-runtime-source-health-dashboard
description: "Build a bounded source-health view from feed freshness, error rates, latency, and breaker state."
---

# Live Feed Runtime Source Health Dashboard

## Purpose

Help operators distinguish an empty region from a broken data source without confusing source-health metrics with real-world truth.

## Required inputs

Provider metrics, health-state definitions, dashboard constraints, stale-data policy, and redaction requirements.

## Workflow

1. Choose a small metric set: last success, freshness age, error class counts, request latency, and breaker status.
2. Define health states and thresholds per provider, with explicit unknown state when telemetry is unavailable.
3. Aggregate only bounded-cardinality labels and inspect how the dashboard behaves with many source IDs.
4. Test normal, stale, quota-limited, unavailable, and recovered states against synthetic provider traces.

## Validation checklist

- [ ] A zero-record feed is distinguishable from a failed feed.
- [ ] Metrics do not label a provider healthy solely because requests return HTTP success.
- [ ] Cardinality and retention are bounded.
- [ ] Dashboard fields do not expose tokens or detailed user query histories.

## Required output

A health-state definition, minimal metric schema, dashboard test matrix, and missing-observability report.

## Boundaries and failure handling

Provider health describes the feed pipeline, not whether a public event or entity is trustworthy in reality.

## Trigger examples

- **Positive:** Users cannot tell whether missing aircraft data means no aircraft or an upstream outage.
- **Negative:** A request to infer sensitive activity from absence of a public feed without source-health context.
