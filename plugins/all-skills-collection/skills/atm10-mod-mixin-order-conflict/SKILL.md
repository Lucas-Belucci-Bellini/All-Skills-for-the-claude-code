---
name: atm10-mod-mixin-order-conflict
description: "Determine whether two mods alter the same class/method incompatibly or a mixin failure is secondary to a missing dependency or version mismatch. Isolate interactions between named components and prove the effective behavior with a minimal reversible test."
---

# ATM10 Cross-Mod Mixin Order Conflict

## Purpose

Determine whether two mods alter the same class/method incompatibly or a mixin failure is secondary to a missing dependency or version mismatch.

## Required inputs

The actual ATM10 mod inventory and exact versions; loader/build; relevant configs, datapacks, recipes, tags, registries or logs; expected versus actual behavior; recent changes; and a safe reproduction world/instance.

## Workflow

1. Name the two or more interacting components, relevant resource IDs/capabilities, and the exact behavior that should occur.
2. Verify each component and version exists in the installed profile. Do not assume official ATM10 contents or assign blame from the symptom alone.
3. Gather the effective runtime state: determine whether two mods alter the same class/method incompatibly or a mixin failure is secondary to a missing dependency or version mismatch.
4. Create a minimal reproduction with a control case, holding game/loader/config versions constant and removing unrelated integrations.
5. Run this scoped interaction test: Build a two-mod test matrix in an isolated instance and compare applied-mixin diagnostics while keeping loader and dependency versions fixed. Change one component or setting at a time and preserve the original state.
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

A pairwise compatibility record with first causal error, tested versions, reproduction steps, and minimal escalation evidence. Include the compatibility matrix, reproduction steps, artifacts/logs, confidence, side effects, and rollback plan.

## Boundaries and failure handling

Do not edit generated configs or remove multiple mods at once without a controlled plan. If a minimal test cannot be established, report which dependencies prevent isolation and what evidence is still missing.

## Trigger examples

- **Positive:** A modified ATM10 behavior changes when two mods or a mod and datapack operate on the same system.
- **Negative:** A single-mod issue has no evidence of interaction with another component.
