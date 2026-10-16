---
name: livefeed-stale-data-status-propagation
description: "Propagate feed freshness from source acquisition through cached records, map layers, and user-facing summaries."
---

# Live Feed Stale Data Status Propagation

## Purpose

Stop users from mistaking delayed or cached public signals for a current observation.

## Required inputs

Source and retrieval timestamps, polling/cache policy, UI status model, source fallback logic, and staleness tests.

## Workflow

1. Define freshness thresholds per source based on documented update cadence, not one global timeout.
2. Track observed-at, retrieved-at, and last-successful-update as distinct values where available.
3. Trace stale status through normalization, storage, layer rendering, analyst summaries, and exports.
4. Test clock skew, provider delay, cache hits, and prolonged outage with expected stale/degraded labels.

## Validation checklist

- [ ] Freshness status is computed from the correct timestamp and source policy.
- [ ] A failed refresh does not reset observed-at to the current time.
- [ ] Cached records remain marked stale after repeated failed requests.
- [ ] User-facing claims distinguish last observation from last retrieval.

## Required output

A source-specific staleness policy, propagation map, and tests for stale-state persistence.

## Boundaries and failure handling

Never relabel cached records as live simply because the browser refreshed the display; explain unknown timestamps.

## Trigger examples

- **Positive:** A source outage leaves old vessels or earthquakes looking like current data.
- **Negative:** A request to remove staleness indicators so an old record appears live.
