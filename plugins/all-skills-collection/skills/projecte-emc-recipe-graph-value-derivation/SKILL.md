---
name: projecte-emc-recipe-graph-value-derivation
description: "Builds a transparent recipe graph to propose EMC from related materials. Use when a material family has incomplete values."
---

# ProjectE EMC Recipe Graph Value Derivation

## Purpose

Derive candidate values from verified recipe edges and known anchor values.

## Required inputs

Recipe graph, quantities, existing anchor EMC values, and transformation types.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and configuration sources. If version evidence is unavailable, stop before proposing changes.
2. Choose verified anchors and derive candidate intervals with explicit loss, time, risk, and gating assumptions.
3. Detect cycles, conflicting paths, missing anchors, and underdetermined nodes before producing a recommendation.
4. Validate findings with a disposable fixture or independent lookup, compare current and proposed behavior, and mark unresolved data rather than filling gaps with assumptions.
5. Produce a derivation graph with equations, anchor provenance, candidate ranges, conflicts, and unresolved nodes. with source references, confirmed-versus-proposed status, confidence, affected IDs, and the next safe action.

## Validation checklist

- [ ] Target versions and evidence sources are recorded; unknown version details are not guessed.
- [ ] Item identifiers and quantities are confirmed against target registry/config rather than display names alone.
- [ ] The topic-specific behavior has an observable reproduction or data check.
- [ ] Proposed values are distinct from confirmed values and include a justification or a clear review-needed state.
- [ ] No production world/config is changed without backup, scoped diff, and rollback path.

## Required output

A derivation graph with equations, anchor provenance, candidate ranges, conflicts, and unresolved nodes.

## Boundaries and failure handling

Do not treat graph-derived estimates as official values or circular equations as independent evidence. If registry, recipe, format, or runtime evidence is incomplete, mark the result unknown and state the smallest additional evidence needed. Do not claim that all EMC values are configured or balanced without measurable coverage and validation.

## Trigger examples

- **Positive:** A maintainer wants explainable EMC candidates rather than arbitrary numbers.
- **Negative:** The graph has no verified anchor or usable recipe data.
