---
name: projecte-emc-item-availability-phase-matrix
description: "Maps when items become available through each source. Use when EMC may grant access earlier than intended."
---

# Item Availability by Progression Phase Matrix

## Purpose

progression graph, recipes, loot, worldgen, trades, registry IDs

## Required inputs

Record earliest verified access and alternate acquisition routes.

## Workflow

1. Confirm the actual Minecraft/loader/ProjectE versions and target config locations before interpreting recipe or item behavior.
2. Flag items whose transmutation unlocks a later-stage source too early.
3. An availability matrix with source evidence and exception notes.
4. Reproduce the candidate path with disposable fixtures or a calculation based on confirmed quantities; record runtime facts that could not be tested as unverified.
5. Produce do not assign phase labels from memory. with evidence, counts, status, and the next safe step.

## Validation checklist

- [ ] Version, registry, and source evidence are recorded.
- [ ] The full relevant route includes quantities, alternatives, remainders, and state changes.
- [ ] Suspected bypasses have a reproducible calculation or item-count comparison.
- [ ] Unknown quantities, chance outcomes, or runtime behavior are explicitly marked unknown.
- [ ] Live validation is bounded, backed up, and reversible.

## Required output

Do not assign phase labels from memory.

## Boundaries and failure handling

An item has both early recipe access and late-game world source. A graph cycle or unusual yield is only a hypothesis until target recipe and state transitions support it. Stop when a safe minimal reproduction cannot be created without affecting production data.

## Trigger examples

- **Positive:** No progression gate affects the items.
- **Negative:** undefined
