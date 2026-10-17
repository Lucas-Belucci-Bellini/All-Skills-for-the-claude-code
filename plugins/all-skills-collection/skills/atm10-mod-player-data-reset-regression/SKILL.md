---
name: atm10-mod-player-data-reset-regression
description: "Investigate a mod feature that resets player progress, capability data, quest state, or settings across relog or server restart. Require a repeatable reproduction and evidence from the actual modpack before assigning responsibility."
---

# ATM10 Individual Mod Player Data Reset Regression

## Purpose

Investigate a mod feature that resets player progress, capability data, quest state, or settings across relog or server restart.

## Required inputs

Verified installed mod ID/version, Minecraft/loader/Java version, sanitized logs or relevant state captures, expected/actual behavior, recent changes, and precise steps. Use a test account or copied world when progress, inventory, or persistent data can change.

## Workflow

1. Verify the candidate mod identity and confirm that the feature exists in the installed version.
2. Record the smallest repeatable action and its expected result: investigate a mod feature that resets player progress, capability data, quest state, or settings across relog or server restart.
3. Capture the initial state, the first observed divergence, and the relevant log/metric evidence.
4. Create a control case and define a pass/fail criterion before changing settings or artifacts.
5. Execute this focused experiment: Use a test account and copied save; record values before logout, after login, after restart, and after relevant dimension changes.
6. Keep game/loader/dependencies fixed and change one precondition at a time. Repeat enough to note whether the behavior is deterministic.
7. Compare the results against plausible environmental causes and any known-version limitation; do not infer source-level cause unless the path was inspected.
8. Validate any proposed workaround separately and write a regression check, limitations, confidence, and rollback steps.

## Validation checklist

- [ ] Mod ID/version and environment are verified from the actual installation.
- [ ] Expected and observed result are concrete and logged.
- [ ] A reproducible test and control case are recorded.
- [ ] Potential input, persistence, renderer, thread, or memory confounders are considered when relevant.
- [ ] Original save/player data is protected.
- [ ] Conclusions separate facts from hypotheses and include a confidence rating.

## Required output

A field-by-field persistence timeline with the first reset boundary and safe recovery constraints. Include environment, evidence references, exact reproduction, tested conditions, confidence, unresolved hypotheses, and a safe regression case.

## Boundaries and failure handling

Do not recommend deleting player data, hiding exceptions, or making broad mod changes as an initial response. If the evidence does not isolate the mod, describe what is missing and stop short of claiming a confirmed bug.

## Trigger examples

- **Positive:** A reproducible defect maps to one installed mod feature and needs focused investigation.
- **Negative:** The request is for general modpack setup without an observed behavior to diagnose.
