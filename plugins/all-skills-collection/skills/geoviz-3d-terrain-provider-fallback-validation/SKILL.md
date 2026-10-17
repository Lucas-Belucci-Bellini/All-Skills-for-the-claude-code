---
name: geoviz-3d-terrain-provider-fallback-validation
description: "Verify terrain provider selection and fallback behavior without breaking camera safety or elevation interpretation."
---

# GeoViz 3D Terrain Provider Fallback Validation

## Purpose

Make terrain quality and availability transitions explicit for 3D navigation and scene replay.

## Required inputs

Terrain adapter registry, height query contract, fallback source, camera consumers, and test fixtures for missing elevations.

## Workflow

1. Document each terrain provider's data units, vertical datum assumptions, coverage, and failure response.
2. Create fixtures for valid heights, no coverage, timeout, malformed samples, and provider switch.
3. Verify how consumers distinguish measured/returned height from fallback or estimated height.
4. Replay camera paths with transitions between detailed terrain and fallback terrain; inspect clearance and visual jumps.

## Validation checklist

- [ ] Height units and datum assumptions are explicit at adapter boundaries.
- [ ] Unavailable terrain is distinguishable from a true zero elevation.
- [ ] Fallback transitions do not introduce NaN, Infinity, or extreme camera jumps.
- [ ] Provider changes preserve attribution and expose degraded quality.

## Required output

A terrain adapter contract, fallback test report, and documented confidence/quality states.

## Boundaries and failure handling

Do not present a fallback elevation as a verified measurement; do not promise accuracy beyond source resolution.

## Trigger examples

- **Positive:** A map must remain usable when detailed terrain data is unavailable or the configured provider is unreachable.
- **Negative:** A request to fabricate precise terrain height for an area with no supporting data.
