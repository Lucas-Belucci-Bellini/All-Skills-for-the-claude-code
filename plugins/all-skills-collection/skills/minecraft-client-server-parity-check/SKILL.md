---
name: minecraft-client-server-parity-check
description: Compare a modpack's client and dedicated-server inventories, configs, and startup behavior to detect side mismatches and accidental client-only dependencies.
---

# Minecraft Client Server Parity Check

## Goal

Ensure a modded pack runs on the intended side with compatible versions and no server startup crash caused by client-only code.

## Inputs to inspect

Client/server JAR inventories, loader/game versions, config folders, startup logs, and the modpack manifest.

## Workflow

1. Capture exact client and server mod filenames and versions plus game, loader, and Java runtimes.
2. Classify each differing artifact as expected client-only, expected server-only, shared, or unexplained; consult mod metadata/documentation when available.
3. Compare the earliest startup errors and dependency constraints, especially references to rendering, input, sound, windowing, or client classes on a dedicated server.
4. Review configs that must agree across sides and settings intentionally stored only server-side; never copy secrets or private runtime data.
5. Test startup and one representative gameplay interaction on both environments, then preserve the validated manifest for future upgrades.

## Validation checklist

- [ ] Every inventory difference has a reason or an explicit unresolved status.
- [ ] Client-only code is not loaded by the dedicated server unless the mod explicitly supports it.
- [ ] Required server-side gameplay mods are not omitted because they appear optional on the client.
- [ ] Shared config requirements and authoritative server values are documented.
- [ ] A server-side smoke test confirms the diagnosis beyond static inventory comparison.

## Required output

Create an annotated client/server inventory diff, side-compatibility matrix, startup evidence, and tested correction plan.

## Boundaries and failure handling

Do not assume identical JAR folders are required; do not classify a mod as client-only solely from its name.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
