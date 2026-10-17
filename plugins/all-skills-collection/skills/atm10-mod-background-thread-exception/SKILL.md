---
name: atm10-mod-background-thread-exception
description: "Investigate an asynchronous exception raised by one mod, distinguishing the initiating failure from later main-thread symptoms. Require a repeatable reproduction and evidence from the actual modpack before assigning responsibility."
---

# ATM10 Mod Background Thread Exception Triage

## Purpose

Investigate an asynchronous exception raised by one mod, distinguishing the initiating failure from later main-thread symptoms.

## Required inputs

Verified installed mod ID/version, Minecraft/loader/Java version, sanitized logs or relevant state captures, expected/actual behavior, recent changes, and precise steps. Use a test account or copied world when progress, inventory, or persistent data can change.

## Workflow

1. Verify the candidate mod identity and confirm that the feature exists in the installed version.
2. Record the smallest repeatable action and its expected result: investigate an asynchronous exception raised by one mod, distinguishing the initiating failure from later main-thread symptoms.
3. Capture the initial state, the first observed divergence, and the relevant log/metric evidence.
4. Create a control case and define a pass/fail criterion before changing settings or artifacts.
5. Execute this focused experiment: Preserve the complete exception chain/thread names, align timestamps, and reproduce without swallowing exceptions.
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

A thread-aware event sequence, first causal exception candidate, and evidence for a minimal bug report. Include environment, evidence references, exact reproduction, tested conditions, confidence, unresolved hypotheses, and a safe regression case.

## Boundaries and failure handling

Do not recommend deleting player data, hiding exceptions, or making broad mod changes as an initial response. If the evidence does not isolate the mod, describe what is missing and stop short of claiming a confirmed bug.

## Trigger examples

- **Positive:** A reproducible defect maps to one installed mod feature and needs focused investigation.
- **Negative:** The request is for general modpack setup without an observed behavior to diagnose.
