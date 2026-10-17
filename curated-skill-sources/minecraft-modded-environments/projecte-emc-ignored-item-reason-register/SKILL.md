---
name: projecte-emc-ignored-item-reason-register
description: "Maintains explicit reasons for excluding items from EMC assignment or coverage denominators. Use when some item types cannot be safely valued."
---

# ProjectE Ignored Item Reason Register

## Purpose

excluded IDs, item state, format limitations, policy, and reviewer decision

## Required inputs

Assign each exclusion a stable reason code such as stateful, debug-only, non-survival, unsupported, progression protected, or unreadable.

## Workflow

1. Confirm actual Minecraft, loader, ProjectE, and modpack versions; identify the exact config files and registry snapshot. Do not write to production paths while gathering evidence.
2. Require evidence, scope, date/review trigger, and whether the exclusion remains valid after updates.
3. An exclusion register that can be reconciled to the registry and review report.
4. Validate the conclusion with a reproducible parse, comparison, disposable fixture, or reviewer record; label anything not run as blocked or unverified.
5. Produce do not silently drop hard-to-parse items from inventory totals. with exact version, candidate digest where available, and an actionable pass/fail/blocked status.

## Validation checklist

- [ ] Exact environment and config version are documented.
- [ ] Inputs reconcile to the registry, proposed diff, or release artifact under review.
- [ ] Validation evidence is recorded and unexecuted checks are not marked passed.
- [ ] Exclusions, parser failures, uncertainty, and human decisions remain explicit.
- [ ] Changes are reversible and do not modify production data without authorization.

## Required output

Do not silently drop hard-to-parse items from inventory totals.

## Boundaries and failure handling

The final report must explain why some registered items are not eligible for EMC. If the required environment, files, parser, or reviewer is unavailable, return a partial report with precise blockers rather than claiming completion.

## Trigger examples

- **Positive:** All items are eligible and no exclusions are present.
- **Negative:** undefined
