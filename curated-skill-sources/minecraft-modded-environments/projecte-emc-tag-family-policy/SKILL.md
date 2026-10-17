---
name: projecte-emc-tag-family-policy
description: "Audits tags used to group material families for EMC decisions. Use when recipe tags may combine materials with different tiers or costs."
---

# ProjectE Tag-Based Material Family Policy

## Purpose

item tag data, recipe consumers, registry IDs, mod provenance, and proposed family policy

## Required inputs

Enumerate relevant tags and members from the active data pack and identify tags reused across unrelated progression tiers.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and config sources. If version evidence is unavailable, stop before proposing changes.
2. Compare members' acquisition routes and detect tags that should be split or handled by exceptions.
3. A tag-family report with members, consumers, tier conflicts, and recommended scope changes.
4. Validate the finding against a disposable fixture, repeatable calculation, or independent data lookup; compare current and proposed behavior and mark unknowns explicitly.
5. Produce do not modify shared tags globally to fix one emc anomaly without checking other recipe consumers. with evidence references, confirmed-versus-proposed status, affected IDs, assumptions, confidence, and the next safe action.

## Validation checklist

- [ ] The target version and evidence source are recorded; unknown version details are not guessed.
- [ ] The topic-specific behavior or data relationship has a reproducible check.
- [ ] Inputs, quantities, units, gates, or other assumptions relevant to the decision are explicit.
- [ ] Proposed values are distinguished from confirmed values and include rationale or a review-needed status.
- [ ] No production config/world is changed without backup, scoped diff, and rollback path.

## Required output

Do not modify shared tags globally to fix one EMC anomaly without checking other recipe consumers.

## Boundaries and failure handling

One common tag contains both early-game and gated materials. If recipe, registry, format, or runtime evidence is incomplete, mark the result unknown and name the smallest additional evidence needed. Do not claim universal coverage or successful balancing without measurable validation.

## Trigger examples

- **Positive:** No material tag or tag-driven recipe participates in the issue.
- **Negative:** undefined
