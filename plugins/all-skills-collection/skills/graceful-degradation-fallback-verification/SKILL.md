---
name: graceful-degradation-fallback-verification
description: "Verify that a service preserves safe core operations and clearly exposes reduced capability when optional dependencies or features fail."
---

# Graceful Degradation Fallback Verification

## Purpose

Check that dependency outages reduce capability in documented ways instead of returning misleading success or corrupting state.

## Required inputs

Service capability map, critical/optional dependencies, fallback rules, consistency needs, health signals and error-response contract.

## Workflow

1. Separate core operations from optional enhancements and describe acceptable behavior for each missing dependency.
2. Identify caches, defaults, alternate providers and stale-data fallbacks; specify freshness and correctness limits.
3. Test outage, latency, partial response, corrupted cache, recovery and conflicting fallback data.
4. Ensure responses, health signals and telemetry agree about reduced capability; authorization must remain enforced.
5. Verify recovery does not duplicate writes, lose state or cause abrupt load amplification.

## Validation checklist

- [ ] Each fallback has a trigger, maximum staleness and recovery condition.
- [ ] Core correctness, authorization and persistence invariants remain enforced.
- [ ] Full success is not reported when user-visible capability is missing.
- [ ] Fallback activation and duration are observable.
- [ ] Recovery does not replay side effects unintentionally.

## Required output

A dependency/fallback matrix, test evidence, known degraded behaviors and recovery criteria.

## Boundaries and failure handling

Do not invent stale values or ignore authorization failures to preserve apparent uptime. If no safe fallback exists, prefer a clear bounded failure.

## Trigger examples

- **Positive:** Recommendations may fail while authenticated account settings should remain available.
- **Negative:** Tuning a game engine's visual quality under memory pressure.
