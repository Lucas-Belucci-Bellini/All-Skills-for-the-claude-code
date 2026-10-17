---
name: projecte-emc-inventory-container-content-audit
description: "Audits EMC behavior for items that store inventories. Use when backpacks, bags, crates, or portable storage can contain other items."
---

# ProjectE Inventory Container Content Audit

## Purpose

Check if valuable contents persist across transmutation or conversion.

## Required inputs

Inventory API, serialization samples, disposable low/high-value contents, and conversion paths.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and configuration sources. If version evidence is unavailable, stop before proposing changes.
2. Construct empty, populated, and nested-content fixtures using disposable items only.
3. Check transmutation, conversion, duplication, and extraction paths for retained contents or double-counting.
4. Validate findings with a disposable fixture or independent lookup, compare current and proposed behavior, and mark unresolved data rather than filling gaps with assumptions.
5. Produce a content-state matrix with reproduction steps and required handling policy. with source references, confirmed-versus-proposed status, confidence, affected IDs, and the next safe action.

## Validation checklist

- [ ] Target versions and evidence sources are recorded; unknown version details are not guessed.
- [ ] Item identifiers and quantities are confirmed against target registry/config rather than display names alone.
- [ ] The topic-specific behavior has an observable reproduction or data check.
- [ ] Proposed values are distinct from confirmed values and include a justification or a clear review-needed state.
- [ ] No production world/config is changed without backup, scoped diff, and rollback path.

## Required output

A content-state matrix with reproduction steps and required handling policy.

## Boundaries and failure handling

Never run destructive container tests on production inventories or worlds. If registry, recipe, format, or runtime evidence is incomplete, mark the result unknown and state the smallest additional evidence needed. Do not claim that all EMC values are configured or balanced without measurable coverage and validation.

## Trigger examples

- **Positive:** A bag may be converted while preserving valuable contents.
- **Negative:** The item cannot store contents and this is confirmed by its API.
