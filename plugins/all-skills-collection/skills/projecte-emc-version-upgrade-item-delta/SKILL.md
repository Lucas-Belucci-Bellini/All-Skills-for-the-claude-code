---
name: projecte-emc-version-upgrade-item-delta
description: "Maps item and value impacts across a version upgrade. Use when Minecraft, loader, ProjectE, or an item-producing mod updates."
---

# ProjectE Version Upgrade Item Delta

## Purpose

old/new registry snapshots, old/new config schemas, migration notes, and EMC maps

## Required inputs

Classify removed, renamed, added, changed, and equivalent IDs without assuming identical semantics.

## Workflow

1. Confirm actual Minecraft, loader, ProjectE, and modpack versions; identify the exact config files and registry snapshot. Do not write to production paths while gathering evidence.
2. Check old EMC assignments against new recipe/state behavior and create a migration review list.
3. A version-delta report with mapping confidence and items needing revaluation.
4. Validate the conclusion with a reproducible parse, comparison, disposable fixture, or reviewer record; label anything not run as blocked or unverified.
5. Produce do not migrate an id to a similarly named item without evidence of equivalence. with exact version, candidate digest where available, and an actionable pass/fail/blocked status.

## Validation checklist

- [ ] Exact environment and config version are documented.
- [ ] Inputs reconcile to the registry, proposed diff, or release artifact under review.
- [ ] Validation evidence is recorded and unexecuted checks are not marked passed.
- [ ] Exclusions, parser failures, uncertainty, and human decisions remain explicit.
- [ ] Changes are reversible and do not modify production data without authorization.

## Required output

Do not migrate an ID to a similarly named item without evidence of equivalence.

## Boundaries and failure handling

An update changes IDs or recipe behavior and old EMC keys may be stale. If the required environment, files, parser, or reviewer is unavailable, return a partial report with precise blockers rather than claiming completion.

## Trigger examples

- **Positive:** No version transition or item registry delta exists.
- **Negative:** undefined
