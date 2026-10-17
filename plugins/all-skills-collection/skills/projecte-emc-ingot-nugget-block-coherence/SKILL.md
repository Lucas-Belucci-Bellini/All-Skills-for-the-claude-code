---
name: projecte-emc-ingot-nugget-block-coherence
description: "Audits EMC ratios among material units such as nuggets, ingots, and storage blocks. Use for convertible material families."
---

# ProjectE Ingot Nugget Block Coherence

## Purpose

Derive unit ratios from actual pack recipes and output quantities.

## Required inputs

Confirmed recipes, unit ratios, variants, and current values.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and configuration sources. If version evidence is unavailable, stop before proposing changes.
2. Inspect actual compression, decompression, and crafting recipes including remainders.
3. Compare configured values with recipe-derived ratios and flag value-creation paths.
4. Validate findings with a disposable fixture or independent lookup, compare current and proposed behavior, and mark unresolved data rather than filling gaps with assumptions.
5. Produce a coherence table with observed ratios, deviations, and documented exceptions. with source references, confirmed-versus-proposed status, confidence, affected IDs, and the next safe action.

## Validation checklist

- [ ] Target versions and evidence sources are recorded; unknown version details are not guessed.
- [ ] Item identifiers and quantities are confirmed against target registry/config rather than display names alone.
- [ ] The topic-specific behavior has an observable reproduction or data check.
- [ ] Proposed values are distinct from confirmed values and include a justification or a clear review-needed state.
- [ ] No production world/config is changed without backup, scoped diff, and rollback path.

## Required output

A coherence table with observed ratios, deviations, and documented exceptions.

## Boundaries and failure handling

Do not overwrite values from naming conventions alone; confirm actual recipes. If registry, recipe, format, or runtime evidence is incomplete, mark the result unknown and state the smallest additional evidence needed. Do not claim that all EMC values are configured or balanced without measurable coverage and validation.

## Trigger examples

- **Positive:** A pack has several metals with nugget, ingot, and block forms.
- **Negative:** Items have no confirmed conversion relationship.
