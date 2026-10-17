---
name: projecte-emc-free-catalyst-cycle-check
description: "Finds repeated conversion chains where a catalyst or tool returns unchanged while the result has positive EMC value. Use for recipes with reusable tools or catalysts."
---

# Free Catalyst Cycle Check

## Purpose

recipe graph, remainder mechanics, state behavior, output quantities, and values

## Required inputs

Trace catalyst ownership across each recipe and determine whether it is consumed, damaged, duplicated, or returned.

## Workflow

1. Confirm actual Minecraft, loader, ProjectE, and modpack versions; identify the exact config files and registry snapshot. Do not write to production paths while gathering evidence.
2. Calculate cycle value including the catalyst's state and all returned items, then reproduce a bounded sample.
3. A catalyst-cycle report with path, state transitions, and net-value calculations.
4. Validate the conclusion with a reproducible parse, comparison, disposable fixture, or reviewer record; label anything not run as blocked or unverified.
5. Produce never run unbounded repeated crafting or modify a live server to reproduce the issue. with exact version, candidate digest where available, and an actionable pass/fail/blocked status.

## Validation checklist

- [ ] Exact environment and config version are documented.
- [ ] Inputs reconcile to the registry, proposed diff, or release artifact under review.
- [ ] Validation evidence is recorded and unexecuted checks are not marked passed.
- [ ] Exclusions, parser failures, uncertainty, and human decisions remain explicit.
- [ ] Changes are reversible and do not modify production data without authorization.

## Required output

Never run unbounded repeated crafting or modify a live server to reproduce the issue.

## Boundaries and failure handling

A reusable catalyst may generate valuable outputs repeatedly at no net cost. If the required environment, files, parser, or reviewer is unavailable, return a partial report with precise blockers rather than claiming completion.

## Trigger examples

- **Positive:** Every relevant catalyst is consumed or incurs verified cost.
- **Negative:** undefined
