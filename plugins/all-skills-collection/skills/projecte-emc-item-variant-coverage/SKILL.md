---
name: projecte-emc-item-variant-coverage
description: "Checks EMC coverage across registered variants, colors, tiers, and subtypes. Use when one base item ID may represent multiple forms."
---

# ProjectE Item Variant Coverage

## Purpose

Enumerate variants from runtime or data definitions and test config selectors.

## Required inputs

Registry IDs, enumeration API, config selectors, serialized variants, and pack version.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and configuration sources. If version evidence is unavailable, stop before proposing changes.
2. Enumerate the actual variant set rather than assuming the base ID covers all states.
3. Test representative variants for exact match, inherited value, missing entry, and unintended equivalence.
4. Validate findings with a disposable fixture or independent lookup, compare current and proposed behavior, and mark unresolved data rather than filling gaps with assumptions.
5. Produce a variant coverage matrix with exact identifiers, lookup outcomes, and exceptions. with source references, confirmed-versus-proposed status, confidence, affected IDs, and the next safe action.

## Validation checklist

- [ ] Target versions and evidence sources are recorded; unknown version details are not guessed.
- [ ] Item identifiers and quantities are confirmed against target registry/config rather than display names alone.
- [ ] The topic-specific behavior has an observable reproduction or data check.
- [ ] Proposed values are distinct from confirmed values and include a justification or a clear review-needed state.
- [ ] No production world/config is changed without backup, scoped diff, and rollback path.

## Required output

A variant coverage matrix with exact identifiers, lookup outcomes, and exceptions.

## Boundaries and failure handling

Do not extrapolate coverage from one item icon or base name. If registry, recipe, format, or runtime evidence is incomplete, mark the result unknown and state the smallest additional evidence needed. Do not claim that all EMC values are configured or balanced without measurable coverage and validation.

## Trigger examples

- **Positive:** An item family has multiple subtypes with different functions.
- **Negative:** Only one stateless item identity exists.
