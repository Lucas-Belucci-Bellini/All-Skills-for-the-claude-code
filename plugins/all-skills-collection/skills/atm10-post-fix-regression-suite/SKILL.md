---
name: atm10-post-fix-regression-suite
description: "Verify that a proposed ATM10 fix resolves the target symptom without introducing nearby startup, world, gameplay, or multiplayer regressions. Produce reproducible evidence from the actual modified ATM10 instance and preserve a safe rollback path."
---

# ATM10 Post-Fix Regression Suite

## Purpose

Verify that a proposed ATM10 fix resolves the target symptom without introducing nearby startup, world, gameplay, or multiplayer regressions.

## Required inputs

Exact Minecraft/loader/Java and modpack versions, actual installed files, latest.log/crash reports when relevant, recent changes, and access to an isolated working directory. Redact access tokens, credentials, private server endpoints, and unnecessary personal paths.

## Workflow

1. Record the baseline environment and identify what the inventory, test environment, regression pass, restore drill, or issue report must prove.
2. Collect the scoped evidence: verify that a proposed ATM10 fix resolves the target symptom without introducing nearby startup, world, gameplay, or multiplayer regressions.
3. Define canonical identifiers and a repeatable process; do not assume two artifacts/profiles are identical based only on display names.
4. Run the focused check: Define a small smoke-test matrix before the fix and run the same steps against baseline and candidate profiles. Preserve source files and test outputs so another person can repeat the result.
5. Compare expected and observed output, and explicitly record missing data, assumptions, unreadable artifacts, and any mismatch.
6. Where state could change, use a copy or isolated path and verify restoration/cleanup before considering the task complete.
7. Review the proposed conclusion for overclaims and distinguish checks actually executed from checks only recommended.
8. Package the evidence with timestamps, environment identity, results, open risks, and the next smallest action.

## Validation checklist

- [ ] Inputs and environment identity are recorded sufficiently for repetition.
- [ ] Evidence sources are preserved and paths/hashes are not guessed.
- [ ] Success criteria are defined before the test and results are reported per criterion.
- [ ] Private information and secrets are excluded from shared output.
- [ ] Unknown, skipped, and failed checks are explicitly listed.
- [ ] Original game data remains untouched and rollback/recovery is documented.

## Required output

A regression checklist with per-case pass/fail/blocked results, residual risks, and rollback recommendation. Include methodology, observed evidence, unresolved items, and a clear status for every acceptance check.

## Boundaries and failure handling

Do not claim completeness when files are inaccessible or a check has not been run. Never overwrite a source save with a test copy or publish sensitive logs without sanitization.

## Trigger examples

- **Positive:** The ATM10 diagnostic work needs a repeatable baseline, verified recovery, regression evidence, or a maintainer-ready bug report.
- **Negative:** The request has no relation to modpack evidence, reproducibility, regression, backups, or issue reporting.
