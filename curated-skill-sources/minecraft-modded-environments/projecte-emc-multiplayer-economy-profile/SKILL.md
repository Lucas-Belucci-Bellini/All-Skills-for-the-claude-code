---
name: projecte-emc-multiplayer-economy-profile
description: "Adapts EMC recommendations to a declared multiplayer play style and server economy. Use when player trading or shared automation changes scarcity."
---

# ProjectE Multiplayer Economy Profile

## Purpose

player count, trading model, shared farms, server rules, progression pace, and item-source data

## Required inputs

Capture the server's actual rules for trading, shared infrastructure, duplication restrictions, and progression pacing.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and config sources. If version evidence is unavailable, stop before proposing changes.
2. Model how repeatable production and free exchange change access to high-tier items under the chosen scenario.
3. A multiplayer profile with assumptions, value pressure points, and playtest questions.
4. Validate the finding against a disposable fixture, repeatable calculation, or independent data lookup; compare current and proposed behavior and mark unknowns explicitly.
5. Produce do not assume the number of players alone determines scarcity or a fair emc scale. with evidence references, confirmed-versus-proposed status, affected IDs, assumptions, confidence, and the next safe action.

## Validation checklist

- [ ] The target version and evidence source are recorded; unknown version details are not guessed.
- [ ] The topic-specific behavior or data relationship has a reproducible check.
- [ ] Inputs, quantities, units, gates, or other assumptions relevant to the decision are explicit.
- [ ] Proposed values are distinguished from confirmed values and include rationale or a review-needed status.
- [ ] No production config/world is changed without backup, scoped diff, and rollback path.

## Required output

Do not assume the number of players alone determines scarcity or a fair EMC scale.

## Boundaries and failure handling

A pack is intended for several players sharing automated resource production. If recipe, registry, format, or runtime evidence is incomplete, mark the result unknown and name the smallest additional evidence needed. Do not claim universal coverage or successful balancing without measurable validation.

## Trigger examples

- **Positive:** The target is a single-player experience with no social/economy interaction.
- **Negative:** undefined
