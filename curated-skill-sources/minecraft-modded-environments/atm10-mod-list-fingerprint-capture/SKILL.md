---
name: atm10-mod-list-fingerprint-capture
description: "Create a normalized, repeatable identity snapshot for the installed mod JARs so changes can be tied to regressions precisely. Produce reproducible evidence from the actual modified ATM10 instance and preserve a safe rollback path."
---

# ATM10 Mod List Fingerprint Capture

## Purpose

Create a normalized, repeatable identity snapshot for the installed mod JARs so changes can be tied to regressions precisely.

## Required inputs

Exact Minecraft/loader/Java and modpack versions, actual installed files, latest.log/crash reports when relevant, recent changes, and access to an isolated working directory. Redact access tokens, credentials, private server endpoints, and unnecessary personal paths.

## Workflow

1. Record the baseline environment and identify what the inventory, test environment, regression pass, restore drill, or issue report must prove.
2. Collect the scoped evidence: create a normalized, repeatable identity snapshot for the installed mod JARs so changes can be tied to regressions precisely.
3. Define canonical identifiers and a repeatable process; do not assume two artifacts/profiles are identical based only on display names.
4. Run the focused check: Record normalized filename, embedded mod ID/version, file size and optional SHA-256, while flagging unreadable/ambiguous artifacts. Preserve source files and test outputs so another person can repeat the result.
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

A dated mod inventory manifest with differences from a comparison snapshot and explicit unknown entries. Include methodology, observed evidence, unresolved items, and a clear status for every acceptance check.

## Boundaries and failure handling

Do not claim completeness when files are inaccessible or a check has not been run. Never overwrite a source save with a test copy or publish sensitive logs without sanitization.

## Trigger examples

- **Positive:** The ATM10 diagnostic work needs a repeatable baseline, verified recovery, regression evidence, or a maintainer-ready bug report.
- **Negative:** The request has no relation to modpack evidence, reproducibility, regression, backups, or issue reporting.
