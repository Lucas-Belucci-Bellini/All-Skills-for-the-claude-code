---
name: geoviz-map-source-attribution-completeness
description: "Check that basemap, terrain, and overlay sources display all required attribution in every viewing mode."
---

# GeoViz Map Source Attribution Completeness

## Purpose

Prevent source credits from disappearing during clean view, recording, export, or panel layout changes.

## Required inputs

Map-source registry, provider terms, attribution UI, full-screen/recording modes, and source-selection tests.

## Workflow

1. Inventory each map and overlay provider together with its exact attribution and display requirements.
2. Trace how source selection registers credits and how credits survive layer toggles, style changes, and viewer recreation.
3. Exercise clean view, capture mode, narrow layout, provider failure, and source-switch scenarios.
4. Compare visible credits and the expandable attribution view against the registry for each active source.

## Validation checklist

- [ ] Every active source has a non-empty attribution record when required.
- [ ] Credits remain available in capture and clean-view modes.
- [ ] Removing a layer removes only credits owned by that layer.
- [ ] Tests catch unknown providers and stale credits after source replacement.

## Required output

A provider-to-credit matrix, UI-mode test results, and list of missing or incorrectly scoped attribution entries.

## Boundaries and failure handling

A source name alone may not satisfy the provider's legal credit requirements; verify current terms instead of inferring them.

## Trigger examples

- **Positive:** Map credits disappear from the globe when recording mode hides interface controls.
- **Negative:** A request to remove required credits or make third-party imagery appear internally owned.
