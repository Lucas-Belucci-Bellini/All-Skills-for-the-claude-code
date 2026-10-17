---
name: projecte-emc-playtest-balance-observation
description: "Collects structured gameplay feedback about EMC pace without confusing opinions with objective coverage. Use after a candidate balance has been installed in a test world."
---

# ProjectE Playtest Balance Observation

## Purpose

candidate version, task scenarios, player observations, progression checkpoints, and telemetry policy

## Required inputs

Define playtest tasks that expose intended pain points such as first machine, first gated resource, and late-game conversion.

## Workflow

1. Confirm actual Minecraft, loader, ProjectE, and modpack versions; identify the exact config files and registry snapshot. Do not write to production paths while gathering evidence.
2. Record completion time, bypass routes, perceived grind, and unexpected skips separately from reviewer opinion.
3. A playtest observation report with scenario results, version, limitations, and suggested hypotheses.
4. Validate the conclusion with a reproducible parse, comparison, disposable fixture, or reviewer record; label anything not run as blocked or unverified.
5. Produce do not claim broad balance based on one player's short session or a purely static calculation. with exact version, candidate digest where available, and an actionable pass/fail/blocked status.

## Validation checklist

- [ ] Exact environment and config version are documented.
- [ ] Inputs reconcile to the registry, proposed diff, or release artifact under review.
- [ ] Validation evidence is recorded and unexecuted checks are not marked passed.
- [ ] Exclusions, parser failures, uncertainty, and human decisions remain explicit.
- [ ] Changes are reversible and do not modify production data without authorization.

## Required output

Do not claim broad balance based on one player's short session or a purely static calculation.

## Boundaries and failure handling

A candidate EMC curve needs gameplay validation. If the required environment, files, parser, or reviewer is unavailable, return a partial report with precise blockers rather than claiming completion.

## Trigger examples

- **Positive:** The candidate has not been installed or playtested and the task is only static analysis.
- **Negative:** undefined
