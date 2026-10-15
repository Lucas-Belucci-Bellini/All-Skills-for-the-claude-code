---
name: modpack-config-diff-review
description: Review configuration changes in a custom Minecraft modpack for unintended gameplay, compatibility, performance, and migration effects.
---

# Modpack Config Diff Review

## Goal

Explain exactly what changed between two modpack configurations and determine whether each change is safe and intentional.

## Inputs to inspect

Before/after config directories, mod versions, loader/game version, affected gameplay systems, and change rationale.

## Workflow

1. Inventory files in both snapshots and classify additions, removals, renames, formatting-only changes, and semantic value changes. Preserve paths and exact values.
2. Normalize only syntax that is provably irrelevant, such as whitespace or key ordering, and keep the original diff available for review.
3. For each changed setting, determine the owning mod/version, default value if available, units, scope (client/server/world), and whether it is read at startup or persisted in world data.
4. Trace dependent settings and known incompatibilities. Review changes to world generation, item IDs, recipe behavior, machine throughput, entity limits, networking, and security-sensitive endpoints with extra care.
5. Run a staged startup and representative gameplay test using a copied instance/world; verify logs, config regeneration, and client/server agreement.

## Validation checklist

- [ ] The diff preserves exact old/new values and makes unknown keys explicit.
- [ ] Version changes are not mistaken for config-only changes.
- [ ] World-affecting settings are flagged before rollout to existing worlds.
- [ ] A test confirms whether an absent value means default, migration, or disabled behavior.
- [ ] The proposed change has a rollback and does not overwrite user-specific configuration silently.

## Required output

Produce a table of changed path/key, old value, new value, meaning, risk, required test, approval state, and rollback instruction.

## Boundaries and failure handling

Do not infer a setting's meaning from its name alone; do not overwrite configs in bulk without capturing a recoverable baseline.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
