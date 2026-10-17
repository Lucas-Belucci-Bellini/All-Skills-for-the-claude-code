---
name: projecte-emc-renewable-finite-classification
description: "Classifies resource acquisition routes before assigning EMC. Use when renewable farms may feed high-value products."
---

# ProjectE Renewable Versus Finite Resource Classification

## Purpose

Separate renewable, finite, gated, probabilistic and unknown resource routes.

## Required inputs

Sources, recipes, farming rates, spawning conditions, and pack configuration.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and configuration sources. If version evidence is unavailable, stop before proposing changes.
2. Enumerate known acquisition routes and label each by repeatability and prerequisites.
3. Search for alternative routes through farms, mobs, trades, seeds, and machine conversions.
4. Validate findings with a disposable fixture or independent lookup, compare current and proposed behavior, and mark unresolved data rather than filling gaps with assumptions.
5. Produce a resource-source matrix with evidence, repeatability, and valuation implications. with source references, confirmed-versus-proposed status, confidence, affected IDs, and the next safe action.

## Validation checklist

- [ ] Target versions and evidence sources are recorded; unknown version details are not guessed.
- [ ] Item identifiers and quantities are confirmed against target registry/config rather than display names alone.
- [ ] The topic-specific behavior has an observable reproduction or data check.
- [ ] Proposed values are distinct from confirmed values and include a justification or a clear review-needed state.
- [ ] No production world/config is changed without backup, scoped diff, and rollback path.

## Required output

A resource-source matrix with evidence, repeatability, and valuation implications.

## Boundaries and failure handling

Do not call a resource finite just because its obvious source is mining. If registry, recipe, format, or runtime evidence is incomplete, mark the result unknown and state the smallest additional evidence needed. Do not claim that all EMC values are configured or balanced without measurable coverage and validation.

## Trigger examples

- **Positive:** A farmed item can be processed into a resource intended to require exploration.
- **Negative:** No acquisition route or repeatability is in scope.
