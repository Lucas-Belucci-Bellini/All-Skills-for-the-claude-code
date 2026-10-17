---
name: geoviz-geocoder-fallback-chain-audit
description: "Audit a multi-provider geocoder fallback chain for explicit precedence, timeouts, and offline behavior."
---

# GeoViz Geocoder Fallback Chain Audit

## Purpose

Keep place search resilient without turning provider failures into inconsistent or unexplained results.

## Required inputs

Geocoder adapters, provider order, timeout policy, cache behavior, query classes, and existing request tests.

## Workflow

1. List local, configured-key, and open-provider geocoders in their intended precedence order.
2. Map which query types each provider supports and which failures qualify for fallback versus immediate rejection.
3. Simulate timeout, rate limit, empty results, invalid JSON, offline mode, and provider outage.
4. Verify that results preserve provider identity and that fallback never masks a meaningful validation or authorization error.

## Validation checklist

- [ ] Fallback order is deterministic and covered by tests.
- [ ] Every network provider has a bounded timeout and cancellation path.
- [ ] Empty-result and provider-error states remain distinguishable.
- [ ] The selected provider and any degraded-mode condition can be inspected.

## Required output

A provider decision table, fault-injection matrix, and recommended fallback/timeout corrections.

## Boundaries and failure handling

Respect provider terms, quotas, and attribution; do not send sensitive queries to extra providers without an explicit need.

## Trigger examples

- **Positive:** Place lookup should work offline for bundled landmarks and fall back only when network geocoders are needed.
- **Negative:** A request to bypass provider access limits or conceal the use of a geocoding service.
