---
name: geo-privacy-location-precision-budget
description: "Set a location-precision budget for logs, analytics, exports, and shared scenes based on the feature's real need."
---

# Geo Privacy Location Precision Budget

## Purpose

Minimize exposure of precise geographic details when coarse location is sufficient for diagnostics or collaboration.

## Required inputs

Data flow map, location fields, logging and export paths, feature purpose, retention rules, and user-facing sharing options.

## Workflow

1. Classify each location use by required precision: display, operational debugging, aggregate analysis, or explicit user share.
2. Choose the least precise representation that still satisfies that use, and document where exact coordinates remain necessary.
3. Apply precision reduction before logs/analytics are emitted, not only when displayed in the UI.
4. Test exports, error reports, URLs, and caches with synthetic sensitive coordinates to verify the policy end to end.

## Validation checklist

- [ ] Every exact-coordinate flow has a documented purpose and owner.
- [ ] Diagnostic logs are coarsened or redacted by default.
- [ ] User-confirmed scene sharing is separate from background telemetry.
- [ ] Rounding does not imply anonymity when combined with other identifying fields.

## Required output

A precision-by-purpose table, transformed sample outputs, and tests covering every identified egress path.

## Boundaries and failure handling

Coarsening is a minimization measure, not a guarantee of anonymization; avoid collecting exact locations without necessity.

## Trigger examples

- **Positive:** A health or performance report needs a general region but currently logs full coordinates.
- **Negative:** A request to collect or export exact private locations without a feature need or user awareness.
