---
name: worldgen-deterministic-seed-contract
description: Define and test deterministic world-generation seed behavior across chunks, subsystems, versions, and parallel execution.
---

# World Generation Deterministic Seed Contract

## Goal

Make a world seed a reproducible contract rather than a vague promise that generation looks similar on one machine.

## Inputs to inspect

Seed derivation code, random-number generators, chunk coordinates, generation stages, worker scheduling, content version, and saved world metadata.

## Workflow

1. Specify how the root seed derives independent stage/chunk/subsystem streams and how negative coordinates, dimensions and world identifiers participate.
2. Audit order-dependent shared RNG state and replace it with stable per-feature streams or coordinate-based sampling where parallel scheduling could change results.
3. Generate identical coordinates in different orders and worker counts; compare canonical block/biome/structure outputs and record the first differing coordinate and stage.
4. Define which code/content/version changes intentionally alter generated worlds and store the necessary generator and world-format identifiers with saves.
5. Add golden-seed fixtures and property tests across chunk boundaries, regeneration, save/load and supported platforms; clearly scope the determinism guarantee.

## Validation checklist

- [ ] The same declared seed, generator version, input set and coordinate produce the documented result.
- [ ] Parallel work scheduling does not change outputs for generation that claims order independence.
- [ ] Random stream derivation avoids accidental stream reuse across logically separate features.
- [ ] Golden fixture updates explain intentional worldgen changes instead of silently rewriting expected outputs.

## Required output

A seed derivation contract, deterministic fixture set, cross-scheduling comparison report, and versioning policy for generator changes.

## Boundaries and failure handling

Do not claim cross-platform bitwise determinism if floating-point operations, library RNGs or platform math remain uncontrolled.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
