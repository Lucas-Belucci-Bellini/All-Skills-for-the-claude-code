---
name: projecte-emc-progression-acceptance-scenarios
description: "Creates reproducible scenarios for approving an EMC policy. Use before accepting a batch of value changes."
---

# EMC Progression Acceptance Scenarios

## Purpose

balance profile, representative items, progression graph, proposed values

## Required inputs

Define starting states, goals, constraints, and measurable outcomes for each player scenario.

## Workflow

1. Confirm the actual Minecraft/loader/ProjectE versions and target config locations before interpreting recipe or item behavior.
2. Compare baseline and proposal for shortcuts and added grind; separate static calculations from playtests.
3. An acceptance matrix with steps, expected observations, pass/fail rules, and tests pending.
4. Reproduce the candidate path with disposable fixtures or a calculation based on confirmed quantities; record runtime facts that could not be tested as unverified.
5. Produce do not claim playtest acceptance when only static reasoning was done. with evidence, counts, status, and the next safe step.

## Validation checklist

- [ ] Version, registry, and source evidence are recorded.
- [ ] The full relevant route includes quantities, alternatives, remainders, and state changes.
- [ ] Suspected bypasses have a reproducible calculation or item-count comparison.
- [ ] Unknown quantities, chance outcomes, or runtime behavior are explicitly marked unknown.
- [ ] Live validation is bounded, backed up, and reversible.

## Required output

Do not claim playtest acceptance when only static reasoning was done.

## Boundaries and failure handling

A candidate table needs acceptance criteria before release. A graph cycle or unusual yield is only a hypothesis until target recipe and state transitions support it. Stop when a safe minimal reproduction cannot be created without affecting production data.

## Trigger examples

- **Positive:** No proposal or progression behavior is under evaluation.
- **Negative:** undefined
