---
name: projecte-emc-boss-preparation-progression-cost
description: "Reviews how EMC affects the cost of preparing for boss encounters. Use when gear, consumables, and summoning items are exchangeable."
---

# ProjectE Boss Preparation Progression Cost

## Purpose

boss prerequisites, required gear/consumables, item EMC, crafting alternatives, and pack progression

## Required inputs

Map the verified preparation chain and identify which items are intended to require combat, crafting, or exploration.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and config sources. If version evidence is unavailable, stop before proposing changes.
2. Compare candidate EMC availability to preparation effort and flag easy skip paths without assuming a universal difficulty score.
3. A boss-preparation impact report with affected items and playtest criteria.
4. Validate the finding against a disposable fixture, repeatable calculation, or independent data lookup; compare current and proposed behavior and mark unknowns explicitly.
5. Produce do not impose arbitrary prices solely because an encounter is called a boss. with evidence references, confirmed-versus-proposed status, affected IDs, assumptions, confidence, and the next safe action.

## Validation checklist

- [ ] The target version and evidence source are recorded; unknown version details are not guessed.
- [ ] The topic-specific behavior or data relationship has a reproducible check.
- [ ] Inputs, quantities, units, gates, or other assumptions relevant to the decision are explicit.
- [ ] Proposed values are distinguished from confirmed values and include rationale or a review-needed status.
- [ ] No production config/world is changed without backup, scoped diff, and rollback path.

## Required output

Do not impose arbitrary prices solely because an encounter is called a boss.

## Boundaries and failure handling

EMC may trivialize the intended cost of gear or summoning materials. If recipe, registry, format, or runtime evidence is incomplete, mark the result unknown and name the smallest additional evidence needed. Do not claim universal coverage or successful balancing without measurable validation.

## Trigger examples

- **Positive:** The encounter has no material preparation chain that EMC affects.
- **Negative:** undefined
