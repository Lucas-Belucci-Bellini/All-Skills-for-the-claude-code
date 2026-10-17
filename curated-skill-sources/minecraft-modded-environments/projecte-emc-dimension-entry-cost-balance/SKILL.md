---
name: projecte-emc-dimension-entry-cost-balance
description: "Reviews EMC effects on dimension entry costs. Use when portal items, keys, or catalysts can be transmuted."
---

# Dimension Entry Cost Balance

## Purpose

dimension recipes, prerequisites, quest gates, resource sources

## Required inputs

Trace exact entry recipes and prerequisites from pack data.

## Workflow

1. Confirm the actual Minecraft/loader/ProjectE versions and target config locations before interpreting recipe or item behavior.
2. Test whether EMC access to one component bypasses intended preparation steps.
3. A dimension entry report with dependency chain and bypass risk.
4. Reproduce the candidate path with disposable fixtures or a calculation based on confirmed quantities; record runtime facts that could not be tested as unverified.
5. Produce do not assume a portal requirement is critical unless pack evidence confirms it. with evidence, counts, status, and the next safe step.

## Validation checklist

- [ ] Version, registry, and source evidence are recorded.
- [ ] The full relevant route includes quantities, alternatives, remainders, and state changes.
- [ ] Suspected bypasses have a reproducible calculation or item-count comparison.
- [ ] Unknown quantities, chance outcomes, or runtime behavior are explicitly marked unknown.
- [ ] Live validation is bounded, backed up, and reversible.

## Required output

Do not assume a portal requirement is critical unless pack evidence confirms it.

## Boundaries and failure handling

A rare portal catalyst can be made from early-game materials. A graph cycle or unusual yield is only a hypothesis until target recipe and state transitions support it. Stop when a safe minimal reproduction cannot be created without affecting production data.

## Trigger examples

- **Positive:** No dimension access recipe is affected.
- **Negative:** undefined
