---
name: projecte-emc-material-equivalence-map
description: "Maps equivalent materials across mods before assigning related EMC values. Use for ores, ingots, dusts, gems, woods, and alloys."
---

# ProjectE EMC Material Equivalence Map

## Purpose

Build material groups while preserving grade, dimension, purity, and progression distinctions.

## Required inputs

Registry IDs, tags, recipes, names, mod provenance, and conversion edges.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and configuration sources. If version evidence is unavailable, stop before proposing changes.
2. Build candidate groups from tags and recipe relationships rather than display names or textures alone.
3. Mark each relation equivalent, lossy substitute, grade variant, recipe-only relation, or unresolved with evidence.
4. Validate findings with a disposable fixture or independent lookup, compare current and proposed behavior, and mark unresolved data rather than filling gaps with assumptions.
5. Produce a material equivalence graph with stable group ids, relationship type, evidence, and unresolved pairs. with source references, confirmed-versus-proposed status, confidence, affected IDs, and the next safe action.

## Validation checklist

- [ ] Target versions and evidence sources are recorded; unknown version details are not guessed.
- [ ] Item identifiers and quantities are confirmed against target registry/config rather than display names alone.
- [ ] The topic-specific behavior has an observable reproduction or data check.
- [ ] Proposed values are distinct from confirmed values and include a justification or a clear review-needed state.
- [ ] No production world/config is changed without backup, scoped diff, and rollback path.

## Required output

A material equivalence graph with stable group IDs, relationship type, evidence, and unresolved pairs.

## Boundaries and failure handling

Do not collapse items solely because their display names or textures look alike. If registry, recipe, format, or runtime evidence is incomplete, mark the result unknown and state the smallest additional evidence needed. Do not claim that all EMC values are configured or balanced without measurable coverage and validation.

## Trigger examples

- **Positive:** Two mods register alternate ingots that should have consistent policy.
- **Negative:** The items are only visually similar with no evidence of functional equivalence.
