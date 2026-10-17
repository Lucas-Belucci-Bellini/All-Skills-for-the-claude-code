---
name: projecte-emc-release-manifest-integrity
description: "Verifies that a reviewed EMC release contains the intended config, catalog, checks, and provenance. Use before packaging a balance update."
---

# ProjectE EMC Release Manifest Integrity

## Purpose

release manifest, config files, hashes, coverage report, review approvals, and target versions

## Required inputs

Reconcile the manifest's exact file paths and hashes with the release candidate tree.

## Workflow

1. Confirm actual Minecraft, loader, ProjectE, and modpack versions; identify the exact config files and registry snapshot. Do not write to production paths while gathering evidence.
2. Check that versions, counts, policy decisions, and validation evidence refer to the same candidate commit.
3. A release integrity report listing matched files, missing evidence, and blockers.
4. Validate the conclusion with a reproducible parse, comparison, disposable fixture, or reviewer record; label anything not run as blocked or unverified.
5. Produce a valid hash proves bytes match, not that values are balanced or legally sourced. with exact version, candidate digest where available, and an actionable pass/fail/blocked status.

## Validation checklist

- [ ] Exact environment and config version are documented.
- [ ] Inputs reconcile to the registry, proposed diff, or release artifact under review.
- [ ] Validation evidence is recorded and unexecuted checks are not marked passed.
- [ ] Exclusions, parser failures, uncertainty, and human decisions remain explicit.
- [ ] Changes are reversible and do not modify production data without authorization.

## Required output

A valid hash proves bytes match, not that values are balanced or legally sourced.

## Boundaries and failure handling

An EMC config change is about to be distributed to a modpack. If the required environment, files, parser, or reviewer is unavailable, return a partial report with precise blockers rather than claiming completion.

## Trigger examples

- **Positive:** No release package or artifact is being prepared.
- **Negative:** undefined
