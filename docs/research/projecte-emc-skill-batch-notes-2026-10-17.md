# ProjectE / EMC skill batch notes — 2026-10-17

## Purpose

This document describes the 100 ProjectE-oriented skill workflows added in the 1,500-skill draft stack. They cover evidence-based inventory, candidate EMC derivation, progression/economy policy, exploit detection, and release validation.

## Categories

- **40 inventory/EMC assignment workflows:** runtime registry snapshot, coverage ledger, missing-item triage, material equivalence, recipe graph and yield analysis, stateful variants, configuration schema discovery, source-confidence tracking.
- **25 progression/economy workflows:** progression bands and curves, renewable and finite sources, dimension and exploration gates, tech/magic parity, automation throughput, server profile, and gameplay acceptance scenarios.
- **20 exploits/integration workflows:** recipe cycles, reversible conversion gain, alternate recipes, byproduct chains, renewable-to-gated resource paths, container/state laundering, storage network loops, and regression fixtures.
- **15 audit/validation workflows:** registry/config coverage, server/client parity, config diffs, parser tests, runtime sample lookups, version migration, release integrity, rollback, and final coverage reports.

## Evidence boundary

The branch adds procedural skills, not actual EMC assignments or a claim that a real modpack has been balanced. Before editing EMC config, the operator must confirm the installed Minecraft, loader, ProjectE artifact/version, registry IDs, and supported config/schema from the target installation. Unknown item values remain proposals or unresolved records until there is source evidence and, where required, an in-game or disposable-fixture test.

The exact current config path, installed ProjectE version, actual item inventory coverage, and gameplay balance have **not** been verified by this skill batch. The workflows require backups, scoped diffs, exclusions/reason codes, and rollback evidence for changes.

## Required acceptance evidence

1. Unique canonical skill IDs with corresponding source and generated package files.
2. Catalog, batch manifest, version, README, and category counts reconciled.
3. Actual repository sync and batch validator output captured from a clean checkout.
4. ProjectE runtime/schema and pack-specific tests performed before using the skills to make real config changes.
5. Source/license/provenance review completed as required by repository policy.
