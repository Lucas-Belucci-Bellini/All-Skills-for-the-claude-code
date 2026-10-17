---
name: projecte-emc-reversible-conversion-gain-scan
description: "Tests bidirectional transformations for value gain or loss. Use for compression, filling, refining, or unpacking."
---

# Reversible Conversion Gain Scan

## Purpose

forward/reverse recipes, output amounts, remainders, EMC values, state behavior

## Required inputs

Pair confirmed transformations and normalize every quantity and returned item.

## Workflow

1. Confirm the actual Minecraft/loader/ProjectE versions and target config locations before interpreting recipe or item behavior.
2. Calculate round-trip gain/loss and test non-invertible states separately.
3. A conversion scan with net value, state changes, and test path.
4. Reproduce the candidate path with disposable fixtures or a calculation based on confirmed quantities; record runtime facts that could not be tested as unverified.
5. Produce do not infer reverse recipes from names; confirm both directions. with evidence, counts, status, and the next safe step.

## Validation checklist

- [ ] Version, registry, and source evidence are recorded.
- [ ] The full relevant route includes quantities, alternatives, remainders, and state changes.
- [ ] Suspected bypasses have a reproducible calculation or item-count comparison.
- [ ] Unknown quantities, chance outcomes, or runtime behavior are explicitly marked unknown.
- [ ] Live validation is bounded, backed up, and reversible.

## Required output

Do not infer reverse recipes from names; confirm both directions.

## Boundaries and failure handling

A material can be packed/unpacked to change EMC value. A graph cycle or unusual yield is only a hypothesis until target recipe and state transitions support it. Stop when a safe minimal reproduction cannot be created without affecting production data.

## Trigger examples

- **Positive:** No verified reverse path exists.
- **Negative:** undefined
