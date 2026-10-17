---
name: atm10-save-write-lag-diagnosis
description: "Diagnose pauses or delays during world saving and distinguish serialization cost, region writes, storage latency, and backup interference. Use the real modified profile and measurable evidence instead of assumptions."
---

# ATM10 Save Write Lag Diagnosis

## Purpose

Diagnose pauses or delays during world saving and distinguish serialization cost, region writes, storage latency, and backup interference.

## Required inputs

Exact Minecraft, loader, Java and modpack versions; actual mod inventory; relevant latest.log/crash report; changed configs; symptom timestamps; and a reproducible workload. Protect the original save/profile before any controlled change.

## Workflow

1. Record current environment, symptom timing, and the smallest reliable reproduction. Preserve original logs and files.
2. Define the target subsystem and measurement: diagnose pauses or delays during world saving and distinguish serialization cost, region writes, storage latency, and backup interference.
3. Collect measurements before, during, and after the symptom; align clocks/timestamps and verify the workload is comparable between runs.
4. Identify candidate causes from direct measurements and logs. Mark missing signals and avoid inferring causality from correlation alone.
5. Run a focused, reversible comparison: Time controlled save operations in a copied world and compare logs, process I/O, and region-file activity before and after the pause. Use a copied world or staging profile and change one factor at a time.
6. Repeat the measurement for a baseline and candidate condition; compare distribution/variance as well as averages when relevant.
7. Roll back changes that do not pass the predefined criterion; request more evidence if test conditions were not comparable.
8. Produce a decision record linking each conclusion to data, test condition, and confidence level.

## Validation checklist

- [ ] Version, workload, and test conditions are documented.
- [ ] Measurements bracket the reported symptom and use consistent timestamps.
- [ ] The comparison includes a baseline and one-variable experiment.
- [ ] Original worlds/configs remain protected and rollback is clear.
- [ ] Correlation is not presented as confirmed causation without a discriminating test.
- [ ] Follow-up checks verify gameplay stability after any mitigation.

## Required output

A save-duration baseline, I/O evidence, and safe test of the narrowest suspected bottleneck. Include raw measurement references, method, uncertainty, test result, constraints, and rollback plan.

## Boundaries and failure handling

Do not recommend destructive entity/chunk cleanup or random JVM flags without evidence. If instrumentation is unavailable, label the suspected bottleneck unconfirmed and choose the next safest observable test.

## Trigger examples

- **Positive:** A modified ATM10 workload exhibits the performance or persistence symptom scoped by this skill.
- **Negative:** No reproducible symptom or measurement problem has been reported.
