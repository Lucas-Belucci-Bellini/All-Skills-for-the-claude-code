---
name: projecte-emc-automation-side-effect-regression
description: "Checks whether an EMC or recipe change alters side effects such as XP, fluids, tool damage, or event outputs. Use when a proposed value change may affect more than the output item."
---

# Automation Side-Effect Regression

## Purpose

before/after config, automation test fixture, event logs, fluid/XP state, and recipe graph

## Required inputs

List expected side effects for the targeted automation loop before changing the EMC or recipe mapping.

## Workflow

1. Confirm actual Minecraft, loader, ProjectE, and modpack versions; identify the exact config files and registry snapshot. Do not write to production paths while gathering evidence.
2. Compare before/after state with bounded repeated runs, checking unintentional output, event, or resource changes.
3. A side-effect regression table with observed deltas and tests still needed.
4. Validate the conclusion with a reproducible parse, comparison, disposable fixture, or reviewer record; label anything not run as blocked or unverified.
5. Produce do not claim side effects are unchanged unless the corresponding state was observed or tested. with exact version, candidate digest where available, and an actionable pass/fail/blocked status.

## Validation checklist

- [ ] Exact environment and config version are documented.
- [ ] Inputs reconcile to the registry, proposed diff, or release artifact under review.
- [ ] Validation evidence is recorded and unexecuted checks are not marked passed.
- [ ] Exclusions, parser failures, uncertainty, and human decisions remain explicit.
- [ ] Changes are reversible and do not modify production data without authorization.

## Required output

Do not claim side effects are unchanged unless the corresponding state was observed or tested.

## Boundaries and failure handling

A value change may unexpectedly alter a machine or autocrafting loop. If the required environment, files, parser, or reviewer is unavailable, return a partial report with precise blockers rather than claiming completion.

## Trigger examples

- **Positive:** The change is a metadata-only description update with no runtime effects.
- **Negative:** undefined
