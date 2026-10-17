---
name: projecte-emc-dimension-gate-classification
description: "Records dimension and access requirements that influence resource acquisition. Use for items behind world progression gates."
---

# ProjectE Dimension-Gated Resource Classification

## Purpose

Determine earliest verified access and alternative routes for dimension-specific resources.

## Required inputs

Dimension IDs, portal requirements, bosses, quests, recipes, and item sources.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and configuration sources. If version evidence is unavailable, stop before proposing changes.
2. Capture prerequisites and access route for each relevant item.
3. Check for alternatives that bypass dimension access, then classify the strength of the gate.
4. Validate findings with a disposable fixture or independent lookup, compare current and proposed behavior, and mark unresolved data rather than filling gaps with assumptions.
5. Produce a gate-aware table linking item id, dimension, prerequisite chain, and policy notes. with source references, confirmed-versus-proposed status, confidence, affected IDs, and the next safe action.

## Validation checklist

- [ ] Target versions and evidence sources are recorded; unknown version details are not guessed.
- [ ] Item identifiers and quantities are confirmed against target registry/config rather than display names alone.
- [ ] The topic-specific behavior has an observable reproduction or data check.
- [ ] Proposed values are distinct from confirmed values and include a justification or a clear review-needed state.
- [ ] No production world/config is changed without backup, scoped diff, and rollback path.

## Required output

A gate-aware table linking item ID, dimension, prerequisite chain, and policy notes.

## Boundaries and failure handling

Do not assume a dimension is hard or late-game without evidence from target configs. If registry, recipe, format, or runtime evidence is incomplete, mark the result unknown and state the smallest additional evidence needed. Do not claim that all EMC values are configured or balanced without measurable coverage and validation.

## Trigger examples

- **Positive:** Items from a gated dimension need a progression-aware policy.
- **Negative:** The item has no verified dimension-specific acquisition route.
