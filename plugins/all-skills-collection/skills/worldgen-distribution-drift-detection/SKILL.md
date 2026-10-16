---
name: worldgen-distribution-drift-detection
description: Detect changes in biome, structure, resource, elevation, and feature distributions across procedural world-generator versions.
---

# Worldgen Distribution Drift Detection

## Goal

Catch large-scale world-generation drift that may be invisible in a handful of golden chunks or a single seed.

## Inputs to inspect

Seed corpus, generator version, spatial sampling policy, biome/ore/structure maps, elevation statistics and design targets.

## Workflow

1. Define measurable distributions and design bounds for key world properties, separating intended targets from merely observed historical values.
2. Build a reproducible seed-and-coordinate sample that covers dimensions, climate regions, negative/positive coordinates, edges and rare feature conditions.
3. Compute summary statistics and spatial measures such as biome proportion, elevation quantiles, structure spacing and resource density per comparable region.
4. Compare generator versions with tolerances and confidence intervals where sampling noise applies; inspect localized drift separately from global changes.
5. Require a reviewed explanation for significant drift and preserve sample seeds plus report artifacts in CI or release qualification.

## Validation checklist

- [ ] Comparisons use identical seeds, regions, sampling rules and compatible generator inputs.
- [ ] Rare features have enough targeted samples to avoid false confidence from a small random corpus.
- [ ] Spatial clustering/spacing is examined where totals alone can look normal.
- [ ] Thresholds distinguish expected seeded variation from meaningful generator-wide changes.

## Required output

A distribution baseline, reproducible sample manifest, drift report and thresholds for worldgen release review.

## Boundaries and failure handling

Do not treat historical output as a perfect design target; intentional balance changes must update targets with rationale.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
