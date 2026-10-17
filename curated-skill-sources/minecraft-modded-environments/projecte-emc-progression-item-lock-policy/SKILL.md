---
name: projecte-emc-progression-item-lock-policy
description: "Identifies items whose EMC could bypass intended modpack milestones. Use for quest, boss, dimension, or technology-gated items."
---

# ProjectE Progression Item Lock Policy

## Purpose

Trace which progression steps an assignment would bypass.

## Required inputs

Progression map, quest/config files, recipes, unlock conditions, and registry IDs.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and configuration sources. If version evidence is unavailable, stop before proposing changes.
2. Trace candidates to earliest milestone and downstream unlocks; distinguish ingredient from reward.
3. Assign unrestricted, gated, protected, or human-review status with exact dependency evidence.
4. Validate findings with a disposable fixture or independent lookup, compare current and proposed behavior, and mark unresolved data rather than filling gaps with assumptions.
5. Produce a progression-lock register with affected items, reason, and proposed policy. with source references, confirmed-versus-proposed status, confidence, affected IDs, and the next safe action.

## Validation checklist

- [ ] Target versions and evidence sources are recorded; unknown version details are not guessed.
- [ ] Item identifiers and quantities are confirmed against target registry/config rather than display names alone.
- [ ] The topic-specific behavior has an observable reproduction or data check.
- [ ] Proposed values are distinct from confirmed values and include a justification or a clear review-needed state.
- [ ] No production world/config is changed without backup, scoped diff, and rollback path.

## Required output

A progression-lock register with affected items, reason, and proposed policy.

## Boundaries and failure handling

Do not set every progression item to zero automatically; follow explicit design goals and review ambiguity. If registry, recipe, format, or runtime evidence is incomplete, mark the result unknown and state the smallest additional evidence needed. Do not claim that all EMC values are configured or balanced without measurable coverage and validation.

## Trigger examples

- **Positive:** EMC could skip a major exploration or technology milestone.
- **Negative:** No meaningful prerequisite or downstream progression role is found.
