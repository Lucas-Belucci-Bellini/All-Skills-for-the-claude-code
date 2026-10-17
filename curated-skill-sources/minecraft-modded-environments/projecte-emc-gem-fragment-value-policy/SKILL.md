---
name: projecte-emc-gem-fragment-value-policy
description: "Derives a traceable policy for gems, shards, fragments, and refined forms. Use for multi-stage gem families."
---

# ProjectE Gem and Fragment Value Policy

## Purpose

Compare item family stages using processing yields and acquisition constraints.

## Required inputs

Variant IDs, recipes, source drops, yield, rarity, and progression gates.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and configuration sources. If version evidence is unavailable, stop before proposing changes.
2. Map fragment-to-gem forms and record yield, loss, and alternate acquisition routes.
3. Compare candidates with equivalent families and flag random drops, state, or gates that make direct comparison unsafe.
4. Validate findings with a disposable fixture or independent lookup, compare current and proposed behavior, and mark unresolved data rather than filling gaps with assumptions.
5. Produce a family table with proposed ranges, source evidence, confidence, and playtest questions. with source references, confirmed-versus-proposed status, confidence, affected IDs, and the next safe action.

## Validation checklist

- [ ] Target versions and evidence sources are recorded; unknown version details are not guessed.
- [ ] Item identifiers and quantities are confirmed against target registry/config rather than display names alone.
- [ ] The topic-specific behavior has an observable reproduction or data check.
- [ ] Proposed values are distinct from confirmed values and include a justification or a clear review-needed state.
- [ ] No production world/config is changed without backup, scoped diff, and rollback path.

## Required output

A family table with proposed ranges, source evidence, confidence, and playtest questions.

## Boundaries and failure handling

Do not treat random drops or differently gated crystals as equal merely because names match. If registry, recipe, format, or runtime evidence is incomplete, mark the result unknown and state the smallest additional evidence needed. Do not claim that all EMC values are configured or balanced without measurable coverage and validation.

## Trigger examples

- **Positive:** Multiple mods add fragments and refined versions of a crystal.
- **Negative:** The item is unrelated decor with no confirmed family relationship.
