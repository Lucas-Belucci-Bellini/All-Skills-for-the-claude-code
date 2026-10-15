---
name: mod-loader-compatibility-matrix
description: "Builds a mod compatibility matrix for Minecraft loaders and game versions. Use when deciding whether a mod belongs in a client pack, server pack, or mixed distribution."
---

# Mod Loader Compatibility Matrix

## Use when
Mods are combined based on matching game version labels while loader, side, dependency, Java, and optional integration differences are ignored.

## Workflow
1. Extract the exact artifact ID, release version, loader, game version, side, dependencies, incompatibilities, and Java range for each mod.
2. Classify entries as client-only, server-only, required on both sides, optional integration, or unknown pending verification.
3. Cross-check duplicates and mod-specific configuration assumptions against trusted metadata and upstream release notes.
4. Generate a matrix for the target pack and flag conflicts rather than automatically deleting or substituting artifacts.

## Required output
A machine-readable compatibility table, source links, unresolved items, and client/server packaging recommendation.

## Validation
- Each matrix row identifies the exact artifact/version and evidence source.
- Optional integrations are not treated as mandatory dependencies without evidence.
- Unknown compatibility stays unknown until tested.

## Guardrails
Do not download replacement jars from untrusted mirrors or silently substitute different artifacts.
