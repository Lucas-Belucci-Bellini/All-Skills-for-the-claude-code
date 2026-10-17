---
name: atm10-world-save-recovery-preflight
description: "Assess an ATM10 world or player-data failure and prepare a non-destructive recovery test using backups, copied saves, and evidence-based scope."
---

# ATM10 World Save Recovery Preflight

## Purpose

Protect world data while determining whether a reported failure is caused by a save, a player record, a chunk, a mod migration, or the surrounding runtime.

## Required inputs

Symptom and reproduction steps, world folder structure, relevant logs/crash reports, recent mod/config changes, Minecraft/loader versions, and known backup dates. Avoid uploading private player data unnecessarily.

## Workflow

1. Stop the game/server cleanly if safe, preserve the original save, and create a verified copy before any recovery attempt.
2. Classify the symptom: world fails to open, one player cannot join, one dimension/chunk crashes, missing registry data, repeated tick exception, or suspected corruption.
3. Compare logs and recent changes to identify the narrowest affected scope; do not assume the entire save is corrupt because one chunk or player fails.
4. Check version and mod-set drift between the save's last known good session and the current instance, including removed mods and data migrations.
5. Reproduce against a copy, changing one relevant factor at a time; keep a clean copy untouched for rollback.
6. If testing region/chunk/player-data repair is justified, document the exact target file, expected side effects, and restoration procedure before the test.
7. Verify world load, player inventory/location, dimensions, affected chunks, and server/client behavior before declaring recovery successful.

## Validation checklist

- [ ] Original save remains untouched and a separate working copy exists.
- [ ] The backup's integrity and timestamp are recorded.
- [ ] Failure scope is narrowed before any file-level repair.
- [ ] Mod removals/migrations are considered as possible causes.
- [ ] Recovery tests are repeatable and each file-level action is reversible.
- [ ] Success criteria include relevant player/world state, not merely reaching the title screen.

## Required output

Provide a recovery preflight with save-copy locations, verified backup point, failure scope, hypotheses, test sequence, file-level changes if any, post-recovery checks, and rollback instructions.

## Boundaries and failure handling

Never recommend deleting the original world, region files, player data, or dimensions as an initial step. If no reliable backup exists, pause before destructive repair and explain the risk.

## Trigger examples

- **Positive:** An ATM10 world crashes on loading one dimension after a mod was removed.
- **Negative:** A user asks how to create a new world and reports no existing-save failure.
