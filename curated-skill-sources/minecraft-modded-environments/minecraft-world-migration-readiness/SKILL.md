---
name: minecraft-world-migration-readiness
description: Assess whether a Minecraft world can safely move between modpack revisions, loaders, or server environments.
---

# Minecraft World Migration Readiness

## Goal

Prevent world corruption or silent content loss during a modpack or server migration.

## Inputs to inspect

Source and target game/loader/mod versions, world copy, server configs, mod lists, logs, datapacks, and known breaking changes.

## Workflow

1. Freeze the source world and record checksums or a versioned backup, exact modpack manifest, loader, Java version, configs, datapacks, and server properties.
2. Compare source and target mods by stable identity and version, classifying retained, upgraded, downgraded, removed, replaced, and newly introduced content providers.
3. Identify state that may be serialized into chunks, player data, dimensions, registries, block entities, recipes, quests, and mod-specific databases. Verify migration notes for each material change.
4. Clone the world into an isolated staging server. Start it once, inspect registry/remapping and datafixer logs, then validate representative chunks, inventories, dimensions, machines, quests, and player progress.
5. Restart the staging server and repeat checks to detect migrations that fail on subsequent loads. Define explicit acceptance criteria and a rollback point before production cutover.

## Validation checklist

- [ ] A restorable pre-migration backup is verified, not merely assumed to exist.
- [ ] The test exercises existing chunks and new chunk generation where those code paths differ.
- [ ] Removed or renamed content has an explicit conversion/removal strategy.
- [ ] Registry warnings and missing mappings are reviewed before accepting the migrated world.
- [ ] Production rollback accounts for changes made after migration and prevents mixing old/new world directories.

## Required output

Create a migration decision (go, conditional go, or no-go), compatibility matrix, backup/restore proof, staging test results, known losses, and cutover/rollback checklist.

## Boundaries and failure handling

Do not test only on a disposable new world; do not launch production on the target version before verifying the backup and staging migration.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
