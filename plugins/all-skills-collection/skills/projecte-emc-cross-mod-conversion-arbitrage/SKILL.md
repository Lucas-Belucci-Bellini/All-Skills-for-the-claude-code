---
name: projecte-emc-cross-mod-conversion-arbitrage
description: "Finds arbitrage paths between equivalent materials across mods. Use when machines convert materials across namespaces."
---

# Cross-Mod Conversion Arbitrage Scan

## Purpose

cross-mod recipes, equivalence map, ratios, values, machine constraints

## Required inputs

Join confirmed equivalent materials to conversion paths across mod IDs.

## Workflow

1. Confirm the actual Minecraft/loader/ProjectE versions and target config locations before interpreting recipe or item behavior.
2. Compare cheapest source path with highest-value output using normalized quantities.
3. An arbitrage table with exact paths, prerequisites, and candidate fixes.
4. Reproduce the candidate path with disposable fixtures or a calculation based on confirmed quantities; record runtime facts that could not be tested as unverified.
5. Produce do not merge non-equivalent materials or assume a recipe exists without evidence. with evidence, counts, status, and the next safe step.

## Validation checklist

- [ ] Version, registry, and source evidence are recorded.
- [ ] The full relevant route includes quantities, alternatives, remainders, and state changes.
- [ ] Suspected bypasses have a reproducible calculation or item-count comparison.
- [ ] Unknown quantities, chance outcomes, or runtime behavior are explicitly marked unknown.
- [ ] Live validation is bounded, backed up, and reversible.

## Required output

Do not merge non-equivalent materials or assume a recipe exists without evidence.

## Boundaries and failure handling

One mod's cheap dust becomes another mod's expensive ingot. A graph cycle or unusual yield is only a hypothesis until target recipe and state transitions support it. Stop when a safe minimal reproduction cannot be created without affecting production data.

## Trigger examples

- **Positive:** No cross-mod conversion relationship exists.
- **Negative:** undefined
