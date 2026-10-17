---
name: projecte-emc-sample-item-validation-plan
description: "Selects a representative set of items for manual/runtime validation. Use when a full registry is too large for initial spot checks."
---

# ProjectE Sample Item Validation Plan

## Purpose

coverage categories, item tiers, stateful families, custom namespaces, and test environment

## Required inputs

Choose samples stratified by mod, tier, recipe type, variant/state, and risk rather than random display names alone.

## Workflow

1. Confirm actual Minecraft, loader, ProjectE, and modpack versions; identify the exact config files and registry snapshot. Do not write to production paths while gathering evidence.
2. Prioritize samples that can falsify key assumptions or cover dangerous value-loop classes.
3. A test plan with sample IDs, reason for inclusion, expected observation, and gaps not sampled.
4. Validate the conclusion with a reproducible parse, comparison, disposable fixture, or reviewer record; label anything not run as blocked or unverified.
5. Produce a sample is not proof of complete coverage; label the plan as sampling. with exact version, candidate digest where available, and an actionable pass/fail/blocked status.

## Validation checklist

- [ ] Exact environment and config version are documented.
- [ ] Inputs reconcile to the registry, proposed diff, or release artifact under review.
- [ ] Validation evidence is recorded and unexecuted checks are not marked passed.
- [ ] Exclusions, parser failures, uncertainty, and human decisions remain explicit.
- [ ] Changes are reversible and do not modify production data without authorization.

## Required output

A sample is not proof of complete coverage; label the plan as sampling.

## Boundaries and failure handling

A large EMC change needs a defensible focused runtime test set. If the required environment, files, parser, or reviewer is unavailable, return a partial report with precise blockers rather than claiming completion.

## Trigger examples

- **Positive:** A full automated test suite already exercises every eligible case.
- **Negative:** undefined
