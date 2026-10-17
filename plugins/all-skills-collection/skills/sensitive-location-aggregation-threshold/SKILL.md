---
name: sensitive-location-aggregation-threshold
description: "Choose minimum aggregation thresholds before visualizing or exporting sparse location records that could reveal individuals."
---

# Sensitive Location Aggregation Threshold

## Purpose

Prevent a small number of observations from being presented at a granularity that makes a person or sensitive site identifiable.

## Required inputs

Aggregation purpose, cell/region scheme, sample counts, location precision policy, output audience, and synthetic test data.

## Workflow

1. Identify whether each map/statistic displays individual points, small groups, or aggregated regions and who can access it.
2. Set minimum count and spatial/temporal aggregation thresholds based on the use case and documented risk assessment.
3. Test sparse regions, repeated filtering, overlapping time windows, and differencing between neighboring aggregates.
4. Suppress or coarsen output below threshold and clearly label that data was suppressed rather than displaying a misleading zero.

## Validation checklist

- [ ] Thresholds are applied after the same filters users can combine, not only before filtering.
- [ ] Repeated exports cannot trivially reconstruct suppressed cells by differencing.
- [ ] Low-count areas show a suppression/insufficient-data state.
- [ ] Thresholds are justified by a use case and reviewed when audience or data changes.

## Required output

An aggregation policy, sparse-data fixture matrix, and tests for suppression and differencing risk.

## Boundaries and failure handling

No single numeric threshold guarantees anonymity; do not use aggregates as cover for disclosing a sensitive individual's location.

## Trigger examples

- **Positive:** A public dashboard shows counts by neighborhood and some cells contain only one record.
- **Negative:** A request to lower aggregation until a specific person's presence becomes visible.
