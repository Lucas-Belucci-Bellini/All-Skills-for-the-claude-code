---
name: projecte-emc-reviewed-proposed-diff
description: "Produces a human-readable diff that separates current values from proposed values and reasons. Use before reviewers approve a batch."
---

# ProjectE Reviewed-versus-Proposed EMC Diff

## Purpose

current config, proposed config, source evidence, policy bands, and candidate statuses

## Required inputs

Create one row per changed item with old value, candidate value, delta/ratio, and reason code.

## Workflow

1. Confirm actual Minecraft, loader, ProjectE, and modpack versions; identify the exact config files and registry snapshot. Do not write to production paths while gathering evidence.
2. Highlight changes with low confidence, progression impact, or unexplained large deltas for explicit review.
3. A review table and patch summary with accepted, rejected, and deferred changes.
4. Validate the conclusion with a reproducible parse, comparison, disposable fixture, or reviewer record; label anything not run as blocked or unverified.
5. Produce do not hide unchanged, excluded, or unreadable entries from a claimed complete review. with exact version, candidate digest where available, and an actionable pass/fail/blocked status.

## Validation checklist

- [ ] Exact environment and config version are documented.
- [ ] Inputs reconcile to the registry, proposed diff, or release artifact under review.
- [ ] Validation evidence is recorded and unexecuted checks are not marked passed.
- [ ] Exclusions, parser failures, uncertainty, and human decisions remain explicit.
- [ ] Changes are reversible and do not modify production data without authorization.

## Required output

Do not hide unchanged, excluded, or unreadable entries from a claimed complete review.

## Boundaries and failure handling

A large EMC table needs an audit trail for each changed item. If the required environment, files, parser, or reviewer is unavailable, return a partial report with precise blockers rather than claiming completion.

## Trigger examples

- **Positive:** No values are being proposed or reviewed.
- **Negative:** undefined
