---
name: projecte-emc-duplicate-output-signal-check
description: "Detects duplicate output behavior from recipes, remainders, or integrations. Use when machines produce more than expected."
---

# Duplicate Output Signal Check

## Purpose

recipe output definitions, event hooks, machine routes, and test logs

## Required inputs

Compare declared recipe outputs to observed results in a minimal setup.

## Workflow

1. Confirm the actual Minecraft/loader/ProjectE versions and target config locations before interpreting recipe or item behavior.
2. Check duplicate event processing, output registration, and count mismatches.
3. A report separating quantity rules, integration conflict, and runtime evidence.
4. Reproduce the candidate path with disposable fixtures or a calculation based on confirmed quantities; record runtime facts that could not be tested as unverified.
5. Produce high yield alone does not prove duplication; reproduce count deltas. with evidence, counts, status, and the next safe step.

## Validation checklist

- [ ] Version, registry, and source evidence are recorded.
- [ ] The full relevant route includes quantities, alternatives, remainders, and state changes.
- [ ] Suspected bypasses have a reproducible calculation or item-count comparison.
- [ ] Unknown quantities, chance outcomes, or runtime behavior are explicitly marked unknown.
- [ ] Live validation is bounded, backed up, and reversible.

## Required output

High yield alone does not prove duplication; reproduce count deltas.

## Boundaries and failure handling

A machine appears to output the same byproduct twice. A graph cycle or unusual yield is only a hypothesis until target recipe and state transitions support it. Stop when a safe minimal reproduction cannot be created without affecting production data.

## Trigger examples

- **Positive:** Counts match the verified recipe and no symptom exists.
- **Negative:** undefined
