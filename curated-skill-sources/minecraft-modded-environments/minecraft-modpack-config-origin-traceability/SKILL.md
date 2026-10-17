---
name: minecraft-modpack-config-origin-traceability
description: "Trace effective modpack settings to defaults, shipped config, world/server overrides and launch properties without assuming universal precedence."
---

# Minecraft Modpack Config Origin Traceability

## Purpose

Explain why an effective setting has a particular value and identify the smallest reversible correction.

## Required inputs

Mod/loader versions, defaultconfigs/config, per-world and server config, environment and JVM args.

## Workflow

1. Inventory relevant config files and identify their owner and when they are read or copied.
2. Locate candidate values across defaults, shipped config, world config, server config and launch properties.
3. Verify precedence or copy-on-first-world behavior for the exact component version.
4. Compare a clean instance with the affected one without editing live world/server data.
5. Report source path, value, version, authority and confidence, then suggest the smallest reversible change.

## Validation checklist

- [ ] Every attributed value has an identified source.
- [ ] Defaults are distinguished from copied per-world settings.
- [ ] Precedence assumptions are documented or tested for the relevant version.
- [ ] Shared reports redact secrets and personal paths.
- [ ] Recommended edits state affected instance and rollback.

## Required output

Setting-origin matrix, evidence, effective-value comparison and minimal remediation plan.

## Boundaries and failure handling

Do not overwrite a live world config with defaults blindly. A file containing a value is not proof it is active.

## Trigger examples

- **Positive:** Editing config/ has no effect because the world previously copied a setting elsewhere.
- **Negative:** Comparing mod names without investigating effective settings.
