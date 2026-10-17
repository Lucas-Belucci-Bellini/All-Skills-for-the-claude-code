---
name: projecte-emc-container-fill-state-arbitrage
description: "Looks for value arbitrage between empty, filled, and drained containers. Use for fluid cells, canisters, buckets, and stored-fluid items."
---

# Container Fill-State Arbitrage Test

## Purpose

container serialization, fluid IDs, quantities, recipes, EMC lookup, and disposable fixtures

## Required inputs

Enumerate exact empty/full/partial states that the installed implementation can represent.

## Workflow

1. Confirm actual Minecraft, loader, ProjectE, and modpack versions; identify the exact config files and registry snapshot. Do not write to production paths while gathering evidence.
2. Compare input value, conversion result, retained fluid, and returned container across fill/drain cycles.
3. A fill-state arbitrage table with state IDs, net value, and reproducible safe path.
4. Validate the conclusion with a reproducible parse, comparison, disposable fixture, or reviewer record; label anything not run as blocked or unverified.
5. Produce do not test using production-world fluid storage or valuable items. with exact version, candidate digest where available, and an actionable pass/fail/blocked status.

## Validation checklist

- [ ] Exact environment and config version are documented.
- [ ] Inputs reconcile to the registry, proposed diff, or release artifact under review.
- [ ] Validation evidence is recorded and unexecuted checks are not marked passed.
- [ ] Exclusions, parser failures, uncertainty, and human decisions remain explicit.
- [ ] Changes are reversible and do not modify production data without authorization.

## Required output

Do not test using production-world fluid storage or valuable items.

## Boundaries and failure handling

A filled cell may exchange for an empty cell while retaining contents. If the required environment, files, parser, or reviewer is unavailable, return a partial report with precise blockers rather than claiming completion.

## Trigger examples

- **Positive:** No container can retain fluid state.
- **Negative:** undefined
