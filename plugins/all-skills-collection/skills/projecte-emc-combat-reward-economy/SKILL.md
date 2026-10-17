---
name: projecte-emc-combat-reward-economy
description: "Evaluates how EMC changes incentives to fight mobs or complete encounters. Use for repeatable drops and gated rewards."
---

# Combat Reward Economy Review

## Purpose

loot tables, spawn repeatability, drops, recipes, progression map

## Required inputs

Separate renewable common drops from unique gated rewards and verified output ranges.

## Workflow

1. Confirm the actual Minecraft/loader/ProjectE versions and target config locations before interpreting recipe or item behavior.
2. Compare EMC access with encounter gates and farmability; flag trivial bypass paths.
3. A combat reward report with repeatability, gate, and playtest notes.
4. Reproduce the candidate path with disposable fixtures or a calculation based on confirmed quantities; record runtime facts that could not be tested as unverified.
5. Produce do not invent drop rates or infer combat difficulty. with evidence, counts, status, and the next safe step.

## Validation checklist

- [ ] Version, registry, and source evidence are recorded.
- [ ] The full relevant route includes quantities, alternatives, remainders, and state changes.
- [ ] Suspected bypasses have a reproducible calculation or item-count comparison.
- [ ] Unknown quantities, chance outcomes, or runtime behavior are explicitly marked unknown.
- [ ] Live validation is bounded, backed up, and reversible.

## Required output

Do not invent drop rates or infer combat difficulty.

## Boundaries and failure handling

A boss or hostile-mob drop is meant to reward combat effort. A graph cycle or unusual yield is only a hypothesis until target recipe and state transitions support it. Stop when a safe minimal reproduction cannot be created without affecting production data.

## Trigger examples

- **Positive:** The item has no mob-drop or combat role.
- **Negative:** undefined
