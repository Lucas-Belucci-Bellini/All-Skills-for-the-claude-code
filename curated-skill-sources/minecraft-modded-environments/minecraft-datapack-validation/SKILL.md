---
name: minecraft-datapack-validation
description: Validate Minecraft datapack structure, pack format, function/loot/recipe JSON, namespace references, and load-time warnings.
---

# Minecraft Datapack Validation

## Goal

Catch datapack errors in a controlled test world before shipping a map or modpack configuration change.

## Inputs to inspect

Datapack files, game version, pack metadata, namespaces, functions, recipes, predicates, loot tables, and server logs.

## Workflow

1. Inventory pack metadata and compare the declared format/version against the exact target game version and supported features.
2. Validate JSON syntax and schema-sensitive structures for recipes, loot tables, predicates, tags, functions, and other used resource types.
3. Check namespaced identifiers and references for missing tags/functions/items, case differences, invalid paths, and obsolete syntax.
4. Load the datapack into an isolated test world/server and inspect reload/startup logs; execute representative functions and test representative loot/recipe outcomes.
5. Add fixture worlds or automated validators for supported versions and document any behavior that requires in-game verification.

## Validation checklist

- [ ] Every file path matches the expected namespace/resource type layout.
- [ ] Pack format and target game version are explicit.
- [ ] References resolve and errors are reviewed from the actual target runtime.
- [ ] Functions and data-driven outcomes have behavior tests where applicable.
- [ ] A failed reload does not overwrite the known-good datapack distribution.

## Required output

Produce a datapack validation report, version compatibility notes, reference findings, and repeatable load/behavior test steps.

## Boundaries and failure handling

Do not assume valid JSON means valid Minecraft data; do not test destructive functions in a valuable production world.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
