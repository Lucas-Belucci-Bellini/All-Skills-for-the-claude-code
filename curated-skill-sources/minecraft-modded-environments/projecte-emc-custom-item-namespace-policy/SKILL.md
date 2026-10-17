---
name: projecte-emc-custom-item-namespace-policy
description: "Defines safe identity and EMC mapping rules for custom modpack items. Use when datapacks or local mods add custom resources."
---

# ProjectE Custom Item Namespace Policy

## Purpose

registered custom IDs, pack-owned namespaces, generation rules, recipe definitions, and config selectors

## Required inputs

Separate pack-owned IDs from upstream mod IDs and establish stable identity rules across updates.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and config sources. If version evidence is unavailable, stop before proposing changes.
2. Test whether regenerated or renamed IDs leave stale EMC keys, duplicates, or inaccessible assignments.
3. A namespace policy with naming rules, migration mapping, and validation fixtures.
4. Validate the finding against a disposable fixture, repeatable calculation, or independent data lookup; compare current and proposed behavior and mark unknowns explicitly.
5. Produce do not fabricate registry ids or use display names as stable keys. with evidence references, confirmed-versus-proposed status, affected IDs, assumptions, confidence, and the next safe action.

## Validation checklist

- [ ] The target version and evidence source are recorded; unknown version details are not guessed.
- [ ] The topic-specific behavior or data relationship has a reproducible check.
- [ ] Inputs, quantities, units, gates, or other assumptions relevant to the decision are explicit.
- [ ] Proposed values are distinguished from confirmed values and include rationale or a review-needed status.
- [ ] No production config/world is changed without backup, scoped diff, and rollback path.

## Required output

Do not fabricate registry IDs or use display names as stable keys.

## Boundaries and failure handling

The pack introduces custom ingots, currencies, tokens, or progression items. If recipe, registry, format, or runtime evidence is incomplete, mark the result unknown and name the smallest additional evidence needed. Do not claim universal coverage or successful balancing without measurable validation.

## Trigger examples

- **Positive:** All relevant items come from stable registered IDs with no custom namespace handling.
- **Negative:** undefined
