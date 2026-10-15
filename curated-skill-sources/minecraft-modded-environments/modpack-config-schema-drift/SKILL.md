---
name: modpack-config-schema-drift
description: Detect config schema drift after mod updates, including renamed keys, changed defaults, removed options, and silent regeneration.
---

# modpack config schema drift

## Goal

Avoid believing an old configuration is still applied when the mod now expects a different schema.

## Inputs to inspect

Before/after config folders, mod versions, generated defaults, loader versions, logs, and the original config intent.

## Workflow

1. Capture a baseline of config paths and exact values before updating mods; record mod and loader versions alongside each snapshot.
2. Compare config schemas across the two versions, separating key additions/removals, type changes, renamed options, and default changes.
3. Trace each important setting to the owning mod's documentation or source when available; mark uncertain semantics instead of guessing from a key name.
4. Perform a staged launch with the updated mod, inspect regenerated files and warnings, and compare the effective configuration to the intended policy.
5. Create a reviewed migration map for changed keys and test world-affecting options on a copy before rollout.

## Validation checklist

- [ ] Old values are preserved in a diff before regeneration or migration.
- [ ] Unknown and removed keys are surfaced rather than silently discarded.
- [ ] Changed defaults are distinguished from explicit user configuration.
- [ ] The effective post-start configuration is captured and reviewed.
- [ ] World-impacting options have staging tests and a rollback snapshot.

## Required output

Deliver a schema-drift report, per-key migration mapping, evidence links, tested effective configuration, and unresolved semantic questions.

## Boundaries and failure handling

Do not assume an absent key means disabled; do not mass-copy legacy config files into a new version without checking schema changes.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
