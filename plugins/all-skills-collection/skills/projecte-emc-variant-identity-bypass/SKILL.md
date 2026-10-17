---
name: projecte-emc-variant-identity-bypass
description: "Tests whether distinct item variants collapse to one EMC identity and bypass intended value differences. Use when a base ID has tiered or stateful forms."
---

# Variant Identity Bypass Test

## Purpose

variant IDs, serialized samples, EMC selector behavior, and conversion routes

## Required inputs

Enumerate variants and confirm which identity fields the lookup actually uses.

## Workflow

1. Confirm actual Minecraft, loader, ProjectE, and modpack versions; identify the exact config files and registry snapshot. Do not write to production paths while gathering evidence.
2. Test conversion across variants and check whether rare forms retain their state while using a cheaper base value.
3. A variant-bypass report with test matrix, exact identities, and observed transitions.
4. Validate the conclusion with a reproducible parse, comparison, disposable fixture, or reviewer record; label anything not run as blocked or unverified.
5. Produce do not infer identity semantics from naming alone; use target-version lookup evidence. with exact version, candidate digest where available, and an actionable pass/fail/blocked status.

## Validation checklist

- [ ] Exact environment and config version are documented.
- [ ] Inputs reconcile to the registry, proposed diff, or release artifact under review.
- [ ] Validation evidence is recorded and unexecuted checks are not marked passed.
- [ ] Exclusions, parser failures, uncertainty, and human decisions remain explicit.
- [ ] Changes are reversible and do not modify production data without authorization.

## Required output

Do not infer identity semantics from naming alone; use target-version lookup evidence.

## Boundaries and failure handling

A high-tier variant may be transmuted using a low-tier value. If the required environment, files, parser, or reviewer is unavailable, return a partial report with precise blockers rather than claiming completion.

## Trigger examples

- **Positive:** The item has only one stateless identity.
- **Negative:** undefined
