---
name: projecte-emc-item-alias-collision-audit
description: "Detects ambiguous or colliding identifiers in EMC exports. Use when aliases, custom IDs, or updates change key resolution."
---

# ProjectE EMC Item Alias and Registry Collision Audit

## Purpose

Resolve all EMC keys against the current registry deterministically.

## Required inputs

Registry snapshot, EMC keys, alias rules, data migrations, and version changes.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and configuration sources. If version evidence is unavailable, stop before proposing changes.
2. Normalize syntax without dropping namespaces, variants, or required case distinctions.
3. Report zero-match, multi-match, deprecated, and remapped identifiers; do not pick an arbitrary result.
4. Validate findings with a disposable fixture or independent lookup, compare current and proposed behavior, and mark unresolved data rather than filling gaps with assumptions.
5. Produce an alias/collision report with exact keys, resolution counts, and remediation options. with source references, confirmed-versus-proposed status, confidence, affected IDs, and the next safe action.

## Validation checklist

- [ ] Target versions and evidence sources are recorded; unknown version details are not guessed.
- [ ] Item identifiers and quantities are confirmed against target registry/config rather than display names alone.
- [ ] The topic-specific behavior has an observable reproduction or data check.
- [ ] Proposed values are distinct from confirmed values and include a justification or a clear review-needed state.
- [ ] No production world/config is changed without backup, scoped diff, and rollback path.

## Required output

An alias/collision report with exact keys, resolution counts, and remediation options.

## Boundaries and failure handling

Do not rewrite ambiguous keys to the first match; require deterministic evidence. If registry, recipe, format, or runtime evidence is incomplete, mark the result unknown and state the smallest additional evidence needed. Do not claim that all EMC values are configured or balanced without measurable coverage and validation.

## Trigger examples

- **Positive:** A config entry matches multiple variants or stops resolving after an update.
- **Negative:** All keys resolve uniquely and no migration is involved.
