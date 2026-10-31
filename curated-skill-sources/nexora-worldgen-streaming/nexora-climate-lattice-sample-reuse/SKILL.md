---
name: nexora-climate-lattice-sample-reuse
description: "Profile and safely reuse deterministic climate/value-noise lattice samples across NEXORA terrain columns without changing generator outputs."
---

# NEXORA Climate Lattice Sample Reuse

## Purpose

Use this workflow when profiling or designing an optimization for NEXORA generator-v3 climate and terrain sampling. The target is repeated positional-lattice corner evaluation across nearby columns and repeated climate/surface queries. The goal is to reduce redundant work while preserving exact versioned outputs, bounded memory, and safe parallel execution.

This is an optimization workflow, not evidence that a cache or chunk sampler already exists.

## Required inputs

- Current NEXORA checkout, commit SHA, and generator versions in scope.
- `engine/world/src/terrain.rs`, the caller that generates chunk columns, relevant tests, and ADR-0039/ADR-0049.
- A reproducible seed/coordinate corpus including negative coordinates and chunk/lattice boundaries.
- Baseline benchmark for both one-column sampling and complete chunk generation.
- Memory and frame-time budgets, worker model, chunk shape, and cache ownership/lifetime.
- Existing skill/catalog search results; do not duplicate deterministic-seed, stage-contract, terrain-boundary, or general cache guidance.

## Workflow

1. Confirm the active implementation before designing changes. Trace `climate()`, `surface_height()`, `field()`, `octave()`, and `corner()` in the current source; record exact callers and whether climate and surface values are requested separately or together.
2. Read ADR-0039 and ADR-0049. Treat the integer-only Q16 arithmetic, positional `SeedStream::Terrain`, channel allocation, Euclidean coordinate division, interpolation formula, and final rounding order as compatibility constraints.
3. Establish the current cost model from source. Record fields, octave counts, lattice spacings, channel ranges, four-corner reads per octave, and repeated work between climate and terrain evaluation. Do not infer a measured speedup from the read count alone.
4. Capture an unoptimized reference corpus before changing code. Include multiple fixed seeds, origin, positive and negative coordinates, exact lattice corners, points immediately on either side of lattice boundaries, and coordinates on both sides of chunk boundaries.
5. Benchmark the current public sampling path and the full chunk-generation path separately. Record toolchain, build profile, machine, sample count, warm-up, median and tail latency, throughput, and allocation/memory observations.
6. Determine whether the caller can evaluate a whole chunk-column batch together. Prefer passing an explicit per-job sampler/context over introducing hidden global state or changing the public single-column contract prematurely.
7. Design the smallest useful cache scope: one generation job, one chunk-column batch, or another demonstrably bounded unit. State when it is created, who owns it, when it is dropped, and how cancellation releases it.
8. Define a complete cache key. It must distinguish world seed, RNG stream, channel/octave identity, and lattice coordinates; include spacing or generator version when those are not already uniquely implied by the channel and owning context. Never key only by world-space position.
9. Keep the positional RNG pure with respect to lookup order. A cache hit and cache miss must return the same corner value as the uncached `corner()` function for every key.
10. Reuse corner values across adjacent columns and across climate/surface evaluation only when their full keys match. Do not conflate temperature, humidity, continentalness, erosion, ridges, or detail channels.
11. Preserve `div_euclid` and `rem_euclid` semantics for negative coordinates. Do not replace them with truncating division, signed remainder, floating-point coordinates, or platform-dependent math.
12. Preserve the original bilinear numerator and single floor division. Do not interpolate cached values at a different precision, reorder weighted-octave accumulation, or introduce intermediate rounding.
13. Keep cache memory bounded and predictable. Estimate worst-case entries from the chunk footprint and active octaves; use a fixed-capacity structure, bounded map, or deterministic batch-local storage with an explicit overflow/fallback policy.
14. Make concurrency ownership explicit. Prefer immutable sampler inputs and job-local mutable cache state; if workers share a cache, prove synchronization and avoid lock contention becoming the new bottleneck.
15. Add a reference-path comparison that evaluates the same seed/coordinates with cached and uncached implementations. Compare every climate component and surface height exactly, not approximately.
16. Test lookup-order independence by shuffling column order and repeating the same batch. Test repeated queries, cache eviction/overflow, cancellation, and concurrent jobs with different seeds.
17. Test boundary behavior at negative and positive chunk edges and at every octave's lattice boundary. Include coordinates near integer limits if the supported world-coordinate contract permits them.
18. Benchmark after warm-up using the same corpus and machine as the baseline. Report both per-column and whole-chunk results, memory overhead, cache hit rate, and tail latency; reject an optimization that saves corner calls but worsens the actual generation budget.
19. Keep generator-v1 and generator-v2 paths unchanged. If the optimized v3 path changes any generated output, stop and propose an explicit generator-version/ADR decision rather than silently updating golden fixtures.
20. Document the chosen design, rejected alternatives, measured results, memory bound, fallback behavior, test evidence, and unresolved risks. Label a cache as proposed, implemented, or verified according to evidence.

## Validation checklist

- [ ] The current caller and all relevant terrain sampling functions were inspected at a pinned NEXORA commit.
- [ ] Baseline measurements cover both isolated sampling and complete chunk generation.
- [ ] Cache keys distinguish seed, stream, channel/octave, lattice coordinates, and any version/spacing not implied by context.
- [ ] Cached corner values exactly match the uncached positional RNG result.
- [ ] Climate fields and detail/terrain channels cannot alias.
- [ ] Q16 arithmetic, Euclidean division, bilinear interpolation, and rounding order are unchanged.
- [ ] Positive, negative, lattice-edge, and chunk-edge coordinates are covered.
- [ ] Query order and worker scheduling do not affect output.
- [ ] Cache ownership, capacity, eviction, cancellation, and overflow behavior are bounded and tested.
- [ ] Generator versions 1 and 2 retain their existing behavior and fixtures.
- [ ] Benchmarks report machine, toolchain, corpus, latency distribution, hit rate, and memory overhead.
- [ ] Performance claims are limited to observed measurements and include full-chunk impact.

## Required output

Produce a short implementation proposal or review containing: source paths and commit inspected; baseline cost; exact cache key and lifetime; memory bound; reference-equivalence results; concurrency and cancellation behavior; benchmark comparison; generator-version impact; and a clear status of proposed, implemented, and verified work.

## Boundaries and failure handling

Do not introduce a process-global unbounded cache. Do not change generator output to make a cache easier to implement. Do not use floating point as a shortcut around fixed-point sampling. A cache miss, capacity limit, or disabled optimization must safely fall back to the reference computation.

If no representative chunk-generation benchmark exists, report that as a prerequisite and do not claim the optimization is worthwhile. If equivalence fails, retain the reference path, identify the first differing seed/coordinate/channel, and stop before updating golden outputs. Do not claim tests, benchmarks, or runtime validation that were not executed.

## Trigger examples

- **Positive:** A NEXORA task profiles generator-v3 terrain sampling and finds repeated lattice-corner work across columns.
- **Positive:** A chunk-generation refactor wants to share climate samples between terrain height and biome evaluation while preserving exact output.
- **Positive:** Reviewers need to evaluate a bounded, parallel-safe sample cache against the uncached positional RNG reference.
- **Negative:** The task only changes biome selection rules or climate curves without addressing repeated lattice sampling.
- **Negative:** The task needs general seed reproducibility, generator migration, or worldgen stage ordering; use the dedicated existing workflow instead.
- **Negative:** A performance improvement is proposed without a baseline or exact output comparison.
