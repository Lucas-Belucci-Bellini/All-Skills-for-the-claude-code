---
name: voice-agent-session-cost-metering
description: "Track realtime voice-session usage and estimated cost without confusing estimates with final provider billing."
---

# Voice Agent Session Cost Metering

## Purpose

Make long-running voice sessions observable and give users predictable controls around model or session cost.

## Required inputs

Provider usage counters, session lifecycle, model pricing assumptions, user settings, and cost estimate tests.

## Workflow

1. List usage fields supplied by the provider and separate observed usage from calculated estimates.
2. Define pricing versions, units, rounding, unknown-usage states, and how model changes affect a session.
3. Test interrupted sessions, missing usage events, duplicate usage messages, and session restart.
4. Show per-session totals and warn at user-selected thresholds without exposing secrets in telemetry.

## Validation checklist

- [ ] The UI labels estimates separately from final billed amounts.
- [ ] Duplicate or missing usage events do not silently double-count or imply zero cost.
- [ ] Pricing assumptions include source/date or are configurable.
- [ ] Stopping the session closes the measurement window and prevents later sessions inheriting its totals.

## Required output

A cost-field dictionary, test scenarios, and a session-level estimate report with declared assumptions.

## Boundaries and failure handling

Do not claim exact billing from incomplete counters; do not send credentials or raw transcripts to cost telemetry.

## Trigger examples

- **Positive:** A voice feature needs session cost visibility and threshold warnings.
- **Negative:** A request to invent exact charges from partial usage events or hide a known uncertainty.
