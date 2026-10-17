---
name: projecte-emc-runtime-sample-lookup-smoke
description: "Verifies a representative set of EMC lookups in the running modpack. Use when static config checks are insufficient to prove runtime availability."
---

# ProjectE Runtime Sample Lookup Smoke Test

## Purpose

installed instance, known sample IDs, current config, and safe test environment

## Required inputs

Select samples across vanilla, tech, magic, custom, variant, and exclusion cases using the measured registry.

## Workflow

1. Confirm actual Minecraft, loader, ProjectE, and modpack versions; identify the exact config files and registry snapshot. Do not write to production paths while gathering evidence.
2. Query or inspect each sample through supported runtime paths and compare expected assignment with observed lookup.
3. A lookup smoke report with samples, exact versions, observed values, and unavailable tests.
4. Validate the conclusion with a reproducible parse, comparison, disposable fixture, or reviewer record; label anything not run as blocked or unverified.
5. Produce do not infer runtime success from catalog presence or parse success alone. with exact version, candidate digest where available, and an actionable pass/fail/blocked status.

## Validation checklist

- [ ] Exact environment and config version are documented.
- [ ] Inputs reconcile to the registry, proposed diff, or release artifact under review.
- [ ] Validation evidence is recorded and unexecuted checks are not marked passed.
- [ ] Exclusions, parser failures, uncertainty, and human decisions remain explicit.
- [ ] Changes are reversible and do not modify production data without authorization.

## Required output

Do not infer runtime success from catalog presence or parse success alone.

## Boundaries and failure handling

A config parses but needs proof that items resolve in-game. If the required environment, files, parser, or reviewer is unavailable, return a partial report with precise blockers rather than claiming completion.

## Trigger examples

- **Positive:** Only offline static review is possible and must be reported as such.
- **Negative:** undefined
