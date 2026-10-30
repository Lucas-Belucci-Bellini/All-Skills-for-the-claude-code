---
name: nexora-voxel-palette-transition-invariants
description: "Validates NEXORA voxel section representation transitions, packed palette widths, direct-storage promotion, compaction, and serialization invariants."
---

# NEXORA Voxel Palette Transition Invariants

## Purpose

Use this workflow when changing or diagnosing the three storage representations in `engine/world/src/voxel.rs`: `Uniform`, `Paletted`, and `Direct`. It focuses on correctness across representation changes, not on general memory budgeting or on choosing a new compression scheme.

The inspected NEXORA snapshot stores uniform sections without per-cell payload, packs palette indices into `u64` words, and promotes sections to direct state IDs after the palette reaches its configured limit. Re-check the current implementation and tests before applying these details.

## Reuse before creating

- `nexora-voxel-memory-workload-benchmark` for the workload matrix, memory ledgers, and measured-versus-estimated reporting.
- `nexora-memory-budget-attribution` for subsystem-level memory accounting.
- `voxel-chunk-streaming-budget` for residency and streaming concurrency.
- `voxel-save-format-versioning` and `engine-voxel-chunk-save-version-contract` for persisted schema compatibility.
- `engine-voxel-edit-transaction-rollback` for edit atomicity and rollback.
- `voxel-worldgen-property-tests` for broader world-generation properties.

This skill owns the **representation state machine and its correctness evidence**. It does not own global memory admission, chunk residency, save-format version policy, or generic voxel editing transactions.

## Verified implementation snapshot

Inspected `engine/world/src/voxel.rs` on NEXORA `main` (source blob `82f40246fcdb86cdaff0e6a7ada4739d888e154c`).

- `Storage` has `Uniform(BlockStateId)`, `Paletted { palette, bits, words }`, and `Direct(Vec<BlockStateId>)`.
- `MAX_PALETTE_BITS = 12` and `MAX_PALETTE_LEN = 4096`. The 4097th distinct state triggers promotion to direct storage.
- The first differing write to a uniform section creates a two-entry palette. Index zero is the old state; only the changed cell needs a nonzero index.
- Palette growth widens the packed index width only when `bits_for(palette.len())` exceeds the current width, then repacks all existing indices.
- Packed indices do not straddle `u64` word boundaries. The number of slots per word is `64 / bits`; unused high bits are intentional.
- A section that becomes less diverse does not shrink on every write. `Section::compact` is the explicit quiet-point operation that rebuilds the smallest suitable representation.
- `compact` returns to `Uniform` when every cell matches, rebuilds a palette from referenced states when possible, and chooses `Direct` when more than 4096 distinct states remain.
- `non_air` is maintained incrementally on writes and recomputed when parts are loaded/remapped; compaction must preserve its value and all cell contents.
- `storage_bytes` is an approximate payload estimate: it excludes allocator capacity/metadata, enclosing chunk maps, and process/GPU memory.

These are snapshot facts, not permanent API guarantees.

## Required inputs

- Pinned NEXORA commit, Rust toolchain, target profile, and the exact source/test diff.
- Current section shape and supported maximum section extent.
- Current constants for palette length, index width, and packing layout.
- Existing unit/property tests and benchmark harness.
- Save/load representation and registry remapping path.
- The intended behavior for malformed persisted parts and unknown block-state IDs.

## Workflow

1. **Pin the code under test.** Record the commit and inspect `voxel.rs`, its inline tests, section serialization parts, registry remapping, chunk integration, and all callers of `compact`. Do not rely on an old skill snapshot if the implementation changed.
2. **Write the state-transition table.** Cover Uniform→Paletted on first divergence, Paletted width growth at each power-of-two boundary, Paletted→Direct on the 4097th distinct state, and Paletted/Direct→smallest representation only through explicit compaction.
3. **Preserve semantic contents across every transition.** Before and after each write, snapshot or hash every cell in deterministic fixtures. Assert that exactly the targeted cell changed and every other cell retained its previous state.
4. **Exercise palette-width boundaries.** Test palette cardinalities 1, 2, 3, 4, 5, 8/9, 16/17, 256/257, and 4096. Verify the minimum width, palette index range, and every previously written value after repacking.
5. **Exercise packed-word boundaries.** For every supported bit width 1–12, test the first and last slot of each word, the transition between adjacent words, the final partial word, and the highest legal section index. Compare `Packing::split` with ordinary division/modulo and test read/write round trips.
6. **Test non-divisor widths deliberately.** Widths such as 3, 5, 6, 7, 9, 10, and 12 leave unused bits in each word. Confirm that writes do not spill into the next slot and that unused bits cannot corrupt valid cells.
7. **Verify the direct-promotion boundary.** Construct a bounded section with 4096 distinct states, then insert one additional distinct state. Assert the representation changes exactly at the boundary, the triggering write is applied once, all prior cells survive, and the non-air counter is correct.
8. **Verify compaction independently.** Cover all-air, all-one-non-air-state, two-state, sparse high-diversity, and more-than-4096-state sections. Check that compaction changes representation only, not logical contents, and that repeated compaction is idempotent.
9. **Check palette pruning.** Create transient states that are overwritten so they remain in the palette but are no longer referenced. After compaction, assert that only live states remain and that the chosen width is minimal.
10. **Check air accounting.** Exercise AIR→non-AIR, non-AIR→AIR, non-AIR→different-non-AIR, same-state writes, direct promotion, compaction, deserialization, and registry remapping. Recount cells independently and compare with `non_air_count` and `is_empty`.
11. **Validate malformed parts at the boundary.** Confirm that empty palettes, zero/out-of-range bit widths, wrong word counts, wrong direct-cell counts, and packed indices outside the palette are rejected or handled according to an explicit quarantine policy. Trace the save decoder too; a defensive fallback in `get_by_index` is not a substitute for validating untrusted persisted data.
12. **Test remapping collisions.** Registry remapping can map formerly distinct IDs to the same runtime ID. Verify logical values and air counts, then decide whether compaction is appropriate at a safe point; do not assume remapping automatically minimizes the palette.
13. **Keep persistence semantics stable.** Round-trip Uniform, Paletted, and Direct sections through the actual save format. Verify state identifiers are registry-mapped rather than persisting session-local `BlockStateId` values, and ensure malformed sections are quarantined rather than partially accepted.
14. **Measure transitions separately from steady state.** Benchmark first divergence, palette insertion without widening, each width repack, direct promotion, and compaction as separate cases. Use warm-up, black-boxed results, repeated samples, median/p95, and an identical fixture. Do not compare results from different machines or dirty commits as if they were one series.
15. **Report allocation and capacity separately.** Distinguish logical `storage_bytes`, vector length/capacity, allocator overhead, temporary materialization/repack buffers, and process peak RSS. Do not sum overlapping counters or call payload bytes total process memory.
16. **Keep optimization proposals evidence-led.** The current `compact` implementation performs linear palette searches while rebuilding; its cost may grow with diversity. Profile representative sections before replacing it with a hash-based or sort-based approach, and test determinism and ordering consequences before changing the algorithm.
17. **Deliver a regression record.** Link each invariant to a test name, command, fixture shape, seed/edit sequence, and result. Label tests as executed, not executed, or blocked; a skill description is not proof that NEXORA tests ran.

## Existing test anchors in the inspected source

Recheck names and behavior before using them; the following tests were present in the inspected `voxel.rs` snapshot:

- `packing_agrees_with_division_everywhere_a_section_can_reach`
- `every_palette_width_round_trips_every_cell`
- `the_palette_widens_as_states_accumulate`
- `bit_widths_cover_their_palette_size`
- `an_overfull_palette_promotes_to_direct_storage`
- `non_air_count_tracks_writes_in_both_directions`
- `compaction_collapses_a_refilled_section`
- `compaction_drops_palette_entries_nothing_references`
- `parts_round_trip_through_every_representation`
- `malformed_parts_are_refused`

Do not claim these tests were run during skill authoring; they were source-inspected anchors.

## Validation checklist

- [ ] Source commit and constants are pinned.
- [ ] Uniform→Paletted, palette widening, Paletted→Direct, and explicit compaction are covered.
- [ ] Every index width 1–12 is tested at word and section boundaries.
- [ ] Non-divisor widths cannot alias or overwrite adjacent cells.
- [ ] 4096→4097 distinct-state promotion preserves every voxel.
- [ ] Compaction is content-preserving and idempotent.
- [ ] Palette pruning and minimum-width selection are verified.
- [ ] `non_air_count` matches an independent recount after every operation.
- [ ] Malformed persisted parts are rejected/quarantined before unsafe use.
- [ ] Registry remapping collisions and AIR remaps are covered.
- [ ] Uniform, Paletted, and Direct save/load round trips preserve logical contents.
- [ ] Benchmarks isolate transitions and report median/p95 on a pinned machine.
- [ ] Payload bytes, capacity, temporary memory, RSS, GPU memory, and save size are not conflated.
- [ ] No optimization is justified solely by a synthetic fixture or unmeasured assumption.

## Required output

Produce a representation-transition report containing the pinned commit; state-transition diagram/table; constants and palette boundaries; deterministic fixture shapes and edit sequences; test names and execution status; per-cell content hashes or equivalent equality evidence; independent non-air recounts; malformed-data behavior; save/load and registry-remap results; transition-specific benchmark distributions; allocation/capacity/temporary-memory breakdown; and unresolved correctness or performance risks.

## Boundaries and failure handling

- Do not assume a palette width of 4/8 bits; NEXORA currently supports widths 1–12.
- Do not pack across word boundaries unless the representation and all tests are deliberately redesigned.
- Do not promote early or late relative to the configured palette limit.
- Do not compact on every edit; the current contract reserves full rescans for quiet points.
- Do not treat `storage_bytes` as total section/process memory.
- Do not silently turn malformed palette indices into valid world content; trace and test the decoder's quarantine boundary.
- Do not use session-local runtime IDs as persistent identifiers.
- Do not claim performance gains, memory savings, or test execution without fresh evidence.

## Trigger examples

- **Positive:** Change palette index packing, palette growth, direct-storage promotion, or section compaction.
- **Positive:** Diagnose corrupted voxels after a palette-width increase, save/load, or registry remap.
- **Positive:** Add regression tests for 4096/4097 palette cardinality, word boundaries, or non-air counters.
- **Negative:** The task only measures whole-world RAM or workload diversity; use `nexora-voxel-memory-workload-benchmark`.
- **Negative:** The task only manages chunk residency or streaming budgets; use `voxel-chunk-streaming-budget`.
- **Negative:** The task changes save schema/version policy rather than section representation invariants; use the dedicated save-format workflows.
