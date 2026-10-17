---
name: projecte-emc-config-update-impact-audit
description: "Identifies EMC changes caused by modpack, ProjectE, loader, or datapack updates. Use before accepting an updated pack snapshot."
---

# ProjectE Config Update Impact Audit

## Purpose

before/after versions, registry snapshots, recipe graphs, configs, and release notes

## Required inputs

Diff registered IDs, recipes, schemas, and current EMC entries between the two evidenced snapshots.

## Workflow

1. Confirm actual Minecraft, loader, ProjectE, and modpack versions; identify the exact config files and registry snapshot. Do not write to production paths while gathering evidence.
2. Classify changes as added/removed/renamed items, changed recipes, parser/schema changes, and balance-impacting changes.
3. An update impact report with affected items, validation priorities, and rollback points.
4. Validate the conclusion with a reproducible parse, comparison, disposable fixture, or reviewer record; label anything not run as blocked or unverified.
5. Produce do not attribute changes to an update if the baseline version or snapshot is missing. with exact version, candidate digest where available, and an actionable pass/fail/blocked status.

## Validation checklist

- [ ] Exact environment and config version are documented.
- [ ] Inputs reconcile to the registry, proposed diff, or release artifact under review.
- [ ] Validation evidence is recorded and unexecuted checks are not marked passed.
- [ ] Exclusions, parser failures, uncertainty, and human decisions remain explicit.
- [ ] Changes are reversible and do not modify production data without authorization.

## Required output

Do not attribute changes to an update if the baseline version or snapshot is missing.

## Boundaries and failure handling

An ATM10 or ProjectE update may break old EMC mappings. If the required environment, files, parser, or reviewer is unavailable, return a partial report with precise blockers rather than claiming completion.

## Trigger examples

- **Positive:** No version/config change has occurred.
- **Negative:** undefined
