---
name: projecte-emc-automation-throughput-impact
description: "Estimates how automation throughput interacts with EMC and resource supply. Use when machines or farms can generate large quantities over time."
---

# ProjectE Automation Throughput Impact

## Purpose

recipes, tick rate or cycle duration, resource input, output yield, server context, and proposed EMC

## Required inputs

Model output rate using verified machine timing and quantity data, retaining uncertainty where runtime timing is unknown.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and config sources. If version evidence is unavailable, stop before proposing changes.
2. Calculate value per minute and cumulative supply scenarios under conservative and high-throughput assumptions.
3. A throughput impact table with assumptions, units, sensitivity, and balancing risks.
4. Validate the finding against a disposable fixture, repeatable calculation, or independent data lookup; compare current and proposed behavior and mark unknowns explicitly.
5. Produce do not assert machine rates without measured or documented timing for the target version. with evidence references, confirmed-versus-proposed status, affected IDs, assumptions, confidence, and the next safe action.

## Validation checklist

- [ ] The target version and evidence source are recorded; unknown version details are not guessed.
- [ ] The topic-specific behavior or data relationship has a reproducible check.
- [ ] Inputs, quantities, units, gates, or other assumptions relevant to the decision are explicit.
- [ ] Proposed values are distinguished from confirmed values and include rationale or a review-needed status.
- [ ] No production config/world is changed without backup, scoped diff, and rollback path.

## Required output

Do not assert machine rates without measured or documented timing for the target version.

## Boundaries and failure handling

A cheap automated process may make a high-value resource nearly unlimited. If recipe, registry, format, or runtime evidence is incomplete, mark the result unknown and name the smallest additional evidence needed. Do not claim universal coverage or successful balancing without measurable validation.

## Trigger examples

- **Positive:** There is no recurring process or rate-dependent supply.
- **Negative:** undefined
