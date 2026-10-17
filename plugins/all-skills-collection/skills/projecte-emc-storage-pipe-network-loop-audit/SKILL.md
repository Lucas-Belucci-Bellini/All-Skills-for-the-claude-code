---
name: projecte-emc-storage-pipe-network-loop-audit
description: "Investigates EMC loops involving storage, pipes, filters, and auto-crafting. Use when automation can repeatedly route items through conversions."
---

# Storage and Pipe Network Loop Audit

## Purpose

storage/pipe mods, filters, auto-crafting recipes, item counts, test setup

## Required inputs

Trace inventory boundaries, stack quantities, filters, and event boundaries in a minimal test network.

## Workflow

1. Confirm the actual Minecraft/loader/ProjectE versions and target config locations before interpreting recipe or item behavior.
2. Run bounded cycles and compare item counts and EMC to expected conservation.
3. A topology report with steps, count deltas, and suspected edge.
4. Reproduce the candidate path with disposable fixtures or a calculation based on confirmed quantities; record runtime facts that could not be tested as unverified.
5. Produce do not run high-volume tests on a shared server without authorization. with evidence, counts, status, and the next safe step.

## Validation checklist

- [ ] Version, registry, and source evidence are recorded.
- [ ] The full relevant route includes quantities, alternatives, remainders, and state changes.
- [ ] Suspected bypasses have a reproducible calculation or item-count comparison.
- [ ] Unknown quantities, chance outcomes, or runtime behavior are explicitly marked unknown.
- [ ] Live validation is bounded, backed up, and reversible.

## Required output

Do not run high-volume tests on a shared server without authorization.

## Boundaries and failure handling

A network may route an item through a value-increasing conversion repeatedly. A graph cycle or unusual yield is only a hypothesis until target recipe and state transitions support it. Stop when a safe minimal reproduction cannot be created without affecting production data.

## Trigger examples

- **Positive:** No storage automation or loop behavior is involved.
- **Negative:** undefined
