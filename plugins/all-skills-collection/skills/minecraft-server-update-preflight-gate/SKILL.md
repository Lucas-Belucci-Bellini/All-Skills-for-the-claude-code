---
name: minecraft-server-update-preflight-gate
description: "Use before updating a modded Minecraft server to check compatibility, backup restore evidence, config migration, and rollback; not for performing restart itself."
---

# Minecraft Server Update Preflight Gate

## Purpose

Use before updating a modded Minecraft server to check compatibility, backup restore evidence, config migration, and rollback; not for performing restart itself.

## Required inputs

Inputs: current/target pack and loader, mod/config diff, Java version, backup, maintenance window, staging results.

## Workflow

1. Fingerprint current and target loader, Java, mods, configs/defaultconfigs, scripts, and external dependencies.
2. Review removed/incompatible mods, world/data migrations, registry/content changes, and runtime constraints.
3. Restore a recent backup to an isolated copy and run target-version startup/world-load smoke tests.
4. Produce a go/no-go checklist, blockers, exceptions, rollback trigger, and responsible owner.

## Verification checklist

Checks: exact fingerprints recorded; backup restore is evidenced; config migrations reviewed; unresolved no-go blockers stop the update.

## Required output

Output: update preflight report with fingerprints, compatibility findings, restore evidence, go/no-go result and rollback conditions.

## Boundaries and failure handling

Boundary: never update a live server or valuable world during preflight; use a copied world unless authorized.

If evidence, permissions, or environment details are missing, document the limitation and don't report unrun checks as passing.

## Trigger examples

- Positive: Positive: deciding whether a modpack server can safely move to a newer release.
- Negative: Negative: recovering a crash that already occurred during an update.
