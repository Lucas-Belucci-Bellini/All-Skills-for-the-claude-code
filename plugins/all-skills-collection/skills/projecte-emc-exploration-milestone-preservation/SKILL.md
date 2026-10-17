---
name: projecte-emc-exploration-milestone-preservation
description: "Identifies EMC routes that undermine intended exploration rewards. Use when exploration is a core progression mechanic."
---

# Exploration Milestone Preservation Audit

## Purpose

structure rewards, biome/dimension sources, quest gates, recipes, design goals

## Required inputs

Map verified exploration milestones to the unique resources or abilities they provide.

## Workflow

1. Confirm the actual Minecraft/loader/ProjectE versions and target config locations before interpreting recipe or item behavior.
2. Trace whether EMC grants the same reward before the intended discovery and classify the bypass.
3. A milestone impact table with source evidence and review decisions.
4. Reproduce the candidate path with disposable fixtures or a calculation based on confirmed quantities; record runtime facts that could not be tested as unverified.
5. Produce do not protect every item automatically; record the intended milestone. with evidence, counts, status, and the next safe step.

## Validation checklist

- [ ] Version, registry, and source evidence are recorded.
- [ ] The full relevant route includes quantities, alternatives, remainders, and state changes.
- [ ] Suspected bypasses have a reproducible calculation or item-count comparison.
- [ ] Unknown quantities, chance outcomes, or runtime behavior are explicitly marked unknown.
- [ ] Live validation is bounded, backed up, and reversible.

## Required output

Do not protect every item automatically; record the intended milestone.

## Boundaries and failure handling

An exploration reward becomes obtainable from common material. A graph cycle or unusual yield is only a hypothesis until target recipe and state transitions support it. Stop when a safe minimal reproduction cannot be created without affecting production data.

## Trigger examples

- **Positive:** No exploration milestone is linked to the resource.
- **Negative:** undefined
