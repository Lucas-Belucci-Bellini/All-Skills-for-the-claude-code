---
name: projecte-emc-farming-crop-value-balance
description: "Checks crop, seed, fertilizer, and breeding chains. Use when agriculture can automate high-value resource production."
---

# Farming Crop Value Balance

## Purpose

crop/seed recipes, growth cycles, harvest yields, fertilizer, item values

## Required inputs

Enumerate renewable loops from starting seed to output and replant cost.

## Workflow

1. Confirm the actual Minecraft/loader/ProjectE versions and target config locations before interpreting recipe or item behavior.
2. Estimate value per cycle under documented conditions; flag free multiplication or gated crops made trivial.
3. A farming balance table with assumptions, output value, and loop risks.
4. Reproduce the candidate path with disposable fixtures or a calculation based on confirmed quantities; record runtime facts that could not be tested as unverified.
5. Produce do not guess growth rates; mark unmeasured timings as estimates. with evidence, counts, status, and the next safe step.

## Validation checklist

- [ ] Version, registry, and source evidence are recorded.
- [ ] The full relevant route includes quantities, alternatives, remainders, and state changes.
- [ ] Suspected bypasses have a reproducible calculation or item-count comparison.
- [ ] Unknown quantities, chance outcomes, or runtime behavior are explicitly marked unknown.
- [ ] Live validation is bounded, backed up, and reversible.

## Required output

Do not guess growth rates; mark unmeasured timings as estimates.

## Boundaries and failure handling

A crop can be automated into high EMC products. A graph cycle or unusual yield is only a hypothesis until target recipe and state transitions support it. Stop when a safe minimal reproduction cannot be created without affecting production data.

## Trigger examples

- **Positive:** The item has no renewable farming route.
- **Negative:** undefined
