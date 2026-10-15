---
name: web-performance-budget-audit
description: Set and verify frontend performance budgets for JavaScript, rendering, network requests, and user-centric loading metrics.
---

# Web Performance Budget Audit

## Goal

Prevent bundle growth and interaction regressions from accumulating unnoticed.

## Inputs to inspect

Build output, route chunks, lab/field metrics, key journeys, device/network targets, and CI config.

## Workflow

1. Define critical routes and interactions with supported device/network profiles and thresholds for bundle, loading, responsiveness, and layout stability.
2. Capture route bundle composition and baseline metrics, separating transfer, parse/execute, image/font costs, and server latency.
3. Trace costly assets, route chunks, third-party scripts, and layout shifts on real user journeys.
4. Apply one targeted optimization and repeat the same scenario; check that lazy loading or caching did not delay critical content.
5. Automate stable budget checks in CI and compare lab thresholds with field distributions when real-user metrics are available.

## Validation checklist

- [ ] Budgets name the route/journey and device/network profile.
- [ ] Measurements distinguish lab data from production data.
- [ ] Third-party code and media count toward actual user load.
- [ ] Optimizations preserve functionality and accessibility.
- [ ] Exceptions have an owner and a review/expiry date.

## Required output

Produce a route budget table, baseline, prioritized regressions, verified optimizations, and CI/field monitoring plan.

## Boundaries and failure handling

Do not promise universal load time across every device; do not optimize scores while ignoring actual interaction latency.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
