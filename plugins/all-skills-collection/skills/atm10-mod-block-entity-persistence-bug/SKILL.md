---
name: atm10-mod-block-entity-persistence-bug
description: "Find why a modded block or machine loses settings, inventory, progress, or custom state after chunk unload, world save, or server restart. Use an isolated reproduction and preserve evidence; do not label a mod as faulty without a discriminating test."
---

# ATM10 Mod Block-Entity Persistence Bug

## Purpose

Find why a modded block or machine loses settings, inventory, progress, or custom state after chunk unload, world save, or server restart.

## Required inputs

Actual mod ID/version from the modified ATM10 inventory, Minecraft/loader/Java versions, full relevant latest.log or crash report, expected/actual behavior, recent changes, and precise reproduction steps. Use a disposable instance or backup save for persistent-state tests.

## Workflow

1. Record the exact artifact identity and confirm that the behavior occurs with the installed version; do not infer ownership from display name alone.
2. Reduce the report to one input, action sequence, and observable result: find why a modded block or machine loses settings, inventory, progress, or custom state after chunk unload, world save, or server restart.
3. Preserve the earliest error or before/after state, including server-side evidence where client prediction or synchronization could mislead.
4. Establish a control case and write down the expected invariant or output before changing the setup.
5. Execute the targeted test: Use a backup copy and compare the same object immediately before save, after unload/reload, and after a full restart.
6. Change one precondition at a time and repeat the same action. Record negative results as well as successful reproduction.
7. Separate directly observed facts from hypotheses about mod code; inspect source/release notes/issues only when the exact project/version can be verified.
8. Verify any proposed workaround on a separate run and check that adjacent behavior remains correct; preserve rollback steps.

## Validation checklist

- [ ] Exact mod ID/version and environment are recorded.
- [ ] Expected and actual state/output are measurable.
- [ ] A control case and repeatable reproduction are available.
- [ ] The first relevant stack frame/state difference is captured.
- [ ] Competing explanations such as dependencies, automation, synchronization, or invalid inputs are tested where relevant.
- [ ] No production save is exposed to unverified repair steps.

## Required output

A persistence comparison with exact lost fields, save/load boundary, and a protected reproduction save. Include log excerpts/state snapshots, reproduction steps, tested versions, confidence, unresolved alternatives, and rollback instructions.

## Boundaries and failure handling

Do not declare the mod responsible merely because its class appears in the trace. If reproduction is inconsistent or the relevant evidence is unavailable, report the limitation and the next smallest experiment rather than inventing a fix.

## Trigger examples

- **Positive:** A reproducible defect appears to be inside one installed mod and needs isolated investigation.
- **Negative:** The request concerns only general modpack configuration with no individual-mod behavior to examine.
