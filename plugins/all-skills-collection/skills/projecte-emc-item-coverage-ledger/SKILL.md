---
name: projecte-emc-item-coverage-ledger
description: "Measures EMC coverage against a captured modpack item registry. Use when checking whether every eligible item has been reviewed."
---

# ProjectE EMC Item Coverage Ledger

## Purpose

Join the target registry against current EMC assignments with explicit eligibility rules.

## Required inputs

Registry snapshot, parsed config, exclusions, and parser errors.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and configuration sources. If version evidence is unavailable, stop before proposing changes.
2. Join by canonical registry IDs and preserve variant keys.
3. Classify each row as configured, missing, excluded, unreadable, duplicate, or ambiguous; calculate denominators.
4. Validate findings with a disposable fixture or independent lookup, compare current and proposed behavior, and mark unresolved data rather than filling gaps with assumptions.
5. Produce a coverage ledger with total eligible, configured, missing, excluded and unreadable counts plus per-mod breakdowns. with source references, confirmed-versus-proposed status, confidence, affected IDs, and the next safe action.

## Validation checklist

- [ ] Target versions and evidence sources are recorded; unknown version details are not guessed.
- [ ] Item identifiers and quantities are confirmed against target registry/config rather than display names alone.
- [ ] The topic-specific behavior has an observable reproduction or data check.
- [ ] Proposed values are distinct from confirmed values and include a justification or a clear review-needed state.
- [ ] No production world/config is changed without backup, scoped diff, and rollback path.

## Required output

A coverage ledger with total eligible, configured, missing, excluded and unreadable counts plus per-mod breakdowns.

## Boundaries and failure handling

Do not claim complete coverage when some namespaces, variants, files, or runtime entries could not be read. If registry, recipe, format, or runtime evidence is incomplete, mark the result unknown and state the smallest additional evidence needed. Do not claim that all EMC values are configured or balanced without measurable coverage and validation.

## Trigger examples

- **Positive:** A maintainer needs a measurable count of eligible items with or without EMC.
- **Negative:** A small change affects one known item and no completeness claim is needed.
