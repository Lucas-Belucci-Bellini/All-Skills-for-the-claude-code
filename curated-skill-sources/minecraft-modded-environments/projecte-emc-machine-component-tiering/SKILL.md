---
name: projecte-emc-machine-component-tiering
description: "Reviews EMC relationships among machine parts and technology tiers. Use when circuit boards, gears, motors, or processors span multiple mods."
---

# ProjectE Machine Component Tiering

## Purpose

Trace recipe dependencies and technological gates for each component.

## Required inputs

Machine recipes, material equivalents, energy/time cost, tier gates, and item IDs.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and configuration sources. If version evidence is unavailable, stop before proposing changes.
2. Group by function and technology tier, preserving alternatives and custom pack recipes.
3. Check whether a low-tier route or cheap machine yields a high-tier component with an unintended valuation.
4. Validate findings with a disposable fixture or independent lookup, compare current and proposed behavior, and mark unresolved data rather than filling gaps with assumptions.
5. Produce a tier table with role, prerequisites, recipe evidence, candidate range, and confidence. with source references, confirmed-versus-proposed status, confidence, affected IDs, and the next safe action.

## Validation checklist

- [ ] Target versions and evidence sources are recorded; unknown version details are not guessed.
- [ ] Item identifiers and quantities are confirmed against target registry/config rather than display names alone.
- [ ] The topic-specific behavior has an observable reproduction or data check.
- [ ] Proposed values are distinct from confirmed values and include a justification or a clear review-needed state.
- [ ] No production world/config is changed without backup, scoped diff, and rollback path.

## Required output

A tier table with role, prerequisites, recipe evidence, candidate range, and confidence.

## Boundaries and failure handling

Do not assign values based only on namespace or visual complexity. If registry, recipe, format, or runtime evidence is incomplete, mark the result unknown and state the smallest additional evidence needed. Do not claim that all EMC values are configured or balanced without measurable coverage and validation.

## Trigger examples

- **Positive:** Basic circuits and advanced processors need consistent progression policy.
- **Negative:** The item has no verified technology or machine role.
