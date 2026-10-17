---
name: projecte-emc-tool-durability-policy
description: "Audits interactions between EMC and damageable equipment. Use when pristine, damaged, enchanted, or modified tool states may differ."
---

# ProjectE Tool and Durability Policy

## Purpose

Determine what state the installed implementation uses for EMC lookup.

## Required inputs

Item serialization, durability APIs, repair/craft recipes, and ProjectE version.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and configuration sources. If version evidence is unavailable, stop before proposing changes.
2. Test representative pristine and damaged variants using disposable fixtures.
3. Check conversion, repair, state reset, and enchantment retention for value laundering.
4. Validate findings with a disposable fixture or independent lookup, compare current and proposed behavior, and mark unresolved data rather than filling gaps with assumptions.
5. Produce a state-handling matrix with observed behavior, test cases, and safe exceptions. with source references, confirmed-versus-proposed status, confidence, affected IDs, and the next safe action.

## Validation checklist

- [ ] Target versions and evidence sources are recorded; unknown version details are not guessed.
- [ ] Item identifiers and quantities are confirmed against target registry/config rather than display names alone.
- [ ] The topic-specific behavior has an observable reproduction or data check.
- [ ] Proposed values are distinct from confirmed values and include a justification or a clear review-needed state.
- [ ] No production world/config is changed without backup, scoped diff, and rollback path.

## Required output

A state-handling matrix with observed behavior, test cases, and safe exceptions.

## Boundaries and failure handling

Do not assume durability is ignored or included; verify actual lookup behavior. If registry, recipe, format, or runtime evidence is incomplete, mark the result unknown and state the smallest additional evidence needed. Do not claim that all EMC values are configured or balanced without measurable coverage and validation.

## Trigger examples

- **Positive:** A damaged tool might transmute back to a pristine tool at the same value.
- **Negative:** The item has no stateful variants and that is confirmed.
