---
name: public-feed-retention-minimization
description: "Set retention limits for cached public feeds and diagnostics based on freshness, debugging value, and privacy risk."
---

# Public Feed Retention Minimization

## Purpose

Avoid retaining detailed public telemetry longer than needed just because it was available to the application.

## Required inputs

Cache/DB schema, feed purpose, update cadence, diagnostics, export features, and deletion controls.

## Workflow

1. Inventory where provider responses and normalized records persist: memory, disk cache, logs, snapshots, exports, and browser storage.
2. Assign each class a maximum retention window and deletion trigger tied to its operational purpose.
3. Implement bounded cache size and time-based eviction, including stale data, temporary captures, and failed-import artifacts.
4. Test restart, cleanup, deletion requests, and failed writes to prove old sensitive records do not remain unintentionally.

## Validation checklist

- [ ] Every persistent store has a documented TTL or deletion rationale.
- [ ] Temporary captures and diagnostic artifacts have bounded sizes and lifetimes.
- [ ] Deleting one source's cache does not erase unrelated data or leave orphaned copies.
- [ ] Retention tests run with synthetic rather than real personal records.

## Required output

A data-store retention table, automated expiry/cleanup tests, and a list of unbounded stores.

## Boundaries and failure handling

Publicly reachable data is not automatically appropriate to retain forever or republish indefinitely.

## Trigger examples

- **Positive:** An application caches detailed feed records and captures for an unlimited time without a need.
- **Negative:** A request to preserve every historical location indefinitely regardless of source terms or user need.
