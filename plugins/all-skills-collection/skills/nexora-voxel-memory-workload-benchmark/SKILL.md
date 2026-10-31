---
name: nexora-voxel-memory-workload-benchmark
description: "Designs reproducible large-world voxel memory benchmarks that separate logical voxel count, resident section storage, process memory, derived data, GPU resources, and save size."
---

# NEXORA Voxel Memory Workload Benchmark

## Purpose

Use this workflow when measuring, validating, or changing NEXORA's memory use for large voxel worlds, especially the 50-million-voxel / sub-1-GiB investigation tracked by NEXORA issue #48.

This skill owns the **benchmark contract and workload matrix** for voxel storage. It does not own runtime memory admission, generic allocation attribution, chunk streaming policy, save-format implementation, or a claim that the target has already been met.

## Reuse before creating

- `nexora-memory-budget-attribution` for subsystem-level resident/transient memory attribution.
- `nexora-memory-budget-admission` for concurrent reservations and oversubscription control.
- `nexora-world-load-admission` for rejecting worlds that exceed safe runtime capacity.
- `voxel-chunk-streaming-budget` for generation/meshing/upload/eviction concurrency and residency.
- `nexora-frame-allocation-budget` for per-frame allocation and latency budgets.
- `nexora-world-save-quiescence-barrier` and save/recovery workflows for persistence correctness.

Do not reproduce those workflows. This skill defines how to build comparable voxel-memory workloads and report their results without mixing unlike memory quantities.

## Verified NEXORA snapshot

Re-check the pinned checkout before applying these observations.

- `engine/world/src/voxel.rs` defines three section representations: Uniform, Paletted, and Direct. A section starts Uniform, grows to Paletted when a write introduces a second state, and can promote to Direct when the palette limit is exceeded. Compaction is an explicit quiet-point operation, not an automatic per-write shrink.
- `engine/world/src/chunk.rs` owns section collections and chunk-level access.
- `engine/benchmark/src/memory.rs` contains the isolated section-storage workload matrix; `engine/benchmark/src/main.rs` exposes it through the `nexora-benchmark` CLI.
- `docs/benchmarks/VOXEL-MEMORY-WORKLOAD-MATRIX.md` documents the current executable commands and interpretation boundaries.
- `docs/benchmarks/PHASE-0-BASELINE.md` records an earlier baseline: 18,293,973 non-air blocks across 9 chunks, 144.3 KiB voxel storage, 7.0 MiB peak RSS for the whole benchmark process, and a 152.1 KiB save.
- The older nine-chunk baseline is historical context, not proof that 50 million arbitrary or heavily edited voxels fit below 1 GiB.

These facts were re-checked against NEXORA `main` at source commit `19486829d18bd864fea00cac0711f519a5c07a70` on 2026-10-31. They are snapshot-specific, not permanent API guarantees. Re-check the source commit, benchmark harness, save path, and current baseline before applying them.


## Current executable section-storage slice

The current implementation provides seven deterministic templates, each run as a separate process:

| CLI workload | Representation / case | Important interpretation |
|---|---|---|
| `uniform-air` | Uniform air | Zero storage payload; not a realistic whole-world memory result |
| `uniform-solid` | Uniform non-air | Uniform representation with a non-air count |
| `natural` | Paletted | Deterministic synthetic terrain-like mix of air, stone, dirt, grass, and sparse ore; it is not a full invocation of the world generator |
| `high-diversity` | Paletted | 4,096 total states including air, at the configured palette ceiling |
| `edited-stale-palette` | Paletted | Palette entries remain allocated after edits leave only two live states |
| `edited-compacted` | Paletted | Same final voxel content after explicit compaction at a quiet point |
| `adversarial-direct` | Direct | 4,097 total states including air, forcing promotion beyond the palette ceiling |

For the default cubic section shape of 32³, the default 50,000,000-voxel request rounds up to 1,526 whole sections (50,003,968 logical voxels). Treat this as the benchmark's logical allocation target, not as proof that an entire 50-million-voxel World, streaming window, or rendered scene is resident.

### Reproduction commands

From the NEXORA repository root, build the optimized benchmark:

```powershell
cargo build --release -p nexora-benchmark
```

Run one workload per fresh process so process high-water memory and allocator history do not contaminate another scenario:

```powershell
cargo run --release -p nexora-benchmark -- --memory-workload uniform-air --markdown
cargo run --release -p nexora-benchmark -- --memory-workload uniform-solid --markdown
cargo run --release -p nexora-benchmark -- --memory-workload natural --markdown
cargo run --release -p nexora-benchmark -- --memory-workload high-diversity --markdown
cargo run --release -p nexora-benchmark -- --memory-workload edited-stale-palette --markdown
cargo run --release -p nexora-benchmark -- --memory-workload edited-compacted --markdown
cargo run --release -p nexora-benchmark -- --memory-workload adversarial-direct --markdown
```

A smaller manual fixture can be selected with `--memory-voxels 1000000`; this option requires `--memory-workload`. Preserve each output separately and record the exact command, commit, OS, hardware, and build profile.

### Interpret the emitted counters precisely

- `memory.storage_payload_bytes` counts initialized storage elements; it excludes spare vector capacity and allocator-private metadata.
- `memory.storage_capacity_bytes` sums backing `Vec` capacities for palettes, packed words, and direct cells.
- `memory.section_struct_bytes` is the inline `Section` vector capacity multiplied by `size_of::<Section>()`.
- `memory.section_owned_bytes` is the section-vector capacity plus section storage buffer capacities. It is not total process memory and excludes world/chunk maps, streaming, persistence staging, meshes, GPU resources, entities, lighting, fluids, caches, allocator metadata, and fragmentation.
- `memory.storage_heap_buffers` counts section-owned `Vec` backing buffers; it is not an allocator-call count.
- The process high-water value is captured after allocation and a full-content digest pass. Linux reads `VmHWM`; Windows reads `PeakWorkingSet64` using inbox PowerShell. It covers the whole benchmark process and does not attribute memory to a subsystem.
- `memory.content_digest_fnv1a64` traverses every voxel state in section order. It checks stable content for identical workloads; it does not prove save/load, unload/reload, or generator round-trip correctness.

The source tests assert that all three representations are reached, capacity is never below initialized payload, stale and compacted fixtures retain the same digest/non-air count while compacted storage is smaller, and backing-buffer counts match each representation. These are source-level tests to run, not claims that they were executed during a skill-library update. A focused command is `cargo test -p nexora-benchmark memory::tests`.

### Explicitly unmeasured by this slice

The current memory workload allocates cloned `Section` objects only. It does not instantiate a complete `World` or streaming manager and does not measure chunk/world maps, residency, streaming load/evict, persistence encode/decode or save size, CPU meshes, GPU memory, entities, lighting, fluids, caches, allocator metadata, or fragmentation. Keep those as separate follow-up workloads and do not mark issue #48 complete from this slice alone.

The seven templates are deliberately storage fixtures. In particular, `natural` is deterministic synthetic data rather than proof of a real generator output distribution. For an end-to-end claim, add generator-produced fixtures with pinned seed/version and verify content digests across candidate/reference runs.

## Required inputs

- Pinned NEXORA commit, Rust toolchain, build profile, OS, CPU, RAM, and measurement tools.
- Chunk shape, section shape, world bounds, generator version, and deterministic seeds.
- Exact definition of the target: which memory pools count toward the 1-GiB limit and which are reported separately.
- Current storage implementation, benchmark harness, headless fixtures, streaming behavior, and save/load path.
- Baseline run identifier and a reference representation or prior commit for comparison.

## Workflow

1. **Define the measured boundary.** State whether the target covers voxel-section payload only, all CPU-resident world data, whole-process RSS, or another explicit pool. Never use the phrase “world uses under 1 GiB” without defining what is included.
2. **Separate memory ledgers.** Report voxel payload, section/palette/index overhead, chunk maps and metadata, auxiliary block data, entities, CPU meshes, GPU buffers/textures, temporary generation buffers, allocator overhead, process RSS/peak RSS, and on-disk save size as distinct values. Do not add overlapping RSS and heap counters.
3. **Pin the world shape.** Record logical voxel count, chunk count, section count, dimensions, seed, generator version, chunk residency, and whether air is included in the logical count. Keep these identical between candidate and reference runs.
4. **Build a workload matrix.** Include at least: uniform solid regions; representative procedural terrain; high block-state diversity; heavily player-edited sections; adversarial alternating/pseudo-random states; and auxiliary-data workloads when those systems exist.
5. **Measure representation transitions.** Exercise uniform-to-paletted conversion, palette growth, index-width changes, compaction, empty-section removal, and repeated edits. Report bytes before and after each transition and verify that the benchmark actually reached the intended storage mode.
6. **Measure residency separately from logical size.** For a large logical world, vary the configured resident window and record resident chunks/sections, load/unload churn, peak transient memory, and revisit correctness. Do not count unloaded save bytes as resident RAM.
7. **Include derived-data tiers.** Run storage-only, storage-plus-mesh CPU, and render-ready tiers separately. Add GPU allocations only when the backend exposes reliable measurements; otherwise mark them unavailable rather than estimating them from buffer dimensions alone.
8. **Measure persistence independently.** Report serialized bytes, compressed bytes, save/load duration, and peak temporary memory during encode/decode. A compact save does not prove a compact live representation.
9. **Use a controlled reference.** Compare the current representation with a simple per-voxel reference or a prior implementation using the same generated world and edit sequence. Explain what the reference includes and avoid comparing different world contents.
10. **Repeat and report distributions.** Warm up, run multiple independent samples, and report median plus p95 (and dispersion where available). Record process background load and reject or label contaminated runs; do not merge numbers from different machines or sessions into one synthetic baseline.
11. **Check correctness during measurement.** Hash or compare world state before/after edits, save/load, unload/reload, and deterministic regeneration. A fast benchmark that silently loses or changes blocks is invalid.
12. **Profile before optimizing.** Attribute growth to a concrete owner—palette, index arrays, map nodes, per-block metadata, mesh, cache, allocator, or temporary staging—before proposing a new layout or compression scheme.
13. **Set budgets by tier.** Define separate ceilings for logical voxel storage, resident world state, transient load/generation, CPU derived data, GPU derived data, and save buffers. Include headroom and the exact admission behavior when a tier exceeds its ceiling.
14. **Publish reproducible evidence.** Store the benchmark command, commit, configuration, workload manifest, raw result, summary, and interpretation. Keep historical baselines rather than overwriting their conditions or numbers.

## Required workload matrix

| Workload | Purpose | Required evidence |
|---|---|---|
| Uniform | Best-case uniform sections | Uniform section count and bytes |
| Natural terrain | Representative generator output | Seed, non-air count, palette distribution |
| High diversity | Many block IDs per section | Palette sizes and index widths |
| Heavily edited | Player edits reduce uniformity | Edit count/order and transition counts |
| Adversarial | Alternating or pseudo-random states | Worst-case bytes per logical voxel |
| Auxiliary data | Lighting, fluids, metadata, entities where implemented | Separate bytes by owner |
| Streaming | Large logical world, bounded resident window | Resident/evicted counts and peak transient bytes |
| Derived data | CPU mesh and GPU-ready tiers | CPU/GPU bytes and visible chunk set |
| Persistence | Save/load and revisit | Encoded bytes, peak temporary memory, state hash |

## Validation checklist

- [ ] The memory target has a precise inclusion/exclusion boundary.
- [ ] Logical voxel count, resident count, and section count are reported separately.
- [ ] Every workload has a pinned seed, generator version, dimensions, and edit sequence.
- [ ] Uniform, paletted, and any direct/fallback representation states are explicitly counted.
- [ ] Memory categories do not overlap or get summed twice.
- [ ] RSS, heap/allocator, GPU memory, and save size are clearly distinguished.
- [ ] Candidate and reference use identical world data and operations.
- [ ] Repeated runs include median and p95, with contaminated runs identified.
- [ ] Save/load and unload/reload preserve a stable world digest.
- [ ] Benchmarks include correctness assertions and cannot optimize away the measured work.
- [ ] No performance or 1-GiB claim exceeds the measured workload and machine.
- [ ] Historical baselines remain immutable and new runs are additive.

## Required output

Produce a voxel-memory benchmark report containing the pinned commit; exact target boundary; hardware/toolchain; workload manifest; logical/resident voxel and chunk counts; bytes by memory ledger; representation transition counts; median/p95 timings; save/load and correctness digests; candidate/reference comparison; raw artifacts; budget decision; and limitations.

Classify each result as **measured**, **derived from measured counters**, **estimated**, **not measured**, or **blocked**. Estimates must never be presented as observed memory use.

## Boundaries and failure handling

- Do not infer a 50-million-voxel result by multiplying a nine-chunk baseline.
- Do not infer whole-process memory from voxel payload bytes or vice versa.
- Do not treat save compression as runtime memory compression.
- Do not claim the target is met when GPU, meshes, auxiliary data, or transient peaks were excluded from a claim that purports to include them.
- Do not change section size, palette encoding, or storage layout solely because one synthetic workload looks favorable.
- Do not run unbounded allocations on a developer machine; cap fixtures, document the scale-up path, and stop safely on budget exhaustion.
- If a measurement tool cannot observe a memory pool, mark it unavailable and define the next evidence needed.

## Trigger examples

- **Positive:** Validate the NEXORA issue #48 goal of 50 million logical voxels under a precisely defined memory budget.
- **Positive:** Compare uniform/paletted section storage under natural, edited, high-diversity, and adversarial worlds.
- **Positive:** Determine whether a memory regression comes from voxel payload, chunk metadata, derived meshes, transient loading, or process overhead.
- **Negative:** The task is only about limiting concurrent memory reservations; use `nexora-memory-budget-admission`.
- **Negative:** The task is only about profiling arbitrary subsystem allocations; use `nexora-memory-budget-attribution`.
- **Negative:** The task is only about chunk queue scheduling or eviction policy; use `voxel-chunk-streaming-budget`.
