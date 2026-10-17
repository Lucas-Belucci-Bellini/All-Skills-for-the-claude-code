---
name: projecte-emc-progression-curve-audit
description: "Detects abrupt jumps or flat stretches in EMC values across progression tiers. Use when reviewing whether values support the intended pace."
---

# ProjectE EMC Progression Curve Audit

## Purpose

tier assignments, confirmed anchor values, processing graph, unlock order, and balance profile

## Required inputs

Map representative items against progression stages and calculate ratios and local jumps between comparable tiers.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and config sources. If version evidence is unavailable, stop before proposing changes.
2. Flag abrupt inflation, inverted tiers, and gaps where late-game items are cheaper than prerequisite items.
3. A progression-curve report with affected pairs, graph evidence, and proposed review candidates.
4. Validate the finding against a disposable fixture, repeatable calculation, or independent data lookup; compare current and proposed behavior and mark unknowns explicitly.
5. Produce do not infer difficulty solely from emc values; keep gameplay and access-gate evidence separate. with evidence references, confirmed-versus-proposed status, affected IDs, assumptions, confidence, and the next safe action.

## Validation checklist

- [ ] The target version and evidence source are recorded; unknown version details are not guessed.
- [ ] The topic-specific behavior or data relationship has a reproducible check.
- [ ] Inputs, quantities, units, gates, or other assumptions relevant to the decision are explicit.
- [ ] Proposed values are distinguished from confirmed values and include rationale or a review-needed status.
- [ ] No production config/world is changed without backup, scoped diff, and rollback path.

## Required output

Do not infer difficulty solely from EMC values; keep gameplay and access-gate evidence separate.

## Boundaries and failure handling

A value table feels either trivial or grind-heavy and needs a systematic review. If recipe, registry, format, or runtime evidence is incomplete, mark the result unknown and name the smallest additional evidence needed. Do not claim universal coverage or successful balancing without measurable validation.

## Trigger examples

- **Positive:** The items have no comparable tier or progression relationship.
- **Negative:** undefined
