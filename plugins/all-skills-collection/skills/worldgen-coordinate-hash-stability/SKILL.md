---
name: worldgen-coordinate-hash-stability
description: "Use when coordinate-to-hash generation differs across platforms/builds, especially for negative or large coordinates; not for general seed distribution."
---

# Worldgen Coordinate Hash Stability

## Purpose

Define stable coordinate hashing for negative, extreme, and cross-platform world positions.

## Required inputs

Coordinate types, hash/seed code, integer widths, serialization, target platforms, golden fixtures.

## Workflow

1. Trace coordinates through normalization, integer casts, mixing, overflow, and final seed generation.
2. Create fixtures for negative values, chunk boundaries, supported extremes, axis permutations and sign extension.
3. Compare results across architectures/build modes and make overflow assumptions explicit.
4. Freeze expected outputs as golden tests and version intentional changes to world-generation mapping.

## Verification checklist

- [ ] Negative coordinate conversion is defined rather than accidentally truncated.
- [ ] Overflow behavior is consistent across supported targets.
- [ ] Axis order and integer width have test fixtures.
- [ ] Hash changes are treated as world-compatibility changes.

## Required output

A coordinate-hash spec, cross-platform fixture results, and worldgen compatibility assessment.

## Boundaries and failure handling

Do not treat the hash as cryptographic or collision-free without proof; version mapping changes.

When evidence, permissions, or environment details are missing, stop at the supported analysis, record the missing prerequisite, and do not report unexecuted validation as passing.

## Trigger examples

- **Positive:** Worldgen differs on one platform for chunks at negative X/Z.
- **Negative:** Checking biome frequency when coordinate hashing is stable.
