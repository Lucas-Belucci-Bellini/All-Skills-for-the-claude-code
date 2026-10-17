---
name: projecte-emc-creative-command-contamination-audit
description: "Checks whether creative-only items, command-generated states, or admin utilities contaminate EMC values. Use for packs with custom commands or test data."
---

# Creative/Command Data Contamination Audit

## Purpose

command/datapack definitions, item IDs, EMC config, test fixture provenance, and permission model

## Required inputs

Identify any test-only or admin-created items and separate them from legitimate survival acquisition paths.

## Workflow

1. Confirm actual Minecraft, loader, ProjectE, and modpack versions; identify the exact config files and registry snapshot. Do not write to production paths while gathering evidence.
2. Check whether command-generated variants enter the normal registry/config and could be mistaken for survival items.
3. A contamination report with source provenance and inclusion/exclusion recommendations.
4. Validate the conclusion with a reproducible parse, comparison, disposable fixture, or reviewer record; label anything not run as blocked or unverified.
5. Produce do not execute administrative commands on production worlds for this audit. with exact version, candidate digest where available, and an actionable pass/fail/blocked status.

## Validation checklist

- [ ] Exact environment and config version are documented.
- [ ] Inputs reconcile to the registry, proposed diff, or release artifact under review.
- [ ] Validation evidence is recorded and unexecuted checks are not marked passed.
- [ ] Exclusions, parser failures, uncertainty, and human decisions remain explicit.
- [ ] Changes are reversible and do not modify production data without authorization.

## Required output

Do not execute administrative commands on production worlds for this audit.

## Boundaries and failure handling

A debug item or creative-only reward appears in the EMC candidate list. If the required environment, files, parser, or reviewer is unavailable, return a partial report with precise blockers rather than claiming completion.

## Trigger examples

- **Positive:** All candidates are confirmed survival-obtainable items.
- **Negative:** undefined
