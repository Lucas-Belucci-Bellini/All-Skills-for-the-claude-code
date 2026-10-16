---
name: procedural-world-golden-test
description: Create stable golden fixtures for procedural world generation that detect unintended changes in terrain, biome, structure, and spawn output.
---

# Procedural World Golden Test

## Goal

Catch world-generation regressions while distinguishing intentional generator-version updates from accidental drift.

## Inputs to inspect

Seed/worldgen version, generator configuration, biome and structure outputs, canonical chunk serialization, and existing known-good fixtures.

## Workflow

1. Choose representative seeds and coordinate regions that cover common terrain, rare features, boundaries and known edge cases.
2. Define a canonical output projection and comparison granularity, including whether exact bytes, semantic block counts, biome maps or structure positions are authoritative.
3. Generate expected artifacts with pinned generator/content versions and record the toolchain and configuration needed to reproduce them.
4. Run fixtures after relevant code/content changes; report the first differing chunk/coordinate and summarize meaningful distribution or structural differences.
5. Update golden fixtures only with reviewed rationale, before/after evidence and a version/compatibility note when generated worlds intentionally change.

## Validation checklist

- [ ] Fixtures are deterministic under the declared version and settings.
- [ ] Expected output excludes only fields proven irrelevant or nondeterministic.
- [ ] Diffs identify location and feature-level changes instead of dumping opaque binary mismatches only.
- [ ] Golden updates cannot be accepted automatically merely because output changed.

## Required output

A seed/region fixture set, canonical comparison format, regression report and reviewed procedure for intentional generator changes.

## Boundaries and failure handling

Do not promise byte-for-byte cross-platform stability unless the generator's numeric and random behavior supports it.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
