---
name: nexora-biome-climate-weight-blending
description: "Designs deterministic, normalized biome transition weights from NEXORA climate and terrain context without hard biome borders or chunk seams."
---

# NEXORA Biome Climate Weight Blending

## Purpose

Use this workflow when designing or implementing NEXORA's biome selection and transition layer: converting climate, elevation, slope, hydrology, geology, and dimension context into stable biome weights. The goal is gradual ecological transitions, reproducible results, and bounded evaluation cost—not merely smoothing biome IDs after selection.

The current NEXORA biome plan describes climate-driven biome context and gradual transitions, while the current Rust world crate exposes generator-v3 climate fields. Do not assume the full Biome Engine is implemented: verify the current checkout and distinguish planned data from runtime behavior.

## Required inputs

- Pinned NEXORA commit and the current engine/world source tree.
- docs/plans/BIOME ENGINE.md, engine/world/src/terrain.rs, relevant world/chunk code, and applicable ADRs.
- Existing biome, climate, transition, boundary, and distribution skills/catalog entries.
- Candidate biome definitions, climate ranges, transition widths, and target world settings.
- Deterministic seed/reproduction contract and chunk coordinate conventions.
- Expected memory, CPU, generation-time, and streaming budgets.

## Workflow

1. Inspect the current implementation and classify each component as implemented, planned, or absent. Trace terrain::climate(seed, x, z) and identify the actual future/current caller for biome classification; do not invent a module or API.
2. Extract the authoritative BiomeContext fields from the plan and implementation. Separate continuous measurements (temperature, humidity, rainfall, elevation, slope, depth, continentalness, water availability) from categorical constraints (dimension, geology class, world phase).
3. Define each biome family's valid domain using documented ranges or curves. Record units, fixed-point scale, inclusive/exclusive boundaries, clamping, and missing-data behavior. Avoid arbitrary coordinate rectangles and undocumented magic thresholds.
4. Separate hard eligibility constraints from soft affinity. Dimension incompatibility, impossible depth bands, or unsupported geology may exclude a biome; climate proximity and ecological suitability should normally contribute continuous weights.
5. Choose an explicit distance/affinity model for each continuous input. Normalize units before combining dimensions, document per-axis influence, and justify any nonlinear curve or seasonal adjustment. Do not let a high-magnitude input dominate merely because its numeric scale is larger.
6. Compute candidate raw weights in a stable, deterministic order. Use integer/fixed-point arithmetic when required by the active world-generation compatibility contract; if floating point is proposed, document platform reproducibility implications and keep it out of seed-critical generation unless explicitly accepted.
7. Normalize eligible weights with a defined zero-sum fallback, rounding policy, and exact-sum invariant. For fixed-point weights, specify the total (for example, 65,535 or 65,536), remainder distribution, and deterministic tie-break key so results do not depend on hash-map iteration order.
8. Define the selection contract separately from the blend contract. The dominant biome may drive gameplay/ecology while normalized weights drive surface materials, vegetation density, ambience, or visual transition. Do not silently let visual blending change spawn eligibility or resource rules.
9. Make transition width depend only on explicit world/context parameters. Avoid a universal blur radius that erases small biomes, coastlines, rare landmarks, or sharp geological boundaries. Document minimum feature size and how rare biome regions survive blending.
10. Define vertical and depth behavior independently from horizontal climate blending. Ensure caves, ocean depth bands, mountain elevation bands, and dimension-specific biomes cannot leak into incompatible layers.
11. Preserve shared-border consistency. Adjacent chunks evaluating the same world coordinate and context must produce identical raw weights, normalized weights, and dominant biome. Never seed a transition from chunk-local RNG or local array order.
12. Test negative coordinates, exact chunk edges, exact climate thresholds, just-below/just-above thresholds, zero eligible candidates, one eligible candidate, equal affinities, and extreme clamped inputs.
13. Test normalization properties: every weight is non-negative; excluded candidates receive zero; the sum equals the declared fixed-point total; repeated evaluation is identical; deterministic tie-breaks select the same result.
14. Test ecological continuity separately from visual continuity. Measure discontinuities in vegetation/resource/spawn decisions at borders, but preserve intentional discrete gameplay rules where the design requires one authoritative biome.
15. Build deterministic diagnostic maps for dominant biome, each major weight, transition width, and exclusion reason using fixed seeds. Keep the diagnostic sampling resolution and color legend documented so map comparisons are meaningful.
16. Benchmark representative chunk batches, not only a single coordinate. Record candidate count, context construction cost, allocations, median/tail latency, memory, and impact on the complete world-generation budget.
17. Add regression fixtures for a stable seed corpus and adjacent chunk pairs. If biome definitions or thresholds are persisted, define a content/generator versioning and migration policy before changing them.
18. Document unresolved design decisions and propose the smallest implementation slice. Do not implement speculative hundreds-of-biomes registries before the context, normalization, and boundary contracts are testable.

## Validation checklist

- [ ] Current runtime implementation was distinguished from the BIOME ENGINE plan.
- [ ] Every context field has a unit, range, and source of truth.
- [ ] Hard exclusions and soft affinities are separate and documented.
- [ ] Weight arithmetic, normalization total, rounding, and tie-breaking are deterministic.
- [ ] Zero-candidate and zero-sum fallbacks are explicit and tested.
- [ ] Dominant-biome gameplay selection is separate from visual/material blending.
- [ ] Horizontal, vertical, cave, ocean-depth, and dimension constraints are respected.
- [ ] Shared coordinates produce identical results across chunk boundaries and evaluation order.
- [ ] Negative coordinates and exact threshold/boundary cases are covered.
- [ ] Diagnostic maps and benchmark corpus are reproducible.
- [ ] Performance and memory are measured at chunk-batch scale.
- [ ] Versioning/migration impact is documented where persisted world behavior changes.

## Required output

Produce a design or implementation review containing: pinned commit; implemented/planned boundary; context schema and units; eligibility rules; affinity functions; normalization and tie-break contract; boundary/vertical behavior; deterministic fixtures; diagnostic map evidence; benchmark results; versioning impact; and status marked proposed, implemented, or verified.

## Boundaries and failure handling

Do not use chunk-local random values, unordered map iteration, or unstable floating-point behavior to choose biome weights. Do not normalize an empty candidate set by dividing by zero. Do not erase rare/small biomes through an undocumented blur. Do not conflate visual surface blending with gameplay ownership, fauna spawning, resource distribution, or persistence.

If the current repository has no biome runtime yet, deliver a staged contract and tests/prototype proposal rather than claiming integration. If neighboring chunks disagree, identify the first coordinate and context field that differs; do not hide the seam with a larger blend radius. Never claim runtime tests, generated maps, or performance improvements that were not executed.

## Trigger examples

- **Positive:** A NEXORA task implements climate-driven biome selection and needs normalized, deterministic transition weights.
- **Positive:** Reviewers need to prevent visible biome seams while preserving small biomes and authoritative gameplay ownership.
- **Positive:** A biome blend refactor needs exact-sum fixed-point weights, deterministic tie-breaking, and negative-coordinate fixtures.
- **Negative:** The task only changes climate noise generation or reuses lattice samples; use the dedicated climate sampling workflow.
- **Negative:** The task only checks shared terrain density/mesh borders without biome affinity or weight normalization.
- **Negative:** The task concerns biome population balance or distribution statistics without implementing or validating transition weights.
