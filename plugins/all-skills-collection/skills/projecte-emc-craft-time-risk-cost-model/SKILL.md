---
name: projecte-emc-craft-time-risk-cost-model
description: "Combines material costs, time, energy, and risk into an explainable EMC proposal framework. Use when simple recipe ratios fail to reflect progression effort."
---

# ProjectE Craft Time and Risk Cost Model

## Purpose

verified recipes, cycle time, energy use, source risk, prerequisite gates, and declared weights

## Required inputs

Define the cost components and their units before calculating any combined score.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and config sources. If version evidence is unavailable, stop before proposing changes.
2. Run sensitivity checks across the declared weights and show which assumptions change the candidate value or tier.
3. A cost model with units, weight rationale, candidate ranges, and sensitivity analysis.
4. Validate the finding against a disposable fixture, repeatable calculation, or independent data lookup; compare current and proposed behavior and mark unknowns explicitly.
5. Produce do not present arbitrary subjective weights as objective economic truth. with evidence references, confirmed-versus-proposed status, affected IDs, assumptions, confidence, and the next safe action.

## Validation checklist

- [ ] The target version and evidence source are recorded; unknown version details are not guessed.
- [ ] The topic-specific behavior or data relationship has a reproducible check.
- [ ] Inputs, quantities, units, gates, or other assumptions relevant to the decision are explicit.
- [ ] Proposed values are distinguished from confirmed values and include rationale or a review-needed status.
- [ ] No production config/world is changed without backup, scoped diff, and rollback path.

## Required output

Do not present arbitrary subjective weights as objective economic truth.

## Boundaries and failure handling

Two items use similar materials but differ in energy, time, or access cost. If recipe, registry, format, or runtime evidence is incomplete, mark the result unknown and name the smallest additional evidence needed. Do not claim universal coverage or successful balancing without measurable validation.

## Trigger examples

- **Positive:** The pack has no accepted balancing goal or cost policy.
- **Negative:** undefined
