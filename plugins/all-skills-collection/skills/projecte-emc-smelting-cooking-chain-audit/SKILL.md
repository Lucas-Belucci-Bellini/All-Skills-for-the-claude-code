---
name: projecte-emc-smelting-cooking-chain-audit
description: "Checks smelting, blasting, smoking, and cooking conversions for consistent value policy. Use when a material can be transformed by several vanilla or modded processes."
---

# Smelting and Cooking Chain EMC Audit

## Purpose

recipe types, source quantities, fuel/process requirements, outputs, and current EMC values

## Required inputs

Collect all applicable recipe variants and normalize ingredient/output counts, including XP or remainder effects if relevant.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and config sources. If version evidence is unavailable, stop before proposing changes.
2. Compare resulting values and identify alternate processing paths that bypass higher-cost recipes.
3. A process comparison table with value deltas and verified recipe identifiers.
4. Validate the finding against a disposable fixture, repeatable calculation, or independent data lookup; compare current and proposed behavior and mark unknowns explicitly.
5. Produce do not presume vanilla ratios cover custom recipes or all modded furnace-like blocks. with evidence references, confirmed-versus-proposed status, affected IDs, assumptions, confidence, and the next safe action.

## Validation checklist

- [ ] The target version and evidence source are recorded; unknown version details are not guessed.
- [ ] The topic-specific behavior or data relationship has a reproducible check.
- [ ] Inputs, quantities, units, gates, or other assumptions relevant to the decision are explicit.
- [ ] Proposed values are distinguished from confirmed values and include rationale or a review-needed status.
- [ ] No production config/world is changed without backup, scoped diff, and rollback path.

## Required output

Do not presume vanilla ratios cover custom recipes or all modded furnace-like blocks.

## Boundaries and failure handling

An ore or food input has multiple furnace or machine transformations. If recipe, registry, format, or runtime evidence is incomplete, mark the result unknown and name the smallest additional evidence needed. Do not claim universal coverage or successful balancing without measurable validation.

## Trigger examples

- **Positive:** No competing processing route or value relationship is present.
- **Negative:** undefined
