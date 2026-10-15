---
name: procedural-world-generation-pipeline
description: "Designs reproducible procedural world generation with separate randomness domains. Use when world seeds, terrain features, structures, or streamed generation must remain stable."
---

# Procedural World Generation Pipeline

## Use when
A small generation change unintentionally shifts unrelated features, or loading order changes the world outcome.

## Workflow
1. Define the seed contract and derive independent sub-seeds for terrain, ores, structures, vegetation, and loot.
2. Separate pure coordinate-based generation from persistence-backed player edits and generated-world metadata.
3. Specify world-generation versions so older saves can explain which rules created their chunks.
4. Test identical seeds across process restarts, chunk visit orders, and parallel scheduling.

## Required output
A generation pipeline, seed derivation scheme, versioning policy, and deterministic test fixtures.

## Validation
- Generated output is stable for a fixed seed, version, and coordinate set.
- Randomness in one feature does not consume another feature's RNG stream.
- Parallel generation does not affect final results.

## Guardrails
Never silently change world-generation semantics for existing worlds; define migration or preserve legacy generation by version.
