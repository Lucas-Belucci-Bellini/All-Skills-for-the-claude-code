---
name: save-format-compatibility-fixtures
description: Build versioned save-game fixtures that verify loading, migration, and round-trip preservation across engine or content updates.
---

# Save Format Compatibility Fixtures

## Goal

Prevent new releases from silently breaking old player saves or dropping modded/world-specific fields.

## Inputs to inspect

Save schema versions, serializer/deserializer, migration functions, representative saves, and compatibility policy.

## Workflow

1. Inventory schema versions and list critical invariants such as IDs, inventories, world seed, quest state, timers, relationships, and unknown extension data.
2. Curate sanitized fixtures from old versions, edge cases, optional content, and corrupted/partial saves; record provenance and the expected load result for each.
3. Test old-to-current migration and current serialize/deserialize round trips, comparing normalized semantic state rather than raw bytes when ordering/compression varies.
4. Exercise unknown fields, removed enums, missing defaults, invalid references, and migration interruption; define whether each case is preserved, repaired, or rejected.
5. Require a fixture and documented migration strategy for every intentional breaking schema change, and set a retirement rule for obsolete fixtures.

## Validation checklist

- [ ] Fixtures cover more than the latest schema and include valid edge cases.
- [ ] Critical state and stable IDs survive migration and round trip.
- [ ] Unknown extension data follows a documented preservation/discard policy.
- [ ] Corrupt input fails safely without overwriting the source save.
- [ ] Migration changes include a rollback or backup requirement when loss is possible.

## Required output

Deliver a fixture inventory, version coverage matrix, semantic comparison rules, migration tests, and documented unsupported cases.

## Boundaries and failure handling

Do not regenerate fixtures from the current serializer alone; do not treat successful parsing as proof that semantic save data survived.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
