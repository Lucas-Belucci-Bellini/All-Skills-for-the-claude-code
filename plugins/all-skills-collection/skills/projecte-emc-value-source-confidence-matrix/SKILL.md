---
name: projecte-emc-value-source-confidence-matrix
description: "Classifies how strongly each item value is supported by local evidence. Use when combining existing config, recipes, upstream docs, and playtest results."
---

# ProjectE EMC Value Source Confidence Matrix

## Purpose

current config, recipe graph, external references with version/date, tests, and source provenance

## Required inputs

Record whether each value is observed in the current pack, derived from verified recipes, copied from a cited compatible source, or proposed by policy.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and config sources. If version evidence is unavailable, stop before proposing changes.
2. Resolve contradictions by preferring target-version local evidence and document external data as context rather than authority.
3. A value provenance matrix with source type, applicable version, confidence, and unresolved conflicts.
4. Validate the finding against a disposable fixture, repeatable calculation, or independent data lookup; compare current and proposed behavior and mark unknowns explicitly.
5. Produce do not cite an unversioned wiki as proof of the user's local configuration. with evidence references, confirmed-versus-proposed status, affected IDs, assumptions, confidence, and the next safe action.

## Validation checklist

- [ ] The target version and evidence source are recorded; unknown version details are not guessed.
- [ ] The topic-specific behavior or data relationship has a reproducible check.
- [ ] Inputs, quantities, units, gates, or other assumptions relevant to the decision are explicit.
- [ ] Proposed values are distinguished from confirmed values and include rationale or a review-needed status.
- [ ] No production config/world is changed without backup, scoped diff, and rollback path.

## Required output

Do not cite an unversioned wiki as proof of the user's local configuration.

## Boundaries and failure handling

A review needs to separate confirmed EMC values from heuristic proposals. If recipe, registry, format, or runtime evidence is incomplete, mark the result unknown and name the smallest additional evidence needed. Do not claim universal coverage or successful balancing without measurable validation.

## Trigger examples

- **Positive:** The task does not use or evaluate source evidence.
- **Negative:** undefined
