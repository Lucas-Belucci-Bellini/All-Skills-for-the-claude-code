---
name: projecte-emc-byproduct-allocation
description: "Reviews EMC policy for recipes that yield multiple products. Use for residues, slag, bonus items, fluids, or secondary drops."
---

# ProjectE EMC Byproduct Allocation

## Purpose

Check whether total output value creates an unintended multiplier.

## Required inputs

Recipe outputs, quantities, output probabilities, current values, and valuation policy.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and configuration sources. If version evidence is unavailable, stop before proposing changes.
2. Separate deterministic outputs from probabilistic products and determine their intended valuation treatment.
3. Compute total output value against inputs under best/worst relevant outcomes; identify value amplification.
4. Validate findings with a disposable fixture or independent lookup, compare current and proposed behavior, and mark unresolved data rather than filling gaps with assumptions.
5. Produce a byproduct report with per-output contribution, assumptions, and safe adjustment options. with source references, confirmed-versus-proposed status, confidence, affected IDs, and the next safe action.

## Validation checklist

- [ ] Target versions and evidence sources are recorded; unknown version details are not guessed.
- [ ] Item identifiers and quantities are confirmed against target registry/config rather than display names alone.
- [ ] The topic-specific behavior has an observable reproduction or data check.
- [ ] Proposed values are distinct from confirmed values and include a justification or a clear review-needed state.
- [ ] No production world/config is changed without backup, scoped diff, and rollback path.

## Required output

A byproduct report with per-output contribution, assumptions, and safe adjustment options.

## Boundaries and failure handling

Do not give every byproduct full value if the combined output exceeds the intended source value. If registry, recipe, format, or runtime evidence is incomplete, mark the result unknown and state the smallest additional evidence needed. Do not claim that all EMC values are configured or balanced without measurable coverage and validation.

## Trigger examples

- **Positive:** Ore processing creates several outputs from one input.
- **Negative:** The process has one known deterministic output only.
