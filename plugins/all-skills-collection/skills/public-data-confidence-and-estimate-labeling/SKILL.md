---
name: public-data-confidence-and-estimate-labeling
description: "Distinguish direct observations, provider estimates, simulated paths, stale records, and fallback values in UI and exports."
---

# Public Data Confidence And Estimate Labeling

## Purpose

Prevent a visually polished globe from making estimated or simulated values appear as verified real-world measurements.

## Required inputs

Source metadata, derived/calculated fields, simulated layers, confidence schema, display copy, and representative exports.

## Workflow

1. Classify each displayed field as provider-observed, computed, forecast, simulated, inferred, or unknown.
2. Map each class to evidence, timestamp, confidence limitations, and user-facing language that can be preserved in exports.
3. Trace labels through tool-generated summaries, scene captures, cards, and data downloads.
4. Test source failure and mixed-quality records so fallback or estimate labels do not disappear under aggregation.

## Validation checklist

- [ ] Simulated and estimated data are not labeled live or directly observed.
- [ ] Confidence wording is supported by source documentation, not invented percentages.
- [ ] Exports preserve important caveats and source timestamps.
- [ ] Mixed-source views show per-record quality where one global badge would mislead.

## Required output

A field provenance/confidence dictionary, UI copy rules, and tests for caveat preservation.

## Boundaries and failure handling

Avoid false precision; do not convert unknown confidence into a numeric score without a defined method.

## Trigger examples

- **Positive:** A traffic path is simulated along roads but users could mistake it for direct vehicle telemetry.
- **Negative:** A request to display an estimate as confirmed intelligence to make a presentation look more convincing.
