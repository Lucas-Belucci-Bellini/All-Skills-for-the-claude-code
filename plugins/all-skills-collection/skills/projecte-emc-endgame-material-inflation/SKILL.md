---
name: projecte-emc-endgame-material-inflation
description: "Finds late-game materials whose EMC is low relative to prerequisites. Use when endgame goals feel trivial after a conversion."
---

# Endgame Material Inflation Audit

## Purpose

endgame recipe graph, prerequisites, candidate values, pack objectives

## Required inputs

Identify endgame items from verified prerequisites and trace shortest acquisition paths.

## Workflow

1. Confirm the actual Minecraft/loader/ProjectE versions and target config locations before interpreting recipe or item behavior.
2. Compare values with precursor costs and milestone requirements.
3. An inflation report with paths, ratios, and priorities.
4. Reproduce the candidate path with disposable fixtures or a calculation based on confirmed quantities; record runtime facts that could not be tested as unverified.
5. Produce do not label an item endgame solely from its name. with evidence, counts, status, and the next safe step.

## Validation checklist

- [ ] Version, registry, and source evidence are recorded.
- [ ] The full relevant route includes quantities, alternatives, remainders, and state changes.
- [ ] Suspected bypasses have a reproducible calculation or item-count comparison.
- [ ] Unknown quantities, chance outcomes, or runtime behavior are explicitly marked unknown.
- [ ] Live validation is bounded, backed up, and reversible.

## Required output

Do not label an item endgame solely from its name.

## Boundaries and failure handling

A final-tier material costs less than one of its prerequisites. A graph cycle or unusual yield is only a hypothesis until target recipe and state transitions support it. Stop when a safe minimal reproduction cannot be created without affecting production data.

## Trigger examples

- **Positive:** The item has no meaningful tier dependency.
- **Negative:** undefined
