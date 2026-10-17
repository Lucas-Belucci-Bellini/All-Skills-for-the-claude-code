---
name: atm10-recipe-namespace-overlap
description: "Identify competing recipes with the same resource ID or multiple mods/datapacks replacing the same crafting outcome unexpectedly. Isolate interactions between named components and prove the effective behavior with a minimal reversible test."
---

# ATM10 Recipe Namespace Overlap

## Purpose

Identify competing recipes with the same resource ID or multiple mods/datapacks replacing the same crafting outcome unexpectedly.

## Required inputs

The actual ATM10 mod inventory and exact versions; loader/build; relevant configs, datapacks, recipes, tags, registries or logs; expected versus actual behavior; recent changes; and a safe reproduction world/instance.

## Workflow

1. Name the two or more interacting components, relevant resource IDs/capabilities, and the exact behavior that should occur.
2. Verify each component and version exists in the installed profile. Do not assume official ATM10 contents or assign blame from the symptom alone.
3. Gather the effective runtime state: identify competing recipes with the same resource ID or multiple mods/datapacks replacing the same crafting outcome unexpectedly.
4. Create a minimal reproduction with a control case, holding game/loader/config versions constant and removing unrelated integrations.
5. Run this scoped interaction test: Enumerate duplicate recipe IDs, namespaces, load priority, and actual in-game recipe resolution for one representative item. Change one component or setting at a time and preserve the original state.
6. Compare effective registries/resources/capabilities and resulting behavior, not merely config text. Capture logs or resource identifiers that distinguish hypotheses.
7. If the interaction disappears only after one change, repeat the result and test an adjacent normal use case before proposing a correction.
8. Produce a compatibility finding with known-good/bad combinations, confidence, workaround risks, rollback instructions, and maintainers to involve if the issue is upstream.

## Validation checklist

- [ ] Involved mods/resources and exact versions are verified from the live inventory.
- [ ] Expected and actual behavior are concrete and reproducible.
- [ ] Effective runtime state/load order/registration is checked where relevant.
- [ ] A control case and one-variable isolation test exist.
- [ ] The result distinguishes direct interaction evidence from coincidence.
- [ ] Any workaround is minimal, reversible, and regression-tested.
- [ ] No unverified statement is presented as an upstream-known bug.

## Required output

A recipe collision matrix showing owners, selected result, intended result, and tested correction. Include the compatibility matrix, reproduction steps, artifacts/logs, confidence, side effects, and rollback plan.

## Boundaries and failure handling

Do not edit generated configs or remove multiple mods at once without a controlled plan. If a minimal test cannot be established, report which dependencies prevent isolation and what evidence is still missing.

## Trigger examples

- **Positive:** A modified ATM10 behavior changes when two mods or a mod and datapack operate on the same system.
- **Negative:** A single-mod issue has no evidence of interaction with another component.
