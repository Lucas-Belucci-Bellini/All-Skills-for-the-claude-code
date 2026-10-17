---
name: projecte-emc-final-coverage-report
description: "Summarizes eligible item coverage, assignments, exclusions, failures, and confidence at release time. Use when reporting completion of an EMC inventory."
---

# ProjectE Final EMC Coverage Report

## Purpose

registry snapshot, normalized config, eligibility policy, exception register, and validation reports

## Required inputs

Reconcile each registered ID to one final status and ensure totals sum to the registry snapshot.

## Workflow

1. Confirm actual Minecraft, loader, ProjectE, and modpack versions; identify the exact config files and registry snapshot. Do not write to production paths while gathering evidence.
2. Calculate coverage using explicit denominators and include unreadable/ambiguous items outside any false 100% claim.
3. A final coverage report with exact totals, percentage, per-mod detail, exceptions, and validation status.
4. Validate the conclusion with a reproducible parse, comparison, disposable fixture, or reviewer record; label anything not run as blocked or unverified.
5. Produce do not claim all emcs are set without presenting the eligible denominator and unresolved exceptions. with exact version, candidate digest where available, and an actionable pass/fail/blocked status.

## Validation checklist

- [ ] Exact environment and config version are documented.
- [ ] Inputs reconcile to the registry, proposed diff, or release artifact under review.
- [ ] Validation evidence is recorded and unexecuted checks are not marked passed.
- [ ] Exclusions, parser failures, uncertainty, and human decisions remain explicit.
- [ ] Changes are reversible and do not modify production data without authorization.

## Required output

Do not claim all EMCs are set without presenting the eligible denominator and unresolved exceptions.

## Boundaries and failure handling

A maintainer needs to report inventory completeness after a balance pass. If the required environment, files, parser, or reviewer is unavailable, return a partial report with precise blockers rather than claiming completion.

## Trigger examples

- **Positive:** No inventory or coverage data exists.
- **Negative:** undefined
