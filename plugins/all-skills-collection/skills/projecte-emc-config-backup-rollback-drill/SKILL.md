---
name: projecte-emc-config-backup-rollback-drill
description: "Proves that an EMC config change can be reversed safely. Use before replacing or bulk-editing values."
---

# ProjectE Config Backup and Rollback Drill

## Purpose

baseline config, proposed patch, test instance, restore procedure, and expected hashes

## Required inputs

Preserve a read-only baseline and verify its hash before applying the patch to a disposable copy.

## Workflow

1. Confirm actual Minecraft, loader, ProjectE, and modpack versions; identify the exact config files and registry snapshot. Do not write to production paths while gathering evidence.
2. Apply and roll back the change in a test environment, then compare restored bytes and effective settings.
3. A rollback record with baseline/candidate hashes, commands, result, and unresolved recovery risks.
4. Validate the conclusion with a reproducible parse, comparison, disposable fixture, or reviewer record; label anything not run as blocked or unverified.
5. Produce never overwrite the only copy of a live config or world data during the drill. with exact version, candidate digest where available, and an actionable pass/fail/blocked status.

## Validation checklist

- [ ] Exact environment and config version are documented.
- [ ] Inputs reconcile to the registry, proposed diff, or release artifact under review.
- [ ] Validation evidence is recorded and unexecuted checks are not marked passed.
- [ ] Exclusions, parser failures, uncertainty, and human decisions remain explicit.
- [ ] Changes are reversible and do not modify production data without authorization.

## Required output

Never overwrite the only copy of a live config or world data during the drill.

## Boundaries and failure handling

A bulk EMC update needs a verified recovery path. If the required environment, files, parser, or reviewer is unavailable, return a partial report with precise blockers rather than claiming completion.

## Trigger examples

- **Positive:** No configuration change will be applied.
- **Negative:** undefined
