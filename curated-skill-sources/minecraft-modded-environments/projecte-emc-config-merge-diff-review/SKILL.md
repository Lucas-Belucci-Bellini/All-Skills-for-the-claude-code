---
name: projecte-emc-config-merge-diff-review
description: "Reviews a proposed EMC config merge before it reaches the target pack. Use when integrating generated values with existing configs."
---

# ProjectE Config Merge and Diff Review

## Purpose

base config, proposed config, versioned format, and expected changed IDs

## Required inputs

Produce a scoped semantic diff by item ID and classify additions, removals, value changes, and comment-only edits.

## Workflow

1. Confirm actual Minecraft, loader, ProjectE, and modpack versions; identify the exact config files and registry snapshot. Do not write to production paths while gathering evidence.
2. Check that no unrelated settings, namespaces, or custom overrides are lost during merge.
3. A merge review with change counts, sensitive differences, and rollback reference.
4. Validate the conclusion with a reproducible parse, comparison, disposable fixture, or reviewer record; label anything not run as blocked or unverified.
5. Produce never replace the entire config wholesale when a scoped patch can preserve unrelated settings. with exact version, candidate digest where available, and an actionable pass/fail/blocked status.

## Validation checklist

- [ ] Exact environment and config version are documented.
- [ ] Inputs reconcile to the registry, proposed diff, or release artifact under review.
- [ ] Validation evidence is recorded and unexecuted checks are not marked passed.
- [ ] Exclusions, parser failures, uncertainty, and human decisions remain explicit.
- [ ] Changes are reversible and do not modify production data without authorization.

## Required output

Never replace the entire config wholesale when a scoped patch can preserve unrelated settings.

## Boundaries and failure handling

A generated EMC file must be combined with the live config. If the required environment, files, parser, or reviewer is unavailable, return a partial report with precise blockers rather than claiming completion.

## Trigger examples

- **Positive:** The task does not merge or edit configuration.
- **Negative:** undefined
