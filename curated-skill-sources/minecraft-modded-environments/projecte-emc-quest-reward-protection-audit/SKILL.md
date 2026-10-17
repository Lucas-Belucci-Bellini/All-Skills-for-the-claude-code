---
name: projecte-emc-quest-reward-protection-audit
description: "Finds quest and achievement rewards whose EMC might bypass a milestone. Use when items are granted for completed progression steps."
---

# ProjectE Quest Reward Protection Audit

## Purpose

Map each reward to its quest/advancement and downstream unlock effects.

## Required inputs

Quest definitions, reward tables, item registry, and recipe graph.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and configuration sources. If version evidence is unavailable, stop before proposing changes.
2. Link each reward to its exact quest step and determine if it gates subsequent progression.
3. Classify intended availability and document any exception or request for design review.
4. Validate findings with a disposable fixture or independent lookup, compare current and proposed behavior, and mark unresolved data rather than filling gaps with assumptions.
5. Produce a reward-protection matrix with quest references, effect analysis, and review decision. with source references, confirmed-versus-proposed status, confidence, affected IDs, and the next safe action.

## Validation checklist

- [ ] Target versions and evidence sources are recorded; unknown version details are not guessed.
- [ ] Item identifiers and quantities are confirmed against target registry/config rather than display names alone.
- [ ] The topic-specific behavior has an observable reproduction or data check.
- [ ] Proposed values are distinct from confirmed values and include a justification or a clear review-needed state.
- [ ] No production world/config is changed without backup, scoped diff, and rollback path.

## Required output

A reward-protection matrix with quest references, effect analysis, and review decision.

## Boundaries and failure handling

Do not assume every reward must be untransmutable; record the actual design intent. If registry, recipe, format, or runtime evidence is incomplete, mark the result unknown and state the smallest additional evidence needed. Do not claim that all EMC values are configured or balanced without measurable coverage and validation.

## Trigger examples

- **Positive:** A quest reward is required to complete a major progression stage.
- **Negative:** No quest or milestone relationship is found.
