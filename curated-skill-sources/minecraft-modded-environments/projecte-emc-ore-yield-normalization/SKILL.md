---
name: projecte-emc-ore-yield-normalization
description: "Normalizes expected yield across raw ores, silk-touch blocks, processed outputs, and bonus drops. Use when ore yield changes EMC economics."
---

# Ore and Raw Resource Yield Normalization

## Purpose

loot tables, fortune/silk-touch rules, processing recipes, item variants, and current pack settings

## Required inputs

List ordinary, bonus, and alternate yield routes supported by the target pack and game rules.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and config sources. If version evidence is unavailable, stop before proposing changes.
2. Calculate value per input block under defined scenarios and flag configurations that enable excessive yield.
3. A yield-normalization table with scenario assumptions and value-per-input results.
4. Validate the finding against a disposable fixture, repeatable calculation, or independent data lookup; compare current and proposed behavior and mark unknowns explicitly.
5. Produce do not treat random maximum drops as guaranteed yield; report expected and worst-case scenarios separately. with evidence references, confirmed-versus-proposed status, affected IDs, assumptions, confidence, and the next safe action.

## Validation checklist

- [ ] The target version and evidence source are recorded; unknown version details are not guessed.
- [ ] The topic-specific behavior or data relationship has a reproducible check.
- [ ] Inputs, quantities, units, gates, or other assumptions relevant to the decision are explicit.
- [ ] Proposed values are distinguished from confirmed values and include rationale or a review-needed status.
- [ ] No production config/world is changed without backup, scoped diff, and rollback path.

## Required output

Do not treat random maximum drops as guaranteed yield; report expected and worst-case scenarios separately.

## Boundaries and failure handling

A modded ore produces raw chunks, bonus dust, or multiple drops. If recipe, registry, format, or runtime evidence is incomplete, mark the result unknown and name the smallest additional evidence needed. Do not claim universal coverage or successful balancing without measurable validation.

## Trigger examples

- **Positive:** The item has no alternate yield or processing route.
- **Negative:** undefined
