---
name: projecte-emc-unresolved-registry-path-diagnostics
description: "Diagnoses EMC keys that cannot be mapped to current registry items. Use when configs contain obsolete, misspelled, or version-mismatched IDs."
---

# ProjectE Unresolved Registry Path Diagnostics

## Purpose

raw config keys, runtime registry, namespace rules, aliases, and game/mod version diff

## Required inputs

Classify each unresolved key as removed ID, renamed ID, invalid syntax, unsupported variant, or incomplete registry read.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and config sources. If version evidence is unavailable, stop before proposing changes.
2. Suggest a replacement only when an exact migration path or verified equivalent exists; otherwise leave unresolved.
3. An unresolved-key report with cause, evidence, replacement confidence, and safe remediation.
4. Validate the finding against a disposable fixture, repeatable calculation, or independent data lookup; compare current and proposed behavior and mark unknowns explicitly.
5. Produce do not map unknown keys to the closest display name automatically. with evidence references, confirmed-versus-proposed status, affected IDs, assumptions, confidence, and the next safe action.

## Validation checklist

- [ ] The target version and evidence source are recorded; unknown version details are not guessed.
- [ ] The topic-specific behavior or data relationship has a reproducible check.
- [ ] Inputs, quantities, units, gates, or other assumptions relevant to the decision are explicit.
- [ ] Proposed values are distinguished from confirmed values and include rationale or a review-needed status.
- [ ] No production config/world is changed without backup, scoped diff, and rollback path.

## Required output

Do not map unknown keys to the closest display name automatically.

## Boundaries and failure handling

A mod update makes prior EMC config keys fail lookup. If recipe, registry, format, or runtime evidence is incomplete, mark the result unknown and name the smallest additional evidence needed. Do not claim universal coverage or successful balancing without measurable validation.

## Trigger examples

- **Positive:** All EMC keys resolve to current registered items.
- **Negative:** undefined
