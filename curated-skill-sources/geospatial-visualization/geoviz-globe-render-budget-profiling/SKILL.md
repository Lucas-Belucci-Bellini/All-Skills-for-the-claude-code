---
name: geoviz-globe-render-budget-profiling
description: "Profile a 3D globe's frame time, draw load, and provider cost against repeatable view-based performance budgets."
---

# GeoViz Globe Render Budget Profiling

## Purpose

Identify performance regressions caused by layers, terrain, labels, or camera transitions using comparable evidence.

## Required inputs

Representative views, hardware/browser notes, frame-time instrumentation, enabled layer sets, and performance thresholds.

## Workflow

1. Define a small canonical view set: global overview, dense urban region, tilted terrain view, and active tracked-object view.
2. Capture cold and warm runs with documented hardware, cache, network, and provider configuration.
3. Compare median and tail frame time along with request count, render-resource counts, and memory trend.
4. Isolate one layer or rendering feature per experiment and rerun the same view set.

## Validation checklist

- [ ] The benchmark controls for warm cache and startup effects.
- [ ] Results report median and tail latency rather than one best frame.
- [ ] No API key or personal configuration is written into benchmark artifacts.
- [ ] A regression is linked to a changed component or clearly marked unlocalized.

## Required output

A reproducible performance report, baseline comparison, and prioritized list of verified bottlenecks.

## Boundaries and failure handling

Do not treat a single machine's numbers as universal minimum requirements; do not benchmark with unauthorized provider traffic.

## Trigger examples

- **Positive:** A new globe layer makes dense areas stutter and the team needs a reproducible regression baseline.
- **Negative:** A request for a performance claim without repeatable measurements or environment details.
