---
name: projecte-emc-state-reset-value-laundering-test
description: "Tests whether conversion can remove or reset valuable item state without a net EMC cost. Use for charges, damage, enchantments, or upgrades."
---

# Item State Reset Value Laundering Test

## Purpose

stateful item samples, serialization, conversion paths, lookup behavior

## Required inputs

Build before/after fixtures for meaningful state fields using disposable items.

## Workflow

1. Confirm the actual Minecraft/loader/ProjectE versions and target config locations before interpreting recipe or item behavior.
2. Compare state retention, reset, and returned values over each conversion path.
3. A state-laundering matrix with reproduction and safe mitigation ideas.
4. Reproduce the candidate path with disposable fixtures or a calculation based on confirmed quantities; record runtime facts that could not be tested as unverified.
5. Produce never test with production-world valuables or player inventory. with evidence, counts, status, and the next safe step.

## Validation checklist

- [ ] Version, registry, and source evidence are recorded.
- [ ] The full relevant route includes quantities, alternatives, remainders, and state changes.
- [ ] Suspected bypasses have a reproducible calculation or item-count comparison.
- [ ] Unknown quantities, chance outcomes, or runtime behavior are explicitly marked unknown.
- [ ] Live validation is bounded, backed up, and reversible.

## Required output

Never test with production-world valuables or player inventory.

## Boundaries and failure handling

A charge or upgrade survives while the base item is valued cheaply. A graph cycle or unusual yield is only a hypothesis until target recipe and state transitions support it. Stop when a safe minimal reproduction cannot be created without affecting production data.

## Trigger examples

- **Positive:** The item is stateless or has no conversion route.
- **Negative:** undefined
