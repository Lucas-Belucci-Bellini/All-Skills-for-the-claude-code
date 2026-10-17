---
name: atm10-entity-ai-behavior-interference
description: "Isolate incompatible AI goals, pathfinding injections, targeting rules, or tick hooks that make mobs stall or behave inconsistently. Isolate the cross-mod contract with a small controlled reproduction and evidence from effective runtime behavior."
---

# ATM10 Entity AI Behavior Interference

## Purpose

Isolate incompatible AI goals, pathfinding injections, targeting rules, or tick hooks that make mobs stall or behave inconsistently.

## Required inputs

Verified mod IDs/versions from the actual modified ATM10 profile, loader/build, relevant configuration or datapack files, full logs where useful, exact expected/actual behavior, recent changes, and a safe test world/server.

## Workflow

1. Document the involved mods and the concrete shared interface: isolate incompatible AI goals, pathfinding injections, targeting rules, or tick hooks that make mobs stall or behave inconsistently.
2. Confirm that each mod/version is actually installed and collect its declared compatibility constraints or configuration scope.
3. Capture the effective runtime state before the failing action; inspect logs, resource IDs, capability responses, packet names, state snapshots, or operation traces as applicable.
4. Construct a minimal reproduction and a control case where one participant is absent or the interaction is bypassed without changing unrelated settings.
5. Execute the focused experiment: Reproduce with one entity in a controlled area and compare goal/target/path evidence while selectively disabling one integration on a copy. Use a copy/staging profile and change one side of the interaction at a time.
6. Repeat the action enough to distinguish deterministic failures from ordinary randomness or timing variance; capture exact before/after evidence.
7. Validate any candidate fix against a normal adjacent use case and check for data loss, duplication, network incompatibility, or performance regressions.
8. Report supported findings, unknowns, tested combinations, safe workaround, rollback steps, and whether an upstream report is justified.

## Validation checklist

- [ ] Both participants and versions are confirmed from the actual profile.
- [ ] The failing contract/interface and expected behavior are explicit.
- [ ] Control and interaction cases share the same baseline.
- [ ] A focused test isolates the suspected interaction.
- [ ] Randomness, timing, and client/server scope are accounted for where relevant.
- [ ] No production save or shared server is used for risky experiments.
- [ ] Proposed mitigation is reversible and has a regression check.

## Required output

An AI behavior trace, tested component combinations, and an upstream-ready reproduction if warranted. Include repro steps, actual artifacts/logs, tested version combinations, confidence, known side effects, and rollback instructions.

## Boundaries and failure handling

Do not alter multiple mods at once or suppress exceptions as a substitute for isolation. If no instrumentation exists, identify the evidence limitation and make the next test narrower instead of declaring a culprit.

## Trigger examples

- **Positive:** Two or more installed mods interact through the interface or behavior described here and the combined setup fails.
- **Negative:** The issue reproduces in an isolated setup with no plausible second component involved.
