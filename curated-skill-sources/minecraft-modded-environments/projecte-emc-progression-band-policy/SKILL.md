---
name: projecte-emc-progression-band-policy
description: "Defines explicit value bands for early, mid, late, and gated progression. Use when the pack needs coherent EMC guidance instead of arbitrary individual values."
---

# ProjectE Progression Band Policy

## Purpose

design goals, confirmed anchor items, mod progression graph, gameplay profile, and known content tiers

## Required inputs

Set band definitions from the target pack's progression and documented goals, not from an assumed universal EMC scale.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and config sources. If version evidence is unavailable, stop before proposing changes.
2. Check boundaries with representative anchor items and define exceptions for unique, stateful, or gate-sensitive items.
3. A versioned band policy with anchors, rationale, thresholds, and open balancing questions.
4. Validate the finding against a disposable fixture, repeatable calculation, or independent data lookup; compare current and proposed behavior and mark unknowns explicitly.
5. Produce do not apply proposed bands to the entire catalog before playtest and review. with evidence references, confirmed-versus-proposed status, affected IDs, assumptions, confidence, and the next safe action.

## Validation checklist

- [ ] The target version and evidence source are recorded; unknown version details are not guessed.
- [ ] The topic-specific behavior or data relationship has a reproducible check.
- [ ] Inputs, quantities, units, gates, or other assumptions relevant to the decision are explicit.
- [ ] Proposed values are distinguished from confirmed values and include rationale or a review-needed status.
- [ ] No production config/world is changed without backup, scoped diff, and rollback path.

## Required output

Do not apply proposed bands to the entire catalog before playtest and review.

## Boundaries and failure handling

The modpack team needs a repeatable standard for proposing EMC values. If recipe, registry, format, or runtime evidence is incomplete, mark the result unknown and name the smallest additional evidence needed. Do not claim universal coverage or successful balancing without measurable validation.

## Trigger examples

- **Positive:** No progression stages or balancing goal have been defined.
- **Negative:** undefined
