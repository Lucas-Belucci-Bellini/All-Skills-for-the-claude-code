---
name: projecte-emc-magic-ritual-bypass-check
description: "Detects EMC routes that skip rituals, research, or magical discovery. Use when magic items carry non-material progression costs."
---

# Magic Ritual Bypass Check

## Purpose

ritual inputs, unlock quests, altars, recipes, item states

## Required inputs

Record confirmed ritual/research prerequisites and the first verified production point.

## Workflow

1. Confirm the actual Minecraft/loader/ProjectE versions and target config locations before interpreting recipe or item behavior.
2. Determine whether EMC supplies the reward directly or bypasses a gated catalyst.
3. A ritual bypass report with dependency evidence and actions.
4. Reproduce the candidate path with disposable fixtures or a calculation based on confirmed quantities; record runtime facts that could not be tested as unverified.
5. Produce do not claim undocumented ritual rules without data or reproduction. with evidence, counts, status, and the next safe step.

## Validation checklist

- [ ] Version, registry, and source evidence are recorded.
- [ ] The full relevant route includes quantities, alternatives, remainders, and state changes.
- [ ] Suspected bypasses have a reproducible calculation or item-count comparison.
- [ ] Unknown quantities, chance outcomes, or runtime behavior are explicitly marked unknown.
- [ ] Live validation is bounded, backed up, and reversible.

## Required output

Do not claim undocumented ritual rules without data or reproduction.

## Boundaries and failure handling

A gated magical artifact becomes directly obtainable with EMC. A graph cycle or unusual yield is only a hypothesis until target recipe and state transitions support it. Stop when a safe minimal reproduction cannot be created without affecting production data.

## Trigger examples

- **Positive:** The item has no ritual/discovery path.
- **Negative:** undefined
