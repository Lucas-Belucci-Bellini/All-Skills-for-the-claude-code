---
name: nexora-climate-multiscale-field-coherence
description: "Audits spatial-scale contracts for NEXORA climate and environmental fields, including region aggregation, cross-resolution continuity, and derived biome inputs."
---

# NEXORA Climate Multiscale Field Coherence

## Purpose

Use this workflow when designing, implementing, reviewing, or debugging the spatial representation of NEXORA climate and environmental fields across voxel, chunk, region, continent, and planetary scales.

The goal is to prevent discontinuities, contradictory values, unstable aggregation, and accidental simulation-at-voxel cost. This skill is about **spatial scale and data contracts**. It does not replace world-time authority, offline temporal catch-up, climate lattice sampling, or biome-weight blending.

This is an audit and engineering workflow. The reviewed plans describe intended architecture; do not assume a complete runtime Climate Engine exists.

## Evidence to inspect first

Pin the NEXORA commit and inspect:

- `docs/plans/CLIMATE and ATMOSPHERE.md`, especially Environmental State, Climate Field, Climate Resolution, Weather State, and regional aggregation.
- `docs/plans/TIME AND CALENDAR SYSTEM.md` for the single authoritative world clock and persistent time contract.
- `engine/world/src/terrain.rs` for the implemented generator-v3 column climate fields, Q16 representation, octave spacing, channel allocation, and deterministic integer interpolation.
- `engine/world/src/world.rs` for world bounds, chunk shape, generator version, and world descriptor context.
- Existing climate lattice reuse, biome blending, weather-time authority, temporal LOD, and chunk-boundary skills.

Classify every relevant feature as **implemented**, **planned**, **partially implemented**, or **unknown**. Cite exact files and symbols in the resulting review.

## Spatial contract workflow

1. **Name each field and its meaning.** Separate climate statistics, instantaneous weather, atmospheric properties, terrain-derived inputs, and presentation-only values. Record units, valid range, coordinate frame, vertical applicability, and whether the field is authoritative or derived.
2. **Assign one owning resolution.** For each field, select the coarsest scale that preserves the behavior it must represent. A voxel-level query may sample or interpolate a regional field; it must not silently create a second independently simulated climate state.
3. **Define the scale hierarchy explicitly.** Document parent-child relationships such as planetary baseline → continental climate → regional weather → local microclimate. State which values are inherited, aggregated, interpolated, or independently simulated at each boundary.
4. **Specify aggregation semantics per field.** Do not use one generic average for every quantity. Distinguish area-weighted scalar means, extrema, categorical modes, vector aggregation, accumulated quantities, rates, and conserved totals. Define weights, units, missing-data behavior, and deterministic tie-breaking.
5. **Keep intensive and extensive quantities distinct.** Temperature, pressure, and concentration are not interchangeable with total water mass, precipitation volume, or accumulated energy. When converting resolution, preserve the relevant physical or gameplay quantity rather than blindly preserving the numeric value.
6. **Define parent-child reconciliation.** When child regions are loaded, updated, or unloaded, specify whether their state replaces, refines, or contributes to the parent summary. Prevent double counting when both parent aggregates and child records are present.
7. **Make boundaries deterministic.** The same world coordinate and world state must resolve to the same field sample regardless of which chunk, region, worker, or query order requested it. Use global coordinates and stable ownership; do not seed field identity from chunk-local iteration order.
8. **Prove seam continuity.** Adjacent chunks and neighboring regions must agree at shared sample positions. For interpolated fields, define the support halo, edge samples, interpolation domain, and behavior when a neighboring region is unavailable.
9. **Specify resolution transitions.** When a region changes LOD or loads higher-resolution data, define a transition policy that avoids visible jumps and gameplay discontinuities. Blend only compatible representations of the same field and timestamp; do not average states from different world times.
10. **Separate spatial conversion from temporal evolution.** A downsample or upsample must not advance weather, consume simulation ticks, or create events. Temporal advancement belongs to the authoritative world clock and its subsystem scheduler.
11. **Handle missing and stale children explicitly.** Define whether to use a parent estimate, mark the sample unavailable, retain a last-known value, or request refinement. Include freshness/version metadata so stale child data cannot overwrite newer parent state.
12. **Bound cost and storage.** Estimate samples per region, active resolution levels, interpolation halo, cache lifetime, and worst-case memory. Set admission/eviction rules and ensure fine resolution is not retained merely because a renderer sampled it once.
13. **Version the field schema.** Persist field identity, units/schema version, resolution metadata, and any algorithm version needed to interpret stored values. Define migration and fallback behavior for older saves.
14. **Expose provenance and diagnostics.** Make it possible to inspect the source scale, parent region, source timestamp, interpolation/aggregation method, and stale/missing status behind a sampled value without logging every voxel query.
15. **Keep consumers decoupled.** Biome selection, hydrology, ecology, agriculture, physics, and rendering consume documented field contracts. They must not each invent their own climate authority or mutate shared climate state through presentation queries.

## Validation matrix

Build tests around the actual field semantics and active implementation:

- **Scale invariance:** a constant field remains constant through every supported downsample/upsample path.
- **Weighted aggregation:** known child areas produce the expected parent value; unequal region sizes are not treated as equal weights.
- **Conservation:** extensive totals such as accumulated precipitation or water volume remain conserved within the documented rounding tolerance.
- **Vector correctness:** wind aggregation preserves direction and magnitude semantics; averaging opposite vectors does not create a false directional result.
- **Categorical stability:** biome/classification tie cases use a stable documented ordering.
- **Shared boundaries:** both sides of chunk and region edges return identical values at shared coordinates.
- **Negative coordinates:** floor/Euclidean division and region ownership remain correct west/south of the origin.
- **Load-order independence:** loading children in different orders yields the same authoritative aggregate.
- **LOD handoff:** fine-to-coarse and coarse-to-fine transitions do not double count, jump, or mix timestamps.
- **Missing data:** absent, stale, corrupt, and partially loaded children follow explicit fallback behavior.
- **Persistence:** save/reload and schema migration preserve field identity and the documented aggregate.
- **Budget:** worst-case region/sample counts stay within declared memory and update budgets.

Use deterministic fixtures with hand-computable values before large generated worlds. Add property-based or randomized tests only with fixed seeds and reproducible failure output.

## Current NEXORA observations

At the reviewed snapshot, `engine/world/src/terrain.rs` implements a deterministic generator-v3 `Climate` value per horizontal column with continentalness, erosion, ridges, temperature, and humidity. Its fields use Q16 integer value-noise octaves and the positional `Terrain` stream. This is not evidence of a persisted, multiresolution regional Climate Engine.

The climate/atmosphere plan explicitly proposes voxel → chunk → region → continent → planet scales and says environmental state should use an appropriate scale rather than necessarily being stored per voxel. Treat regional aggregation, weather cells, microclimate storage, and multiscale reconciliation as planned until current runtime source proves otherwise.

## Required output

Deliver:

- a field/resolution ownership table;
- aggregation and interpolation rules for each field type;
- parent-child lifecycle and timestamp/version contracts;
- boundary and LOD transition invariants;
- measured memory/update-cost estimates or clearly labeled estimates;
- tests executed with exact commands/results;
- implemented-versus-planned gaps and unresolved design decisions.

Never claim that a runtime Climate Engine, regional weather simulation, conservation guarantee, or benchmark exists unless the inspected code and executed tests prove it.
