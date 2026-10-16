---
name: geoviz-camera-state-restoration-contract
description: "Validate camera pose, orientation, zoom, and active-layer restoration across scene navigation and reloads."
---

# GeoViz Camera State Restoration Contract

## Purpose

Make camera restoration predictable when users leave a map view, follow a feature, and return to the prior context.

## Required inputs

Camera-state schema, navigation events, layer state, supported browsers, and existing restoration tests.

## Workflow

1. Inventory persisted camera fields (position or target, heading, tilt, range/zoom, north-up mode) and mark which are optional.
2. Trace save, navigation-away, restore, and reset paths; identify which component owns each state field.
3. Create round-trip cases for ordinary views, oblique views, invalid values, and missing fields; compare normalized state rather than raw serialization.
4. Verify that a failed restore falls back to a documented safe overview without leaving stale selection or visibility state.

## Validation checklist

- [ ] A valid camera state round-trips within declared numeric tolerances.
- [ ] Missing optional fields use explicit defaults rather than accidental zeroes.
- [ ] Reset-to-overview clears follow-mode and restores the documented baseline.
- [ ] Restoration failures are observable and do not block map startup.

## Required output

A camera-state field table, round-trip test matrix, tolerance policy, and defect list mapped to owners.

## Boundaries and failure handling

Do not silently overwrite a newer user camera action with a delayed restore. Avoid asserting pixel-identical output across different GPU/browser combinations.

## Trigger examples

- **Positive:** A globe app loses heading or tilt when returning from a tracked feature and needs a state restoration contract.
- **Negative:** A request only to redesign camera controls or add new map features without checking saved-state behavior.
