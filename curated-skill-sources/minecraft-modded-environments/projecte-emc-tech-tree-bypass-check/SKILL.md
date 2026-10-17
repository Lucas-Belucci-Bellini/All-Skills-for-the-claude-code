---
name: projecte-emc-tech-tree-bypass-check
description: "Detects EMC routes that skip intended technology unlocks. Use when a component normally requires staged progression."
---

# Technology Tree Bypass Check

## Purpose

technology graph, machine recipes, component tiers, EMC candidates

## Required inputs

Map components to the earliest machine or research gate that produces them.

## Workflow

1. Confirm the actual Minecraft/loader/ProjectE versions and target config locations before interpreting recipe or item behavior.
2. Trace transmutation and recipe routes for pre-gate acquisition.
3. A tech-bypass report with exact paths and review candidates.
4. Reproduce the candidate path with disposable fixtures or a calculation based on confirmed quantities; record runtime facts that could not be tested as unverified.
5. Produce do not equate crafting cost and progression gates without evidence. with evidence, counts, status, and the next safe step.

## Validation checklist

- [ ] Version, registry, and source evidence are recorded.
- [ ] The full relevant route includes quantities, alternatives, remainders, and state changes.
- [ ] Suspected bypasses have a reproducible calculation or item-count comparison.
- [ ] Unknown quantities, chance outcomes, or runtime behavior are explicitly marked unknown.
- [ ] Live validation is bounded, backed up, and reversible.

## Required output

Do not equate crafting cost and progression gates without evidence.

## Boundaries and failure handling

An advanced circuit can be transmuted before its machine is unlocked. A graph cycle or unusual yield is only a hypothesis until target recipe and state transitions support it. Stop when a safe minimal reproduction cannot be created without affecting production data.

## Trigger examples

- **Positive:** The item is not tied to tech progression.
- **Negative:** undefined
