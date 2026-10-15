---
name: procedural-content-regression-testing
description: "Tests procedural content generators across seeds and versions. Use when terrain, loot, dungeons, creatures, recipes, or generated missions must remain valid after rule changes."
---

# Procedural Content Regression Testing

## Use when
A generator passes a few screenshots but creates unreachable spaces, broken recipes, empty regions, or balance outliers for rare seeds.

## Workflow
1. Define validity invariants and distribution metrics for generated outputs, including rare and boundary cases.
2. Freeze a curated set of seed/version fixtures and add randomized sample seeds with recorded reproduction data.
3. Check connectivity, resource bounds, object overlap, progression reachability, and references between generated entities.
4. Compare distribution shifts between versions and investigate failures with minimized deterministic seeds.

## Required output
A seed corpus, invariant suite, distribution report, and minimized regression fixtures.

## Validation
- Tests detect invalid outputs as well as large statistical shifts.
- Every failure includes seed, generator version, and enough config to reproduce.
- Expected distribution changes are reviewed rather than hidden by broad tolerances.

## Guardrails
Do not treat one visually pleasing seed as proof that a procedural generator is robust.
