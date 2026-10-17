---
name: projecte-emc-dimension-milestone-review
description: "Checks whether EMC respects the order of dimension unlocks and their intended resource gates. Use when cross-dimension materials are convertible."
---

# ProjectE Dimension Milestone Review

## Purpose

dimension dependencies, portal recipes, boss gates, resource IDs, and proposed EMC values

## Required inputs

Represent confirmed dimension unlock dependencies and tie items to the earliest verified acquisition milestone.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and config sources. If version evidence is unavailable, stop before proposing changes.
2. Find conversion routes that let players obtain gated materials before the intended unlock and classify their impact.
3. A milestone bypass table with dependency evidence and policy decisions needed.
4. Validate the finding against a disposable fixture, repeatable calculation, or independent data lookup; compare current and proposed behavior and mark unknowns explicitly.
5. Produce do not treat world/dimension progression order as fact unless the pack's quests/configs confirm it. with evidence references, confirmed-versus-proposed status, affected IDs, assumptions, confidence, and the next safe action.

## Validation checklist

- [ ] The target version and evidence source are recorded; unknown version details are not guessed.
- [ ] The topic-specific behavior or data relationship has a reproducible check.
- [ ] Inputs, quantities, units, gates, or other assumptions relevant to the decision are explicit.
- [ ] Proposed values are distinguished from confirmed values and include rationale or a review-needed status.
- [ ] No production config/world is changed without backup, scoped diff, and rollback path.

## Required output

Do not treat world/dimension progression order as fact unless the pack's quests/configs confirm it.

## Boundaries and failure handling

A material from a later dimension is purchasable with early-game EMC. If recipe, registry, format, or runtime evidence is incomplete, mark the result unknown and name the smallest additional evidence needed. Do not claim universal coverage or successful balancing without measurable validation.

## Trigger examples

- **Positive:** No dimension milestone is relevant to the item.
- **Negative:** undefined
