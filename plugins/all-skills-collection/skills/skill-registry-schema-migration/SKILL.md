---
name: skill-registry-schema-migration
description: "Plans and validates backward-compatible changes to skill registry metadata. Use when adding or changing fields that multiple broker clients or catalogs consume."
---

# Skill Registry Schema Migration

## Purpose

Evolve registry metadata without silently breaking older adapters, manifests, or cached skill records.

## Required inputs

Current schema and consumers, proposed schema diff, catalog examples, migration window, compatibility policy, and rollback plan.

## Workflow

1. Inventory readers and writers of the current schema and identify which are strict, permissive, or version-pinned.
2. Classify each field change as additive optional, additive required, semantic change, rename, removal or type change; mark compatibility risk.
3. Prefer an additive transition: publish optional new fields, update consumers, measure adoption, then enforce or retire old fields only under an approved migration plan.
4. Create fixtures for old and new schemas, missing values, unknown fields, invalid enumerations, and round-trip serialization.
5. Validate catalog, broker, plugin manifests, adapters, cached records and batch manifests against the migration; document rollback boundaries.

## Validation checklist

- [ ] A compatibility matrix covers all known consumers.
- [ ] The schema version is explicit when semantic interpretation changes.
- [ ] Old-client behavior is known before required-field changes.
- [ ] Round-trip conversion preserves identity, version, provenance and safety metadata.
- [ ] Rollback restores a usable compatible schema and is tested.

## Required output

A schema migration plan, consumer matrix, fixture set, release sequence, and rollback instructions.

## Boundaries and failure handling

Do not silently reinterpret existing metadata or delete unknown fields that a newer client may need. If consumers cannot be inventoried, treat breaking changes as unsafe until scoped.

If required evidence is missing, record the gap and stop before irreversible actions. Do not claim a test, network request, compatibility result, or approval occurred unless its evidence was observed.

## Trigger examples

- **Positive:** The shared registry needs a new compatibility or provenance field consumed by Claude Code and Codex adapters.
- **Negative:** Only prose inside a single skill changes and no registry structure or consumer contract changes.
