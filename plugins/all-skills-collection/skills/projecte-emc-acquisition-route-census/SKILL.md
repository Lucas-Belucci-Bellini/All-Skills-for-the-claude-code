---
name: projecte-emc-acquisition-route-census
description: "Enumerates acquisition paths before assigning an EMC estimate. Use when an item's value depends on mining, mobs, farming, quests, machines, or trades."
---

# ProjectE Item Acquisition Route Census

## Purpose

registry ID, recipes, loot tables, worldgen, quests, trading, machine recipes, and pack settings

## Required inputs

Create a route list and distinguish directly observed routes from inferred or untested possibilities.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and config sources. If version evidence is unavailable, stop before proposing changes.
2. Rank routes by repeatability, prerequisite, time/risk, and yield; highlight routes that undermine the assumed rarity.
3. An acquisition-route census with evidence links, route class, assumptions, and next checks.
4. Validate the finding against a disposable fixture, repeatable calculation, or independent data lookup; compare current and proposed behavior and mark unknowns explicitly.
5. Produce do not state that every route was examined if a data source or runtime system was unavailable. with evidence references, confirmed-versus-proposed status, affected IDs, assumptions, confidence, and the next safe action.

## Validation checklist

- [ ] The target version and evidence source are recorded; unknown version details are not guessed.
- [ ] The topic-specific behavior or data relationship has a reproducible check.
- [ ] Inputs, quantities, units, gates, or other assumptions relevant to the decision are explicit.
- [ ] Proposed values are distinguished from confirmed values and include rationale or a review-needed status.
- [ ] No production config/world is changed without backup, scoped diff, and rollback path.

## Required output

Do not state that every route was examined if a data source or runtime system was unavailable.

## Boundaries and failure handling

A modded resource is being classified for an EMC baseline. If recipe, registry, format, or runtime evidence is incomplete, mark the result unknown and name the smallest additional evidence needed. Do not claim universal coverage or successful balancing without measurable validation.

## Trigger examples

- **Positive:** The item has no acquisition route relevant to EMC policy.
- **Negative:** undefined
