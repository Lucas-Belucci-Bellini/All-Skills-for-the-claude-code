---
name: atm10-mod-configuration-value-ignored
description: "Determine why a mod ignores a configuration value because of scope, wrong key, parsing, default override, or a reload/restart requirement. Verify the installed release and reproduce the symptom in a safe test environment before recommending a fix."
---

# ATM10 Mod Configuration Value Ignored

## Purpose

Determine why a mod ignores a configuration value because of scope, wrong key, parsing, default override, or a reload/restart requirement.

## Required inputs

Verified mod project/ID and installed version, game/loader/Java versions, exact symptom, full relevant logs, affected config/data/release history, and reproduction steps. Use a disposable instance or copied save for migration and inventory tests.

## Workflow

1. Confirm the installed artifact and the specific mod feature under investigation; avoid using a similarly named project as evidence.
2. Define expected versus actual behavior and record the exact preconditions: determine why a mod ignores a configuration value because of scope, wrong key, parsing, default override, or a reload/restart requirement.
3. Preserve logs and relevant before-state; identify the first mismatch rather than focusing only on downstream symptoms.
4. Establish a control test and write down measurable pass/fail criteria.
5. Run the targeted experiment: Trace the setting from file to effective runtime behavior and compare it before/after a controlled restart or config reload.
6. Change one variable at a time, repeat the same operation, and record unsuccessful experiments.
7. If searching upstream reports, verify project identity, date/release context, affected versions, and whether the reported fix actually matches this reproduction. Do not claim an upstream match from keywords alone.
8. Test the smallest proposed mitigation and one adjacent regression case; document confidence, open questions and rollback.

## Validation checklist

- [ ] Exact installed artifact and version are verified.
- [ ] Behavior and preconditions are reproducible or the inconsistency is recorded.
- [ ] Relevant file/runtime state is captured before and after the test.
- [ ] Baseline and candidate tests use the same setup.
- [ ] Any upstream source claim is linked to the correct project and release range.
- [ ] Original saves/configs are protected and changes are reversible.

## Required output

A key-level diagnosis with declared/effective values, load scope, and a verified minimal correction. Include the evidence source, environment, reproduction, test results, uncertainty and safe rollback instructions.

## Boundaries and failure handling

Do not assert an upstream issue is fixed or applicable unless release/version evidence supports it. Do not overwrite the only save, hide warnings, or promote a statistical fluctuation into a confirmed defect.

## Trigger examples

- **Positive:** One installed mod exhibits a repeatable defect in the behavior scoped by this skill.
- **Negative:** No concrete defect has been observed, or the question is only a general feature request.
