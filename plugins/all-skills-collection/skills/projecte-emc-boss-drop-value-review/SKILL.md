---
name: projecte-emc-boss-drop-value-review
description: "Evaluates EMC policy for boss drops and rare encounter rewards. Use when EMC may remove encounter incentives."
---

# ProjectE Boss Drop Value Review

## Purpose

Verify drop source, repeatability, reward quantity, and progression role.

## Required inputs

Drop tables, boss prerequisites, respawn policy, alternate recipes, quests, and item IDs.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and configuration sources. If version evidence is unavailable, stop before proposing changes.
2. Capture the encounter's actual reward route and any unlocks attached to it.
3. Compare value with items of the same progression tier and find recipes bypassing the encounter.
4. Validate findings with a disposable fixture or independent lookup, compare current and proposed behavior, and mark unresolved data rather than filling gaps with assumptions.
5. Produce a boss-reward register with sourced drop data, gate status, and playtest questions. with source references, confirmed-versus-proposed status, confidence, affected IDs, and the next safe action.

## Validation checklist

- [ ] Target versions and evidence sources are recorded; unknown version details are not guessed.
- [ ] Item identifiers and quantities are confirmed against target registry/config rather than display names alone.
- [ ] The topic-specific behavior has an observable reproduction or data check.
- [ ] Proposed values are distinct from confirmed values and include a justification or a clear review-needed state.
- [ ] No production world/config is changed without backup, scoped diff, and rollback path.

## Required output

A boss-reward register with sourced drop data, gate status, and playtest questions.

## Boundaries and failure handling

Do not claim drop chances or boss order unless target pack data confirms them. If registry, recipe, format, or runtime evidence is incomplete, mark the result unknown and state the smallest additional evidence needed. Do not claim that all EMC values are configured or balanced without measurable coverage and validation.

## Trigger examples

- **Positive:** A repeatable boss reward may become cheap via EMC.
- **Negative:** The item is not an encounter reward and there is no recorded boss source.
