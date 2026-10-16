---
name: minecraft-modpack-clean-install-smoke-test
description: "Verify a modpack can be imported and launched in an isolated clean instance without pre-existing configs, caches, worlds or local-only files."
---

# Minecraft Modpack Clean Install Smoke Test

## Purpose

Catch hidden dependencies on the creator's machine before distributing a modpack.

## Required inputs

Artifact/manifest, launcher, game/loader versions, Java requirement and a clean test directory.

## Workflow

1. Record artifact hash, target launcher version, game version, loader and Java runtime.
2. Create a new isolated instance with no copied configs, worlds, caches or local mods.
3. Import the artifact through the documented flow and record missing-file/dependency warnings.
4. Launch to the promised startup milestone and run only the explicitly scoped safe test.
5. Separate expected first-run downloads from reproducible failures and environment limitations.

## Validation checklist

- [ ] Test directory was clean before import.
- [ ] Tested artifact identity is recorded.
- [ ] Launch does not rely on untracked files from an old instance.
- [ ] The promised startup milestone is reached.
- [ ] Untested multiplayer/world migration scope is stated.

## Required output

Clean-install checklist, artifact identity, logs, failures and tested/untested scope.

## Boundaries and failure handling

Never overwrite the user's working instance. Reaching the title screen does not prove multiplayer or world migration works.

## Trigger examples

- **Positive:** A shared pack works on the creator's PC but fails after a new launcher import.
- **Negative:** Diagnosing a crash that only occurs in a saved world without a distribution question.
