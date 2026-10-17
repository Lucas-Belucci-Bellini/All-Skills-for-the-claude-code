---
name: projecte-emc-duplicate-recipe-provenance-check
description: "Finds duplicated or competing recipes that distort an EMC calculation. Use when multiple datapacks or mods define the same conversion."
---

# Duplicate Recipe Provenance Check

## Purpose

recipe IDs, datapack priority, source files, actual loaded recipe list, and config values

## Required inputs

Identify competing definitions and establish which recipe is active at runtime.

## Workflow

1. Confirm actual Minecraft, loader, ProjectE, and modpack versions; identify the exact config files and registry snapshot. Do not write to production paths while gathering evidence.
2. Calculate each path separately and check whether disabled/overridden recipes were incorrectly counted as available.
3. A recipe provenance report with priority order, active definition, and resolved paths.
4. Validate the conclusion with a reproducible parse, comparison, disposable fixture, or reviewer record; label anything not run as blocked or unverified.
5. Produce do not count a recipe from an inactive datapack as an available exploit path. with exact version, candidate digest where available, and an actionable pass/fail/blocked status.

## Validation checklist

- [ ] Exact environment and config version are documented.
- [ ] Inputs reconcile to the registry, proposed diff, or release artifact under review.
- [ ] Validation evidence is recorded and unexecuted checks are not marked passed.
- [ ] Exclusions, parser failures, uncertainty, and human decisions remain explicit.
- [ ] Changes are reversible and do not modify production data without authorization.

## Required output

Do not count a recipe from an inactive datapack as an available exploit path.

## Boundaries and failure handling

A recipe seems to have different outputs depending on load priority. If the required environment, files, parser, or reviewer is unavailable, return a partial report with precise blockers rather than claiming completion.

## Trigger examples

- **Positive:** Only one confirmed active recipe defines the conversion.
- **Negative:** undefined
