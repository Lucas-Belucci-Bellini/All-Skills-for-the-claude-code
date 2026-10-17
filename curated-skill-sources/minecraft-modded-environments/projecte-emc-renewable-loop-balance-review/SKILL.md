---
name: projecte-emc-renewable-loop-balance-review
description: "Evaluates repeatable resource loops that feed an EMC economy. Use for crops, mob drops, passive machines, and renewable fluid/resource chains."
---

# ProjectE Renewable Loop Balance Review

## Purpose

renewable sources, processing recipes, output rates, EMC values, and dimension/quest constraints

## Required inputs

Trace complete loops from renewable input to stored/transmutable outputs and record time/rate assumptions.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and config sources. If version evidence is unavailable, stop before proposing changes.
2. Search for recursive multiplication, free catalysts, reusable containers, and output states that survive at no net cost.
3. A renewable-loop report with exact chain, repeatability, estimated flow, and fix candidates.
4. Validate the finding against a disposable fixture, repeatable calculation, or independent data lookup; compare current and proposed behavior and mark unknowns explicitly.
5. Produce do not label a loop exploitable without a reproducible path and verified quantities. with evidence references, confirmed-versus-proposed status, affected IDs, assumptions, confidence, and the next safe action.

## Validation checklist

- [ ] The target version and evidence source are recorded; unknown version details are not guessed.
- [ ] The topic-specific behavior or data relationship has a reproducible check.
- [ ] Inputs, quantities, units, gates, or other assumptions relevant to the decision are explicit.
- [ ] Proposed values are distinguished from confirmed values and include rationale or a review-needed status.
- [ ] No production config/world is changed without backup, scoped diff, and rollback path.

## Required output

Do not label a loop exploitable without a reproducible path and verified quantities.

## Boundaries and failure handling

An automated farm produces materials that can be exchanged into rare resources. If recipe, registry, format, or runtime evidence is incomplete, mark the result unknown and name the smallest additional evidence needed. Do not claim universal coverage or successful balancing without measurable validation.

## Trigger examples

- **Positive:** No renewable or recursive acquisition path exists.
- **Negative:** undefined
