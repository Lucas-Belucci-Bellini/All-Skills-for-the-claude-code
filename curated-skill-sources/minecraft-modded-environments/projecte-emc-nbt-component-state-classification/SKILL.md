---
name: projecte-emc-nbt-component-state-classification
description: "Classifies meaningful item state before sharing EMC across variants. Use for items with energy, pattern, ownership, fluid, or custom data."
---

# ProjectE NBT and Data Component State Classification

## Purpose

Identify state fields that affect gameplay or stored value.

## Required inputs

Serialization samples, component definitions, registry data, and lookup implementation.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and configuration sources. If version evidence is unavailable, stop before proposing changes.
2. Compare representative item payloads and classify cosmetic metadata versus functional state.
3. Test whether lookup uses item ID alone or additional state; define exclusions for unsupported stateful forms.
4. Validate findings with a disposable fixture or independent lookup, compare current and proposed behavior, and mark unresolved data rather than filling gaps with assumptions.
5. Produce a state classification report with harmless metadata, gameplay state, value-bearing contents, and unknown fields. with source references, confirmed-versus-proposed status, confidence, affected IDs, and the next safe action.

## Validation checklist

- [ ] Target versions and evidence sources are recorded; unknown version details are not guessed.
- [ ] Item identifiers and quantities are confirmed against target registry/config rather than display names alone.
- [ ] The topic-specific behavior has an observable reproduction or data check.
- [ ] Proposed values are distinct from confirmed values and include a justification or a clear review-needed state.
- [ ] No production world/config is changed without backup, scoped diff, and rollback path.

## Required output

A state classification report with harmless metadata, gameplay state, value-bearing contents, and unknown fields.

## Boundaries and failure handling

Do not assign one value to meaningful states without proof they are equivalent. If registry, recipe, format, or runtime evidence is incomplete, mark the result unknown and state the smallest additional evidence needed. Do not claim that all EMC values are configured or balanced without measurable coverage and validation.

## Trigger examples

- **Positive:** A pattern, battery, bag, or container stores functional data.
- **Negative:** Only cosmetic fields differ and equivalence is verified.
