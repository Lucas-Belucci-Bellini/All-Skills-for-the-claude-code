---
name: livefeed-provider-adapter-contract
description: "Specify a common contract for live public-data adapters, including normalization, cancellation, attribution, and failure states."
---

# Live Feed Provider Adapter Contract

## Purpose

Make heterogeneous public feeds interchangeable without losing critical freshness or source metadata.

## Required inputs

Provider implementations, canonical entity schema, lifecycle hooks, error taxonomy, and integration tests.

## Workflow

1. Define required fields and optional capabilities for an adapter, including source ID, source timestamp, retrieval time, and quality status.
2. Map each provider's raw payload into a canonical record using a pure normalization boundary.
3. Define cancellation, timeout, no-data, rate-limit, stale-data, and malformed-response behavior.
4. Create contract tests that run against fixtures for every adapter and compare emitted records and lifecycle effects.

## Validation checklist

- [ ] All adapters expose the same success and failure categories.
- [ ] Provider-specific fields are preserved only where intentionally supported.
- [ ] Cancellation prevents late results from updating destroyed consumers.
- [ ] Adapter tests do not require real credentials or unpredictable live endpoints.

## Required output

An adapter interface contract, fixture-based conformance tests, and a provider capability table.

## Boundaries and failure handling

Do not scrape around access controls or misrepresent provider data as independently verified.

## Trigger examples

- **Positive:** Multiple public feeds provide similar entities but each integration handles errors and timestamps differently.
- **Negative:** A request to bypass a provider's API controls or impersonate a different client.
