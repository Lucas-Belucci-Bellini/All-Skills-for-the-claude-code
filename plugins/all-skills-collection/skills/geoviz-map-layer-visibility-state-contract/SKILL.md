---
name: geoviz-map-layer-visibility-state-contract
description: "Define and test the lifecycle contract between layer visibility controls and the underlying data/render resources."
---

# GeoViz Map Layer Visibility State Contract

## Purpose

Ensure each layer toggle changes only its intended source and does not leak listeners, selections, or unrelated overlays.

## Required inputs

Layer catalog, visibility state model, layer initialization/disposal hooks, entity-selection context, and UI tests.

## Workflow

1. Map the layer ID to its visibility state, source owner, rendered objects, and selection-context registrations.
2. Specify how enable, disable, re-enable, and destroy differ; document whether loaded data is retained on disable.
3. Test two layers with overlapping geographic extents and independent visibility changes.
4. Exercise initialization failure, repeated toggles, and removal while requests or selection callbacks are pending.

## Validation checklist

- [ ] Layer identifiers are stable and unique within a viewer context.
- [ ] Disable removes visible output and owned listeners without deleting another layer's state.
- [ ] Repeated enable calls do not create duplicate fetches or render resources.
- [ ] Destroy is permanent and makes late async callbacks inert.

## Required output

A lifecycle/visibility state diagram, layer contract tests, and ownership-specific cleanup findings.

## Boundaries and failure handling

Do not infer ownership from visual overlap; a cleanup action must target registered resources for that layer only.

## Trigger examples

- **Positive:** Toggling a public-data overlay leaves ghost markers or clears selection from an unrelated layer.
- **Negative:** A request to secretly keep a hidden layer active after the UI indicates it is disabled.
