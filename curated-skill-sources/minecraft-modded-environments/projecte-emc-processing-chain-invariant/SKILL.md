---
name: projecte-emc-processing-chain-invariant
description: "Checks declared value relationships between processing stages. Use when raw materials become dust, ingots, plates, crystals, or products."
---

# ProjectE EMC Processing Chain Invariant

## Purpose

Audit a processing chain for unintended value gains or unexplained losses.

## Required inputs

Verified recipe edges, quantities, byproducts, process costs, and current/proposed EMC.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and configuration sources. If version evidence is unavailable, stop before proposing changes.
2. Represent each recipe as a transformation with quantities and alternate ingredients captured explicitly.
3. Calculate total input/output values and flag gains, losses, cycles, and multi-output ambiguity.
4. Validate findings with a disposable fixture or independent lookup, compare current and proposed behavior, and mark unresolved data rather than filling gaps with assumptions.
5. Produce a processing-chain report with value deltas, recipe evidence, and exception decisions. with source references, confirmed-versus-proposed status, confidence, affected IDs, and the next safe action.

## Validation checklist

- [ ] Target versions and evidence sources are recorded; unknown version details are not guessed.
- [ ] Item identifiers and quantities are confirmed against target registry/config rather than display names alone.
- [ ] The topic-specific behavior has an observable reproduction or data check.
- [ ] Proposed values are distinct from confirmed values and include a justification or a clear review-needed state.
- [ ] No production world/config is changed without backup, scoped diff, and rollback path.

## Required output

A processing-chain report with value deltas, recipe evidence, and exception decisions.

## Boundaries and failure handling

Do not require equal EMC for every recipe; intentional losses and progression gates need documented exceptions. If registry, recipe, format, or runtime evidence is incomplete, mark the result unknown and state the smallest additional evidence needed. Do not claim that all EMC values are configured or balanced without measurable coverage and validation.

## Trigger examples

- **Positive:** A machine chain converts cheap inputs into a high-value component.
- **Negative:** Recipe outputs or quantities cannot be confirmed.
