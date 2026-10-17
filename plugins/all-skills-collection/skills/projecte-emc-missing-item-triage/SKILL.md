---
name: projecte-emc-missing-item-triage
description: "Classifies items that have no usable EMC assignment. Use when a coverage report contains missing, zero, or unrecognized entries."
---

# ProjectE Missing EMC Item Triage

## Purpose

Separate accidental gaps from deliberate exclusions and parsing failures.

## Required inputs

Registry IDs, current EMC lookup, tags, recipes, acquisition source, and parser result.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and configuration sources. If version evidence is unavailable, stop before proposing changes.
2. Distinguish absent keys, explicit zero, malformed identifiers, stateful items, and items intentionally excluded by policy.
3. Trace each candidate through source recipes and gates; assign a reason code and next action.
4. Validate findings with a disposable fixture or independent lookup, compare current and proposed behavior, and mark unresolved data rather than filling gaps with assumptions.
5. Produce a triage table with evidence, reason codes, suggested action, and confidence for each item. with source references, confirmed-versus-proposed status, confidence, affected IDs, and the next safe action.

## Validation checklist

- [ ] Target versions and evidence sources are recorded; unknown version details are not guessed.
- [ ] Item identifiers and quantities are confirmed against target registry/config rather than display names alone.
- [ ] The topic-specific behavior has an observable reproduction or data check.
- [ ] Proposed values are distinct from confirmed values and include a justification or a clear review-needed state.
- [ ] No production world/config is changed without backup, scoped diff, and rollback path.

## Required output

A triage table with evidence, reason codes, suggested action, and confidence for each item.

## Boundaries and failure handling

Do not auto-fill all missing entries with a default; zero and intentional exclusion must remain distinguishable. If registry, recipe, format, or runtime evidence is incomplete, mark the result unknown and state the smallest additional evidence needed. Do not claim that all EMC values are configured or balanced without measurable coverage and validation.

## Trigger examples

- **Positive:** A mod update adds items that appear in the missing-EMC report.
- **Negative:** All target items have verified assignments and missing-entry triage is not needed.
