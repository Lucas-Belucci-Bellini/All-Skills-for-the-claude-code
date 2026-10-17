---
name: atm10-dimension-transition-crash
description: "Trace a crash that happens when entering or leaving a dimension to portal travel, dimension registration, entity transfer, or chunk initialization. Use evidence from the actual modified installation and reversible tests."
---

# ATM10 Dimension Transition Crash

## Purpose

Trace a crash that happens when entering or leaving a dimension to portal travel, dimension registration, entity transfer, or chunk initialization.

## Required inputs

Exact Minecraft/loader/Java and modpack versions; installed JAR inventory; latest.log and any crash report; relevant configs/datapacks; recent changes; symptom timing; and steps to reproduce. Redact secrets. Make a backup or use a copied instance/save before state-changing tests.

## Workflow

1. Record the environment and reproduce the issue once under controlled conditions; preserve full logs and the original state.
2. Define the failure boundary: trace a crash that happens when entering or leaving a dimension to portal travel, dimension registration, entity transfer, or chunk initialization.
3. Locate the earliest causal exception or measurable event and correlate it with the reported symptom. Verify each named mod/resource exists in this installation.
4. Form ranked hypotheses and define a specific signal that would distinguish them; document observations separately from guesses.
5. Perform this focused experiment in a copied instance/save or staging environment: Repeat the transition in a copied world with the same origin/destination and correlate client/server logs to the transition timestamp. Change one variable at a time.
6. Re-run the exact same action and compare the before/after evidence, including one adjacent healthy path where relevant.
7. If the evidence does not isolate the cause, revert the test and identify what additional capture or reduced reproduction is needed.
8. Record actions, exact artifacts/config keys, results, confidence, and rollback steps.

## Validation checklist

- [ ] Installed versions, artifact identities, and relevant file paths are confirmed.
- [ ] The earliest relevant event is supported by a log excerpt, measurement, or reproducible observation.
- [ ] A test plan with observable pass/fail criteria was recorded before the change.
- [ ] Original data is protected and every change can be reversed.
- [ ] Findings separate facts, hypotheses, and unknowns.
- [ ] The original symptom and a nearby normal scenario were retested.

## Required output

A transition timeline, affected dimension IDs, confirmed evidence, and a safe reproduction/rollback plan. Provide environment details, decisive evidence, ranked hypotheses, test result, confidence, limitations, and rollback instructions.

## Boundaries and failure handling

Do not delete a world or bulk-update/remove mods as an initial response. Do not claim an upstream or official ATM10 state unless verified against the actual profile. Missing or truncated evidence means the result remains provisional.

## Trigger examples

- **Positive:** A modified ATM10 installation shows the specific failure described in this skill and its logs or reproduction are available.
- **Negative:** The user asks for unrelated mod recommendations and has no diagnostic problem.
