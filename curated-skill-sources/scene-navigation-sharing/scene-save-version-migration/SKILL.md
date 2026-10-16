---
name: scene-save-version-migration
description: "Design and test versioned migrations for saved scenes as camera, layer, and replay schemas evolve."
---

# Scene Save Version Migration

## Purpose

Preserve old user-created scenes where safe and report when a migration cannot retain important meaning.

## Required inputs

Current and prior scene schemas, migration functions, representative saved fixtures, and compatibility promises.

## Workflow

1. Document schema versions and changes to renamed, removed, split, or reinterpreted fields.
2. Implement explicit one-version-at-a-time migrations that preserve source data until validation succeeds.
3. Run fixtures from every supported historical version through migration and current-schema validation.
4. Test rollback or recoverable backup when migration fails midway or encounters an unknown required field.

## Validation checklist

- [ ] Migration order is deterministic and repeatable.
- [ ] No unsupported version is silently accepted as current.
- [ ] Unrecognized optional fields are preserved or documented; required semantics trigger a clear failure.
- [ ] User data is not overwritten until the migrated representation validates.

## Required output

A version compatibility table, fixtures, migration test results, and a recovery strategy for invalid saves.

## Boundaries and failure handling

Do not discard fields just because the latest UI does not display them; prove they are obsolete before removing data.

## Trigger examples

- **Positive:** A new scene schema renames layer state and old saved scenes need to remain readable.
- **Negative:** A request to migrate all user files destructively without backups or version detection.
