---
name: nexora-atlas-face-variant-determinism
description: "Preserve stable per-block and per-face texture variant selection across chunk rebuilds, streaming, save/load and worker scheduling."
---

# NEXORA Atlas Face Variant Determinism

## Purpose

Make atlas variants visually varied without flicker or nondeterministic changes when chunks are remeshed, reloaded or processed in a different order.

## Verified NEXORA facts

- The inspected atlas `FaceLook` model contains a first tile, a variant count and a mirror permission for each face role.
- The atlas implementation chooses a variant through `variant_hash` using block identity and face information.
- Variant selection is part of visual output and must not depend on thread scheduling, chunk load order or mutable global random state.

## Required inputs

- Pinned `FaceLook`, `variant_hash`, block identity and mesh vertex packing implementations.
- Stable block coordinates/IDs and a deterministic set of atlas variants.
- Chunk rebuild, streaming restore, save/load and world-seed fixtures.

## Workflow

1. Trace the full identity used by `variant_hash`; document whether it depends on block type, world position, face axis, face sign, seed or any mutable state.
2. Separate the stable identity used to choose a variant from transient handles, chunk slot indices, worker IDs and allocation order.
3. Test that the same block and face choose the same tile after repeated meshing, chunk eviction/reload, save/load and different worker scheduling orders.
4. Test that distinct blocks can receive controlled variation without producing out-of-range tile indices or selecting a variant when the count is zero.
5. Verify mirror permission and variant count are applied per face role, including top/side/bottom differences.
6. Add property tests for hash stability, bounded selection and deterministic output across shuffled input order.
7. If variant rules must change, define an explicit compatibility/version policy so old worlds or asset packs do not silently change appearance.

## Validation checklist

- [ ] Variant selection is a pure function of documented stable inputs.
- [ ] Repeated builds and different worker orders produce identical tile/mirror choices for the same block and face.
- [ ] Selected indices remain within the declared variant range, including zero/one-variant cases.
- [ ] No transient chunk slot, pointer, thread ID or nondeterministic iteration order affects the result.

## Required output

A stable-input contract, variant selection truth table, deterministic property-test plan/results, and compatibility/version decision.

## Boundaries and failure handling

Do not use global RNG or thread-local randomness for persistent world appearance. Do not claim world-seed stability unless the seed is actually part of the verified hash contract.

## Trigger examples

- **Positive:** Texture variants change unexpectedly after chunk reload or remeshing.
- **Positive:** A new block material adds per-face variants and must preserve deterministic appearance.
- **Negative:** The task is about world-generation terrain randomness rather than visual tile selection.
- **Negative:** The issue is shader cache-key completeness or material schema versioning.
