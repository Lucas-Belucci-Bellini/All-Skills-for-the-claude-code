---
name: projecte-emc-magic-artifact-tiering
description: "Reviews EMC policy for magical items, rituals, essences, and artifacts. Use when a shared EMC economy could bypass magic progression."
---

# ProjectE Magic Artifact Tiering

## Purpose

Trace ritual/research/quest requirements and repeatability.

## Required inputs

Magic recipes, ritual requirements, research gates, drops, and item identifiers.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and configuration sources. If version evidence is unavailable, stop before proposing changes.
2. Separate reusable ingredients from gated rewards and stateful artifacts.
3. Record the non-item costs or gates omitted by a simple recipe graph and assess bypass risk.
4. Validate findings with a disposable fixture or independent lookup, compare current and proposed behavior, and mark unresolved data rather than filling gaps with assumptions.
5. Produce a magic progression table with evidence, candidate range or restriction, and open assumptions. with source references, confirmed-versus-proposed status, confidence, affected IDs, and the next safe action.

## Validation checklist

- [ ] Target versions and evidence sources are recorded; unknown version details are not guessed.
- [ ] Item identifiers and quantities are confirmed against target registry/config rather than display names alone.
- [ ] The topic-specific behavior has an observable reproduction or data check.
- [ ] Proposed values are distinct from confirmed values and include a justification or a clear review-needed state.
- [ ] No production world/config is changed without backup, scoped diff, and rollback path.

## Required output

A magic progression table with evidence, candidate range or restriction, and open assumptions.

## Boundaries and failure handling

Do not invent ritual costs when acquisition documentation is unavailable. If registry, recipe, format, or runtime evidence is incomplete, mark the result unknown and state the smallest additional evidence needed. Do not claim that all EMC values are configured or balanced without measurable coverage and validation.

## Trigger examples

- **Positive:** EMC availability might skip a ritual, discovery, or boss reward.
- **Negative:** The item is a common craftable utility with no meaningful gate.
