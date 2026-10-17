---
name: projecte-emc-time-windowed-resource-farm-test
description: "Quantifies EMC supply from timed farms and recurring producers. Use when a loop's risk depends on throughput or server ticks."
---

# Time-Windowed Resource Farm Test

## Purpose

farm setup, production interval, yield, item EMC, and hardware/server constraints

## Required inputs

Measure or source the target production interval and define a fixed test window.

## Workflow

1. Confirm actual Minecraft, loader, ProjectE, and modpack versions; identify the exact config files and registry snapshot. Do not write to production paths while gathering evidence.
2. Calculate best-supported production rate and value per window, separating measured results from extrapolations.
3. A time-windowed yield report with units, uncertainty, and high-risk output rates.
4. Validate the conclusion with a reproducible parse, comparison, disposable fixture, or reviewer record; label anything not run as blocked or unverified.
5. Produce do not extrapolate a short test to long-term production without stating assumptions. with exact version, candidate digest where available, and an actionable pass/fail/blocked status.

## Validation checklist

- [ ] Exact environment and config version are documented.
- [ ] Inputs reconcile to the registry, proposed diff, or release artifact under review.
- [ ] Validation evidence is recorded and unexecuted checks are not marked passed.
- [ ] Exclusions, parser failures, uncertainty, and human decisions remain explicit.
- [ ] Changes are reversible and do not modify production data without authorization.

## Required output

Do not extrapolate a short test to long-term production without stating assumptions.

## Boundaries and failure handling

A renewable producer may overwhelm intended EMC progression over time. If the required environment, files, parser, or reviewer is unavailable, return a partial report with precise blockers rather than claiming completion.

## Trigger examples

- **Positive:** The source is nonrecurring and throughput is irrelevant.
- **Negative:** undefined
