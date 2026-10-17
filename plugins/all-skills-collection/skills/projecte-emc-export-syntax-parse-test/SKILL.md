---
name: projecte-emc-export-syntax-parse-test
description: "Validates syntax and parsing of an EMC export against the installed version. Use before importing generated value files."
---

# ProjectE Export Syntax and Parse Test

## Purpose

generated file, parser or official schema for exact version, and representative fixture IDs

## Required inputs

Validate encoding, structural syntax, key/value types, duplicate keys, and version-specific required fields.

## Workflow

1. Confirm actual Minecraft, loader, ProjectE, and modpack versions; identify the exact config files and registry snapshot. Do not write to production paths while gathering evidence.
2. Load the exported file in a disposable test instance or use the actual parser when available; record errors separately from warnings.
3. A parse report with file digest, parser/version, errors, warnings, and pass/fail result.
4. Validate the conclusion with a reproducible parse, comparison, disposable fixture, or reviewer record; label anything not run as blocked or unverified.
5. Produce do not call a json or text syntax check a runtime import test. with exact version, candidate digest where available, and an actionable pass/fail/blocked status.

## Validation checklist

- [ ] Exact environment and config version are documented.
- [ ] Inputs reconcile to the registry, proposed diff, or release artifact under review.
- [ ] Validation evidence is recorded and unexecuted checks are not marked passed.
- [ ] Exclusions, parser failures, uncertainty, and human decisions remain explicit.
- [ ] Changes are reversible and do not modify production data without authorization.

## Required output

Do not call a JSON or text syntax check a runtime import test.

## Boundaries and failure handling

An automation step exports EMC assignments for ProjectE. If the required environment, files, parser, or reviewer is unavailable, return a partial report with precise blockers rather than claiming completion.

## Trigger examples

- **Positive:** No export or configuration file is being produced.
- **Negative:** undefined
