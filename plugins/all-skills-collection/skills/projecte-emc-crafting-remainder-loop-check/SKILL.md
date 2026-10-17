---
name: projecte-emc-crafting-remainder-loop-check
description: "Finds loops enabled by reusable containers, catalysts, or tools. Use when crafting may preserve an expensive input."
---

# Crafting Remainder Loop Check

## Purpose

recipes, remainder rules, item state behavior, quantities, EMC assignments

## Required inputs

Trace remainders across repeated crafting steps and identify returned reusable resources.

## Workflow

1. Confirm the actual Minecraft/loader/ProjectE versions and target config locations before interpreting recipe or item behavior.
2. Compute repeated-cycle net value and test whether states unlock another conversion.
3. A remainder-loop report with exact chain and bounded reproduction.
4. Reproduce the candidate path with disposable fixtures or a calculation based on confirmed quantities; record runtime facts that could not be tested as unverified.
5. Produce do not run unbounded loops or change live configuration during investigation. with evidence, counts, status, and the next safe step.

## Validation checklist

- [ ] Version, registry, and source evidence are recorded.
- [ ] The full relevant route includes quantities, alternatives, remainders, and state changes.
- [ ] Suspected bypasses have a reproducible calculation or item-count comparison.
- [ ] Unknown quantities, chance outcomes, or runtime behavior are explicitly marked unknown.
- [ ] Live validation is bounded, backed up, and reversible.

## Required output

Do not run unbounded loops or change live configuration during investigation.

## Boundaries and failure handling

A catalyst survives while valuable output is produced repeatedly. A graph cycle or unusual yield is only a hypothesis until target recipe and state transitions support it. Stop when a safe minimal reproduction cannot be created without affecting production data.

## Trigger examples

- **Positive:** No remainder or reusable catalyst is present.
- **Negative:** undefined
