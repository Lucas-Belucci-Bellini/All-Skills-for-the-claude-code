---
name: projecte-emc-renewable-to-gated-resource-path
description: "Finds paths that turn renewable inputs into gated or scarce resources. Use when farming or passive output may bypass progression."
---

# Renewable-to-Gated Resource Path Audit

## Purpose

renewable sources, processing routes, resource gates, and EMC values

## Required inputs

Enumerate full routes from renewable inputs to the gated output.

## Workflow

1. Confirm the actual Minecraft/loader/ProjectE versions and target config locations before interpreting recipe or item behavior.
2. Calculate repeatability, prerequisite chain, and possible infinite catalysts.
3. A path audit with exact chain, assumptions, and correction candidates.
4. Reproduce the candidate path with disposable fixtures or a calculation based on confirmed quantities; record runtime facts that could not be tested as unverified.
5. Produce confirm repeatability and reset mechanics before calling a source renewable. with evidence, counts, status, and the next safe step.

## Validation checklist

- [ ] Version, registry, and source evidence are recorded.
- [ ] The full relevant route includes quantities, alternatives, remainders, and state changes.
- [ ] Suspected bypasses have a reproducible calculation or item-count comparison.
- [ ] Unknown quantities, chance outcomes, or runtime behavior are explicitly marked unknown.
- [ ] Live validation is bounded, backed up, and reversible.

## Required output

Confirm repeatability and reset mechanics before calling a source renewable.

## Boundaries and failure handling

A crop or mob drop can produce a gated material. A graph cycle or unusual yield is only a hypothesis until target recipe and state transitions support it. Stop when a safe minimal reproduction cannot be created without affecting production data.

## Trigger examples

- **Positive:** No renewable-to-gated route can be demonstrated.
- **Negative:** undefined
