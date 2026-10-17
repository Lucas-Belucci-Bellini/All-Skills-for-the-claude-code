---
name: projecte-emc-outlier-bound-audit
description: "Detects suspiciously high or low candidate EMC values relative to comparable items. Use after importing or recalculating an EMC table."
---

# ProjectE EMC Outlier Bound Audit

## Purpose

existing and proposed values, material families, tier labels, and verified anchor values

## Required inputs

Build robust per-family comparison bands from confirmed items and documented policy anchors.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and config sources. If version evidence is unavailable, stop before proposing changes.
2. Flag outliers using both absolute policy limits and relative ratios; explain which rule triggered each finding.
3. An outlier register with comparison group, rule, severity, and manual-review recommendation.
4. Validate the finding against a disposable fixture, repeatable calculation, or independent data lookup; compare current and proposed behavior and mark unknowns explicitly.
5. Produce a statistical outlier is a review signal, not proof the value is wrong. with evidence references, confirmed-versus-proposed status, affected IDs, assumptions, confidence, and the next safe action.

## Validation checklist

- [ ] The target version and evidence source are recorded; unknown version details are not guessed.
- [ ] The topic-specific behavior or data relationship has a reproducible check.
- [ ] Inputs, quantities, units, gates, or other assumptions relevant to the decision are explicit.
- [ ] Proposed values are distinguished from confirmed values and include rationale or a review-needed status.
- [ ] No production config/world is changed without backup, scoped diff, and rollback path.

## Required output

A statistical outlier is a review signal, not proof the value is wrong.

## Boundaries and failure handling

A new batch may contain accidental zeroes or huge values. If recipe, registry, format, or runtime evidence is incomplete, mark the result unknown and name the smallest additional evidence needed. Do not claim universal coverage or successful balancing without measurable validation.

## Trigger examples

- **Positive:** All assignments are in a small scope without meaningful comparison groups.
- **Negative:** undefined
