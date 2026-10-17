---
name: atm10-wrong-loader-artifact-detection
description: "Recognize Fabric/Forge/NeoForge or Minecraft-version artifacts installed in the wrong ATM10 environment. Use reproducible evidence and reversible tests; do not assume the official ATM10 matches a modified instance."
---

# ATM10 Wrong Loader Artifact Detection

## Purpose

Recognize Fabric/Forge/NeoForge or Minecraft-version artifacts installed in the wrong ATM10 environment.

## Required inputs

Exact Minecraft and loader versions, Java runtime, ATM10 build/profile, actual installed mod JAR inventory, latest.log and any crash report, recent changes, symptom timing, and reproduction steps. Capture a backup or disposable environment when world/config mutations could occur. Redact secrets and irrelevant personal paths.

## Workflow

1. Record the environment and classify the failure phase; preserve the original logs and current instance state before testing.
2. Establish a baseline for the subsystem in scope: recognize Fabric/Forge/NeoForge or Minecraft-version artifacts installed in the wrong ATM10 environment.
3. Extract the earliest relevant error or measurement, correlate timestamps with user-visible symptoms, and verify every suspected mod/version against the actual installed inventory.
4. Separate observed facts, plausible hypotheses, and unknowns. Define a pass/fail signal before changing anything.
5. Run the following focused test in a copied instance, test world, or staging server: Compare each suspect JAR's embedded metadata and supported loader/version with the exact installed loader build. Change one meaningful variable at a time and preserve a rollback point.
6. Repeat the same reproduction path after the change and compare the decisive signal, not merely whether the symptom appears different.
7. If the result is ambiguous or negative, restore the baseline and state what additional evidence is needed; do not promote a hypothesis to a confirmed root cause.
8. Record all commands/config diffs, environment versions, before/after results, and the minimum justified next action.

## Validation checklist

- [ ] Exact environment and installed artifacts are recorded rather than inferred from the official pack.
- [ ] Earliest causal log evidence or measured symptom is cited with timestamp/context.
- [ ] The test has a defined observable pass/fail criterion and isolates one variable.
- [ ] Original world/config/instance is protected by backup or a disposable copy.
- [ ] Result distinguishes confirmed cause, likely cause, and unverified hypothesis.
- [ ] Regression checks cover the original failure path and one adjacent normal path.
- [ ] Any fix is minimal, reversible, and documented with rollback steps.

## Required output

A compatibility finding tied to artifact metadata, the correct supported artifact family, and a test result. Include environment, evidence references, confidence, test outcome, known limitations, and rollback instructions.

## Boundaries and failure handling

Do not delete worlds or bulk-remove/update mods as a first response. Do not invent mod versions, official-pack contents, or compatibility promises. If the required logs, files, or environment details are unavailable, mark the diagnosis incomplete and request the smallest missing evidence set.

## Trigger examples

- **Positive:** A modified ATM10 instance exhibits the specific failure described here and the user can provide logs or reproduce it.
- **Negative:** The user asks for unrelated gameplay advice or no symptom exists to diagnose.
