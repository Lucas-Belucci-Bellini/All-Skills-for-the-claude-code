---
name: projecte-emc-early-game-scarcity-check
description: "Checks whether EMC assignments remove early-game resource constraints. Use when early items unlock higher-tier chains."
---

# Early-Game Scarcity Check

## Purpose

early recipes, initial progression milestones, acquisition sources, candidate values

## Required inputs

Select representative early resources and list what they unlock directly or through recipe chains.

## Workflow

1. Confirm the actual Minecraft/loader/ProjectE versions and target config locations before interpreting recipe or item behavior.
2. Compare their candidate values with acquisition effort and downstream unlock power.
3. A scarcity report with affected resources, bypass chains, and balancing decisions.
4. Reproduce the candidate path with disposable fixtures or a calculation based on confirmed quantities; record runtime facts that could not be tested as unverified.
5. Produce do not define early game from a generic guide; use actual pack progression. with evidence, counts, status, and the next safe step.

## Validation checklist

- [ ] Version, registry, and source evidence are recorded.
- [ ] The full relevant route includes quantities, alternatives, remainders, and state changes.
- [ ] Suspected bypasses have a reproducible calculation or item-count comparison.
- [ ] Unknown quantities, chance outcomes, or runtime behavior are explicitly marked unknown.
- [ ] Live validation is bounded, backed up, and reversible.

## Required output

Do not define early game from a generic guide; use actual pack progression.

## Boundaries and failure handling

A starter resource may convert into a late-game component. A graph cycle or unusual yield is only a hypothesis until target recipe and state transitions support it. Stop when a safe minimal reproduction cannot be created without affecting production data.

## Trigger examples

- **Positive:** The item is unrelated to early-game progression.
- **Negative:** undefined
