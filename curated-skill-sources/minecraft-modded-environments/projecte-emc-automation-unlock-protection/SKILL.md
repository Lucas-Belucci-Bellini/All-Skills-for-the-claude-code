---
name: projecte-emc-automation-unlock-protection
description: "Checks whether EMC bypasses automation upgrade costs. Use when high-throughput machines depend on progression items."
---

# Automation Unlock Protection Review

## Purpose

automation tier graph, upgrade recipes, throughput, EMC mapping

## Required inputs

Map upgrades to prerequisites, power requirements, and production impact.

## Workflow

1. Confirm the actual Minecraft/loader/ProjectE versions and target config locations before interpreting recipe or item behavior.
2. Simulate EMC routes and assess whether late automation becomes available too early.
3. An unlock report with prerequisite chain and throughput implications.
4. Reproduce the candidate path with disposable fixtures or a calculation based on confirmed quantities; record runtime facts that could not be tested as unverified.
5. Produce not every automation item requires a hard lock; follow the declared profile. with evidence, counts, status, and the next safe step.

## Validation checklist

- [ ] Version, registry, and source evidence are recorded.
- [ ] The full relevant route includes quantities, alternatives, remainders, and state changes.
- [ ] Suspected bypasses have a reproducible calculation or item-count comparison.
- [ ] Unknown quantities, chance outcomes, or runtime behavior are explicitly marked unknown.
- [ ] Live validation is bounded, backed up, and reversible.

## Required output

Not every automation item requires a hard lock; follow the declared profile.

## Boundaries and failure handling

A cheap conversion unlocks an automated resource farm. A graph cycle or unusual yield is only a hypothesis until target recipe and state transitions support it. Stop when a safe minimal reproduction cannot be created without affecting production data.

## Trigger examples

- **Positive:** The item has no production or automation effect.
- **Negative:** undefined
