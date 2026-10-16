---
name: livefeed-provider-quota-circuit-breaker
description: "Prevent provider outages or quota exhaustion from cascading through a public-data application."
---

# Live Feed Provider Quota Circuit Breaker

## Purpose

Isolate unhealthy upstreams and make fallback or degraded states explicit instead of retrying without bounds.

## Required inputs

Provider error taxonomy, quotas, retry schedule, cache policy, fallback source options, and operational metrics.

## Workflow

1. Classify success, rate-limit, authentication, timeout, and server-failure results; define which failures count toward the breaker.
2. Set a bounded failure threshold, open duration, and limited half-open probes appropriate to the provider.
3. Specify what cached or alternate data may be served while the provider is unavailable and how its provenance is retained.
4. Simulate rate-limits, a hard outage, recovery, and repeated half-open failures while measuring calls.

## Validation checklist

- [ ] Authentication/configuration errors do not trigger endless retries.
- [ ] Open-breaker state suppresses calls until its retry window or recovery probe.
- [ ] Fallback results remain labeled with their true source and freshness.
- [ ] Metrics show breaker transitions and request suppression without secret values.

## Required output

A breaker policy per provider, fault scenarios, and evidence that request volume stays bounded during failure.

## Boundaries and failure handling

Do not rotate accounts, keys, or identities to evade quotas; honor the provider's published limits.

## Trigger examples

- **Positive:** One public endpoint outage causes a rapid retry storm across all open clients.
- **Negative:** A request to bypass rate limits using many credentials or concealed identities.
