---
name: worldgen-feature-overlap-validation
description: Validate placement constraints and conflict resolution for structures, ores, biome features and other procedural world-generation passes.
---

# World Generation Feature Overlap Validation

## Goal

Ensure independently scheduled generation features compose predictably rather than overlapping illegally or varying with execution order.

## Inputs to inspect

Generation stages, placement rules, feature priority, seeded placement candidates, chunk-border policy and generated-world fixtures.

## Workflow

1. Inventory feature classes and define their footprint, minimum spacing, biome/dimension constraints, priority and permitted overlap categories.
2. Trace candidate discovery and reservation across chunk boundaries, including how partially known neighboring chunks influence decisions.
3. Generate controlled seeds with adversarial placement density and record conflicts, rejected placements, clipping and cross-chunk disagreement.
4. Re-run the same seed with different chunk order and worker parallelism to discover order-dependent conflict outcomes.
5. Specify stable tie-breaking or reservation ownership and add golden cases around accepted/rejected placements and boundary crossings.

## Validation checklist

- [ ] Conflicting placements resolve according to a documented priority or compatibility rule.
- [ ] Chunk generation order does not alter results when the engine promises order-independent output.
- [ ] Structures crossing chunk boundaries reserve/check their full footprint consistently.
- [ ] Rejected candidates are diagnosable by rule instead of silently disappearing.

## Required output

A feature interaction matrix, seed-based conflict report, deterministic resolution policy and regression seeds.

## Boundaries and failure handling

Do not fix overlap defects by globally reducing feature density without checking intentional distribution and biome constraints.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
