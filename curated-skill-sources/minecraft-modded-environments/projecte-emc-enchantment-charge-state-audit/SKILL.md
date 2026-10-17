---
name: projecte-emc-enchantment-charge-state-audit
description: "Checks EMC behavior for enchanted, charged, attuned, or upgraded item states. Use when state data changes gameplay value."
---

# ProjectE Enchantment and Charge State Audit

## Purpose

Determine which component/NBT fields affect lookup and conversion.

## Required inputs

Component definitions, serialization samples, enchantment rules, charge APIs, and recipes.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and configuration sources. If version evidence is unavailable, stop before proposing changes.
2. Create representative state variants and test EMC lookup, conversion, and state retention.
3. Compare the value of the base item with charged/enchanted forms and look for free state preservation.
4. Validate findings with a disposable fixture or independent lookup, compare current and proposed behavior, and mark unresolved data rather than filling gaps with assumptions.
5. Produce a state matrix with observed lookup semantics and required policy exceptions. with source references, confirmed-versus-proposed status, confidence, affected IDs, and the next safe action.

## Validation checklist

- [ ] Target versions and evidence sources are recorded; unknown version details are not guessed.
- [ ] Item identifiers and quantities are confirmed against target registry/config rather than display names alone.
- [ ] The topic-specific behavior has an observable reproduction or data check.
- [ ] Proposed values are distinct from confirmed values and include a justification or a clear review-needed state.
- [ ] No production world/config is changed without backup, scoped diff, and rollback path.

## Required output

A state matrix with observed lookup semantics and required policy exceptions.

## Boundaries and failure handling

Do not give powered or upgraded items one shared value without testing state retention. If registry, recipe, format, or runtime evidence is incomplete, mark the result unknown and state the smallest additional evidence needed. Do not claim that all EMC values are configured or balanced without measurable coverage and validation.

## Trigger examples

- **Positive:** An item with charges may be converted while keeping its charge.
- **Negative:** The item system has no such state or the test proves it cannot affect lookup.
