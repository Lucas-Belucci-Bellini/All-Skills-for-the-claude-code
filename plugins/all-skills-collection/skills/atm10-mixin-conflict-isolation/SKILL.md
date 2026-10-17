---
name: atm10-mixin-conflict-isolation
description: "Isolate suspected mixin conflicts in a modified ATM10 instance by tracing target classes, applied mixins, versions, and minimal reproduction evidence."
---

# ATM10 Mixin Conflict Isolation

## Purpose

Determine whether a mixin failure is a genuine incompatibility, a secondary symptom, or an unrelated class-loading error.

## Required inputs

Complete crash report, latest.log/debug.log if available, exact mod JAR inventory, loader build, mixin configuration names, recent mod/config changes, and reproduction steps.

## Workflow

1. Locate the earliest mixin-related error and capture target class, mixin class, injection point, expected/actual match count, and the surrounding causal exception.
2. Verify that each named mod and mixin configuration exists in the actual instance and record exact versions.
3. Check whether the target class or method changed across the installed Minecraft/loader version; distinguish a missing target from an injection collision or earlier dependency failure.
4. Inspect preceding log lines for class transformation failures that could make later mixin errors secondary.
5. Create a copied test instance and disable or alter only one suspected component/configuration at a time, preserving the original manifest and settings.
6. Re-run the same startup/world-join sequence and compare the first failing frame, not just whether the final crash text changed.
7. Prepare a minimal reproduction with redacted logs, environment versions, involved mod IDs, exact steps, and a clear statement of what the experiment proves.

## Validation checklist

- [ ] The first causal mixin error is distinguished from downstream errors.
- [ ] Target class, injection point, and installed versions are recorded.
- [ ] Every test is performed in a copy or otherwise safely reversible environment.
- [ ] Only one meaningful variable changes per comparison.
- [ ] The result is reproducible and does not rely on suppressing the error.
- [ ] Any upstream bug report avoids secrets and includes a minimal evidence package.

## Required output

Return the mixin failure signature, causal timeline, tested combinations, before/after evidence, confidence level, and the smallest safe fix or upstream report draft.

## Boundaries and failure handling

Do not recommend mass-disabling mixin or performance mods. If the log lacks the injection details, request the full log and stop short of naming a culprit.

## Trigger examples

- **Positive:** A modified ATM10 build crashes with an injection failure after a mod update.
- **Negative:** A rendering issue occurs with no transformation, mixin, or startup evidence and the user only wants graphics settings.
