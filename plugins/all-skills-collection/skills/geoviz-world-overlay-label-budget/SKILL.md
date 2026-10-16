---
name: geoviz-world-overlay-label-budget
description: "Set a measurable label budget for geographic overlays so dense views remain readable and rendering cost stays bounded."
---

# GeoViz World Overlay Label Budget

## Purpose

Prevent map labels from overwhelming the scene or consuming unbounded resources as features enter the viewport.

## Required inputs

Overlay label implementation, density samples, zoom levels, priorities, rendering host, and accessibility/readability goals.

## Workflow

1. Classify labels by priority and define per-view or per-layer count budgets for each zoom band.
2. Measure current labels in sparse, dense, tilted, and overlapping-feature views.
3. Apply deterministic thinning or clustering rules and verify that high-priority labels survive.
4. Check that label creation, updates, and disposal follow the overlay owner's lifecycle.

## Validation checklist

- [ ] Budget ceilings are enforced under high-density fixtures.
- [ ] Priority ties resolve deterministically rather than flickering frame to frame.
- [ ] Labels remain legible at tested zoom and display-scale boundaries.
- [ ] World-overlay labels use the approved overlay host and never bypass source ownership.

## Required output

A label-priority policy, per-view density measurements, and tests for budget enforcement and stable selection.

## Boundaries and failure handling

Do not solve crowding by hiding legally required attribution or essential accessibility labels.

## Trigger examples

- **Positive:** A city-scale overlay renders thousands of labels and obscures data while increasing frame time.
- **Negative:** A request to label every underlying record regardless of visibility, priority, or display budget.
