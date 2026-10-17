---
name: projecte-emc-missing-coverage-regression
description: "Ensures that a new mod update or EMC patch does not reintroduce coverage gaps. Use after catalog changes."
---

# ProjectE Missing-Coverage Regression Test

## Purpose

baseline coverage ledger, current registry, latest EMC config, and exclusion policy

## Required inputs

Compare eligible registry entries and exception records against the latest EMC map.

## Workflow

1. Confirm actual Minecraft, loader, ProjectE, and modpack versions; identify the exact config files and registry snapshot. Do not write to production paths while gathering evidence.
2. Fail or warn by documented policy when new missing IDs, stale exclusions, or unreviewed variants appear.
3. A regression report listing new gaps, unchanged exceptions, resolved gaps, and failed reads.
4. Validate the conclusion with a reproducible parse, comparison, disposable fixture, or reviewer record; label anything not run as blocked or unverified.
5. Produce do not fail the build for a documented intentional exclusion, but require its reason to remain present. with exact version, candidate digest where available, and an actionable pass/fail/blocked status.

## Validation checklist

- [ ] Exact environment and config version are documented.
- [ ] Inputs reconcile to the registry, proposed diff, or release artifact under review.
- [ ] Validation evidence is recorded and unexecuted checks are not marked passed.
- [ ] Exclusions, parser failures, uncertainty, and human decisions remain explicit.
- [ ] Changes are reversible and do not modify production data without authorization.

## Required output

Do not fail the build for a documented intentional exclusion, but require its reason to remain present.

## Boundaries and failure handling

A mod update may introduce items not handled by the current EMC file. If the required environment, files, parser, or reviewer is unavailable, return a partial report with precise blockers rather than claiming completion.

## Trigger examples

- **Positive:** The registry and EMC table are unchanged and no regression evaluation is requested.
- **Negative:** undefined
