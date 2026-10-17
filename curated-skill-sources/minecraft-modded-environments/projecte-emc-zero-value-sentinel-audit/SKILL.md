---
name: projecte-emc-zero-value-sentinel-audit
description: "Finds values that may be intentional zeroes, missing markers, or parser fallbacks. Use when zero or special values appear in an EMC export."
---

# ProjectE Zero and Sentinel EMC Audit

## Purpose

current config values, schema/parser behavior, item lookup results, and policy documentation

## Required inputs

Determine the exact semantics of zero, negative, null, omitted, and special marker values in the installed version.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and config sources. If version evidence is unavailable, stop before proposing changes.
2. Compare these states in a disposable test and classify each occurrence as intentional, invalid, unsupported, or unresolved.
3. A sentinel-value report with verified semantics and affected IDs.
4. Validate the finding against a disposable fixture, repeatable calculation, or independent data lookup; compare current and proposed behavior and mark unknowns explicitly.
5. Produce do not convert zero or negative values to positive emc without understanding their version-specific meaning. with evidence references, confirmed-versus-proposed status, affected IDs, assumptions, confidence, and the next safe action.

## Validation checklist

- [ ] The target version and evidence source are recorded; unknown version details are not guessed.
- [ ] The topic-specific behavior or data relationship has a reproducible check.
- [ ] Inputs, quantities, units, gates, or other assumptions relevant to the decision are explicit.
- [ ] Proposed values are distinguished from confirmed values and include rationale or a review-needed status.
- [ ] No production config/world is changed without backup, scoped diff, and rollback path.

## Required output

Do not convert zero or negative values to positive EMC without understanding their version-specific meaning.

## Boundaries and failure handling

A generated report has many zero or blank EMC values. If recipe, registry, format, or runtime evidence is incomplete, mark the result unknown and name the smallest additional evidence needed. Do not claim universal coverage or successful balancing without measurable validation.

## Trigger examples

- **Positive:** No special or zero values occur in the reviewed scope.
- **Negative:** undefined
