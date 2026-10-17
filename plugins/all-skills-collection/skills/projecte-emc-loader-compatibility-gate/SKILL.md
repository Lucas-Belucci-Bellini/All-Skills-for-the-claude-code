---
name: projecte-emc-loader-compatibility-gate
description: "Checks that the selected ProjectE artifact and config assumptions match the active loader and Minecraft version. Use before editing or distributing data."
---

# ProjectE Loader Compatibility Gate

## Purpose

installed mod filenames/metadata, Minecraft version, loader build, ProjectE version, and config paths

## Required inputs

Read exact installed metadata and compare with versioned upstream documentation/source when available.

## Workflow

1. Confirm actual Minecraft, loader, ProjectE, and modpack versions; identify the exact config files and registry snapshot. Do not write to production paths while gathering evidence.
2. Validate that the chosen schema, registry access, and test commands apply to this loader/game combination.
3. A compatibility gate result with confirmed tuple, evidence, and blocked assumptions.
4. Validate the conclusion with a reproducible parse, comparison, disposable fixture, or reviewer record; label anything not run as blocked or unverified.
5. Produce do not assume a mod's latest release supports the target pack or loader. with exact version, candidate digest where available, and an actionable pass/fail/blocked status.

## Validation checklist

- [ ] Exact environment and config version are documented.
- [ ] Inputs reconcile to the registry, proposed diff, or release artifact under review.
- [ ] Validation evidence is recorded and unexecuted checks are not marked passed.
- [ ] Exclusions, parser failures, uncertainty, and human decisions remain explicit.
- [ ] Changes are reversible and do not modify production data without authorization.

## Required output

Do not assume a mod's latest release supports the target pack or loader.

## Boundaries and failure handling

Generated EMC content targets a modpack with specific Minecraft and loader versions. If the required environment, files, parser, or reviewer is unavailable, return a partial report with precise blockers rather than claiming completion.

## Trigger examples

- **Positive:** The modpack version and loader are not involved in the change.
- **Negative:** undefined
