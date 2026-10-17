---
name: projecte-emc-crafting-remainder-policy
description: "Evaluates crafting remainders when assigning EMC to an item's conversion chain. Use when buckets, tools, containers, or catalysts survive crafting."
---

# Crafting Remainder Value Policy

## Purpose

recipe definitions, remainder behavior, item values, and version-specific recipe APIs

## Required inputs

Enumerate deterministic remainder items and determine whether they return reusable value or preserve a valuable state.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and config sources. If version evidence is unavailable, stop before proposing changes.
2. Recalculate inputs and outputs with remainders included, then flag double counting or omitted value.
3. A remainder-aware value report with equations, source recipe IDs, and exception decisions.
4. Validate the finding against a disposable fixture, repeatable calculation, or independent data lookup; compare current and proposed behavior and mark unknowns explicitly.
5. Produce do not ignore returned containers or catalysts when they materially alter the conversion value. with evidence references, confirmed-versus-proposed status, affected IDs, assumptions, confidence, and the next safe action.

## Validation checklist

- [ ] The target version and evidence source are recorded; unknown version details are not guessed.
- [ ] The topic-specific behavior or data relationship has a reproducible check.
- [ ] Inputs, quantities, units, gates, or other assumptions relevant to the decision are explicit.
- [ ] Proposed values are distinguished from confirmed values and include rationale or a review-needed status.
- [ ] No production config/world is changed without backup, scoped diff, and rollback path.

## Required output

Do not ignore returned containers or catalysts when they materially alter the conversion value.

## Boundaries and failure handling

A recipe consumes a filled bucket or leaves a tool/container behind. If recipe, registry, format, or runtime evidence is incomplete, mark the result unknown and name the smallest additional evidence needed. Do not claim universal coverage or successful balancing without measurable validation.

## Trigger examples

- **Positive:** The recipe has no remainder items and this is verified.
- **Negative:** undefined
