---
name: engine-debug-draw-observability
description: Design runtime debug overlays and draw primitives that expose spatial, simulation, and performance state without altering gameplay behavior.
---

# engine debug draw observability

## Goal

Make engine state inspectable during development with overlays that are safe, filtered, and cheap when disabled.

## Inputs to inspect

Rendering debug hooks, physics data, AI/nav information, chunk streaming states, frame metrics, and developer toggles.

## Workflow

1. List questions developers need to answer during failures: entity bounds, collision contacts, ray paths, navigation nodes, chunk states, job queue pressure, and frame timings.
2. Define a small debug-draw interface with stable categories, colors/labels, lifetime rules, world/local coordinate handling, and filtering by entity or region.
3. Collect debug primitives from subsystem snapshots instead of mutating gameplay state or calling heavy queries as a side effect of rendering the overlay.
4. Set caps, sampling, and aggregation for dense scenes so observability itself cannot overwhelm rendering or memory.
5. Test toggling overlays during gameplay, unloaded object references, paused simulation, headless mode, and release builds where debug drawing is absent.

## Validation checklist

- [ ] Enabling or disabling visualization does not change simulation results.
- [ ] Debug data is safe against stale entity/resource handles.
- [ ] High-volume overlays are bounded and can filter by subsystem or entity.
- [ ] Metrics include units and sample windows; colors are not the only way to distinguish states.
- [ ] Headless and release configurations handle debug requests intentionally.

## Required output

Provide a debug-overlay specification, data ownership rules, category/toggle map, performance limits, and representative diagnostic workflows.

## Boundaries and failure handling

Do not use debug rendering as a reason to access internal mutable state unsafely; do not ship sensitive debug information by default in production.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
