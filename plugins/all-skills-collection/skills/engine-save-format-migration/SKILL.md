---
name: engine-save-format-migration
description: Plan backward-compatible save-game schema changes with version detection, transactional migration, recovery, and fixture-based regression tests.
---

# Engine Save Format Migration

## Goal

Ensure new engine versions can read supported older saves without silent data loss or corrupting the only copy of user progress.

## Inputs to inspect

Save schema versions, serialization format, entity/component persistence rules, stable identifiers, migration history, representative save fixtures, and recovery policy.

## Workflow

1. Document the current schema and supported source versions; distinguish file-format version from game-content or mod version.
2. Identify required, optional, renamed, split, merged, and removed fields. Define deterministic defaults and explicit handling for unknown fields.
3. Implement one migration step per version boundary where practical, with preconditions, postconditions, and an observable migration result.
4. Write migrated data to a temporary destination, validate checksums and structural invariants, then atomically replace the active save where the platform supports it.
5. Preserve the original save or a recoverable backup until the migrated file has passed validation and the new file is durably committed.
6. Test fixtures for every supported historical version, truncated/corrupt input, missing optional fields, unknown fields, interrupted migration, and repeated migration attempts.
7. Make downgrade behavior explicit: reject safely, export a compatible snapshot, or support a tested reverse migration. Never silently rewrite a newer save as an older schema.

## Validation checklist

- [ ] Each supported old schema has a fixture and an expected migrated result.
- [ ] Migration is idempotent or detects that the destination is already migrated.
- [ ] Failure leaves at least one recoverable valid copy of the original data.
- [ ] Unknown-version and corruption paths produce actionable errors without overwriting user data.

## Required output

A migration design, version compatibility table, fixture inventory, recovery procedure, and release gate.

## Boundaries and failure handling

Do not test migrations against a user's only save. Use copied fixtures and state clearly when atomic replacement or durability guarantees depend on the filesystem.

When repository evidence is incomplete, label the gap and request only information that changes the decision. Do not claim tests, benchmarks, hardware validation, or runtime checks passed unless their outputs were observed.
