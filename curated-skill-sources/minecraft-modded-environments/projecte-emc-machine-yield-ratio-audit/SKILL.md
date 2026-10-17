---
name: projecte-emc-machine-yield-ratio-audit
description: "Compares machine inputs, outputs, secondary products, and resource yields before assigning EMC. Use when several processing machines can handle the same input."
---

# ProjectE Machine Yield Ratio Audit

## Purpose

machine recipes, quantities, byproducts, energy/time costs, and existing EMC values

## Required inputs

Normalize each machine path and record throughput plus all deterministic and probabilistic outputs.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and config sources. If version evidence is unavailable, stop before proposing changes.
2. Compare total output value and progression cost between paths to find an unintended best route.
3. A machine-yield matrix with equations, efficiency differences, and exception candidates.
4. Validate the finding against a disposable fixture, repeatable calculation, or independent data lookup; compare current and proposed behavior and mark unknowns explicitly.
5. Produce do not assume machine speed or energy consumption alone determines emc; document the pack's balancing policy. with evidence references, confirmed-versus-proposed status, affected IDs, assumptions, confidence, and the next safe action.

## Validation checklist

- [ ] The target version and evidence source are recorded; unknown version details are not guessed.
- [ ] The topic-specific behavior or data relationship has a reproducible check.
- [ ] Inputs, quantities, units, gates, or other assumptions relevant to the decision are explicit.
- [ ] Proposed values are distinguished from confirmed values and include rationale or a review-needed status.
- [ ] No production config/world is changed without backup, scoped diff, and rollback path.

## Required output

Do not assume machine speed or energy consumption alone determines EMC; document the pack's balancing policy.

## Boundaries and failure handling

Several machines process the same ore into different quantities of resources. If recipe, registry, format, or runtime evidence is incomplete, mark the result unknown and name the smallest additional evidence needed. Do not claim universal coverage or successful balancing without measurable validation.

## Trigger examples

- **Positive:** Only a single verified machine path is available.
- **Negative:** undefined
