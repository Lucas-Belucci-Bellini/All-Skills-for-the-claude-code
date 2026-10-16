---
name: configuration-reference-coverage-audit
description: "Compare config schemas, defaults, environment mappings and runtime consumers with reference docs to find missing or misleading settings."
---

# Configuration Reference Coverage Audit

## Purpose

Make configuration docs a trustworthy map of settings users can change.

## Required inputs

Schemas/defaults, environment mappings, runtime consumers, validation code and docs pages.

## Workflow

1. Extract keys from schemas, constants, defaults, environment mappings and deprecated aliases.
2. Map each key to type, default, accepted range, sensitivity, precedence and runtime effect.
3. Compare the inventory with docs and flag missing keys, stale defaults, unsupported settings and inaccurate examples.
4. Record conditions tied to platform, profile, feature flags or runtime versions.
5. Generate stable tables where possible while keeping conceptual explanation under review.

## Validation checklist

- [ ] User-facing keys are documented or marked internal/deprecated.
- [ ] Defaults and ranges match source evidence.
- [ ] Precedence and reload/restart needs are stated.
- [ ] Sensitive values are marked and examples are synthetic.
- [ ] Removed keys have migration guidance where appropriate.

## Required output

Config-key coverage matrix, stale/missing list and an update or generation strategy.

## Boundaries and failure handling

Do not expose secret/internal settings simply because code contains them. A declared default may be overridden by another layer.

## Trigger examples

- **Positive:** Docs claim a timeout defaults to 30 seconds while source says 10.
- **Negative:** Styling a reference page whose coverage is already verified.
