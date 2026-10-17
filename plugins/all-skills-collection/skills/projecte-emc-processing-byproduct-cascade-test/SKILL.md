---
name: projecte-emc-processing-byproduct-cascade-test
description: "Tests chained byproducts for compounding value across machines. Use when residue feeds additional recipes."
---

# Processing Byproduct Cascade Test

## Purpose

processing graph, byproduct routes, quantities, values, and cycle costs

## Required inputs

Trace direct and indirect byproduct routes to terminal outputs or return cycles.

## Workflow

1. Confirm the actual Minecraft/loader/ProjectE versions and target config locations before interpreting recipe or item behavior.
2. Calculate cumulative output value including probability, containers, and catalysts.
3. A cascade report with path, value, assumptions, and test candidates.
4. Reproduce the candidate path with disposable fixtures or a calculation based on confirmed quantities; record runtime facts that could not be tested as unverified.
5. Produce keep expected and worst-case probabilistic results distinct. with evidence, counts, status, and the next safe step.

## Validation checklist

- [ ] Version, registry, and source evidence are recorded.
- [ ] The full relevant route includes quantities, alternatives, remainders, and state changes.
- [ ] Suspected bypasses have a reproducible calculation or item-count comparison.
- [ ] Unknown quantities, chance outcomes, or runtime behavior are explicitly marked unknown.
- [ ] Live validation is bounded, backed up, and reversible.

## Required output

Keep expected and worst-case probabilistic results distinct.

## Boundaries and failure handling

A residue becomes a high-value input for another chain. A graph cycle or unusual yield is only a hypothesis until target recipe and state transitions support it. Stop when a safe minimal reproduction cannot be created without affecting production data.

## Trigger examples

- **Positive:** No chained byproduct route exists.
- **Negative:** undefined
