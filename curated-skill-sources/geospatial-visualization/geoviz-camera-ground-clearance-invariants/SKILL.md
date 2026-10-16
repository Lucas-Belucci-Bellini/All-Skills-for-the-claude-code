---
name: geoviz-camera-ground-clearance-invariants
description: "Check that camera motion and target-follow modes preserve ground clearance and avoid terrain penetration."
---

# GeoViz Camera Ground Clearance Invariants

## Purpose

Prevent camera transitions from clipping through terrain or oscillating while a tracked map entity moves.

## Required inputs

Camera controller, terrain availability states, target-follow behavior, altitude/range limits, and reproducible camera paths.

## Workflow

1. Identify all camera movement entry points, including direct navigation, follow mode, scripted tours, and deep links.
2. Define clearance rules for terrain-loaded, terrain-pending, and terrain-unavailable states.
3. Replay paths with steep elevation changes, low zoom, fast-moving targets, and provider fallback conditions.
4. Check that guard corrections converge and remain subordinate to explicit user cancellation or manual camera control.

## Validation checklist

- [ ] Terrain-pending behavior has a conservative documented minimum clearance.
- [ ] Corrections do not create repeated jitter or reverse the intended camera direction.
- [ ] Follow mode releases cleanly when the target disappears or becomes stale.
- [ ] Tests cover both valid terrain and fallback-height behavior.

## Required output

A clearance invariant list, edge-case path suite, and report separating confirmed violations from provider-data limitations.

## Boundaries and failure handling

Use public geographic features and synthetic targets in test fixtures; do not build workflows for following private individuals.

## Trigger examples

- **Positive:** A 3D globe camera dives through hills when following aircraft or moving scene targets.
- **Negative:** A request to track a private person or infer their movements from public cameras.
