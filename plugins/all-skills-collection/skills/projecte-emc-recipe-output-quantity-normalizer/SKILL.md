---
name: projecte-emc-recipe-output-quantity-normalizer
description: "Normalizes recipe inputs, output counts, remainders, and chance-based results before deriving EMC. Use when different recipes are compared or evaluated for value loops."
---

# ProjectE Recipe Output Quantity Normalizer

## Purpose

Create a normalized recipe record with quantity units and output semantics.

## Required inputs

Recipe JSON/data, input quantities, output counts, remainders, chance data, and recipe type.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and configuration sources. If version evidence is unavailable, stop before proposing changes.
2. Convert each recipe into a typed record preserving shaped/shapeless inputs, alternatives, output count, and probabilistic/byproduct fields.
3. Compare equivalent recipes using normalized quantities and reject calculations with unknown or unsupported semantics.
4. Validate findings with a disposable fixture or independent lookup, compare current and proposed behavior, and mark unresolved data rather than filling gaps with assumptions.
5. Produce a normalized recipe ledger with exact source paths, calculated ratios, and records needing manual interpretation. with source references, confirmed-versus-proposed status, confidence, affected IDs, and the next safe action.

## Validation checklist

- [ ] Target versions and evidence sources are recorded; unknown version details are not guessed.
- [ ] Item identifiers and quantities are confirmed against target registry/config rather than display names alone.
- [ ] The topic-specific behavior has an observable reproduction or data check.
- [ ] Proposed values are distinct from confirmed values and include a justification or a clear review-needed state.
- [ ] No production world/config is changed without backup, scoped diff, and rollback path.

## Required output

A normalized recipe ledger with exact source paths, calculated ratios, and records needing manual interpretation.

## Boundaries and failure handling

Do not assume one input produces one output or ignore remainders and probability. If registry, recipe, format, or runtime evidence is incomplete, mark the result unknown and state the smallest additional evidence needed. Do not claim that all EMC values are configured or balanced without measurable coverage and validation.

## Trigger examples

- **Positive:** A compressed recipe or machine recipe has unusual output counts.
- **Negative:** The recipe schema cannot be read and no safe normalized representation exists.
