---
name: projecte-emc-biome-gated-resource-review
description: "Evaluates materials limited to specific biomes, structures, or worldgen conditions. Use when exploration scarcity matters."
---

# ProjectE Biome-Gated Resource Review

## Purpose

Verify worldgen constraints and alternative item acquisition paths.

## Required inputs

Worldgen configs, biome/structure IDs, item sources, recipe alternatives, and game version.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and configuration sources. If version evidence is unavailable, stop before proposing changes.
2. Find registered source conditions in actual configs or source data instead of relying on remembered locations.
3. Check trades, machine production, loot, and cross-dimension paths that bypass the restriction.
4. Validate findings with a disposable fixture or independent lookup, compare current and proposed behavior, and mark unresolved data rather than filling gaps with assumptions.
5. Produce a biome-gate evidence table with alternate routes, uncertainty, and policy recommendations. with source references, confirmed-versus-proposed status, confidence, affected IDs, and the next safe action.

## Validation checklist

- [ ] Target versions and evidence sources are recorded; unknown version details are not guessed.
- [ ] Item identifiers and quantities are confirmed against target registry/config rather than display names alone.
- [ ] The topic-specific behavior has an observable reproduction or data check.
- [ ] Proposed values are distinct from confirmed values and include a justification or a clear review-needed state.
- [ ] No production world/config is changed without backup, scoped diff, and rollback path.

## Required output

A biome-gate evidence table with alternate routes, uncertainty, and policy recommendations.

## Boundaries and failure handling

Do not infer rarity from a biome name alone. If registry, recipe, format, or runtime evidence is incomplete, mark the result unknown and state the smallest additional evidence needed. Do not claim that all EMC values are configured or balanced without measurable coverage and validation.

## Trigger examples

- **Positive:** An item appears scarce because it spawns in one region.
- **Negative:** No verified biome or structure restriction exists.
