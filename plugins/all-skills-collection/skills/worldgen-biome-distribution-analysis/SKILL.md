---
name: worldgen-biome-distribution-analysis
description: Measure procedural biome distribution, adjacency, rarity, and accessibility across a stable seed corpus to detect generation bias.
---

# Worldgen Biome Distribution Analysis

## Goal

Keep procedural worlds within intended geographic diversity without forcing identical maps.

## Inputs to inspect

Biome generator, seed/version corpus, coordinate sampling rules, world bounds, and desired distribution constraints.

## Workflow

1. Define the measurement model: sampled area/volume, world region, vertical layers if relevant, and biome categories including rare/edge cases.
2. Generate a fixed corpus of deterministic seeds and sample in a way that avoids oversampling the spawn area or correlated coordinates.
3. Calculate proportion, patch size, adjacency, distance-to-feature, fragmentation, and reachable-area metrics; compare distributions against design envelopes.
4. Inspect outliers visually and with local neighborhood maps to distinguish legitimate variety from broken weighting, coordinate seams, or impossible biome isolation.
5. Change one generation rule at a time and rerun the same corpus, tracking both statistical shift and seed-to-seed diversity.

## Validation checklist

- [ ] Sampling method and world bounds are recorded and reproducible.
- [ ] Distribution is checked across multiple seeds and regions, not one sample world.
- [ ] Rarity and adjacency goals are quantified where the design requires them.
- [ ] Regression thresholds allow intended generator variety without masking severe bias.
- [ ] Changes are associated with a generator version when they materially affect world composition.

## Required output

Provide seed corpus, distribution tables/plots, outlier examples, suspected cause, and before/after results for generator changes.

## Boundaries and failure handling

Do not force every seed to have the same biome proportions; do not infer global distribution from a small spawn-area screenshot.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
