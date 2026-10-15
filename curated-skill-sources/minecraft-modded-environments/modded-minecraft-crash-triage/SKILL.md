---
name: modded-minecraft-crash-triage
description: "Classifies crashes in heavily modded Minecraft using logs and crash reports. Use when startup, world loading, server joining, or in-world actions crash."
---

# Modded Minecraft Crash Triage

## Use when
Large crash logs contain many warnings and the first visible mod name is being blamed without causal evidence.

## Workflow
1. Collect the complete crash report, latest.log, loader diagnostics, Java version/flags, and exact reproduction phase.
2. Locate the fatal exception and trace nested causes, mixin/application frames, missing dependencies, and the earliest relevant failure.
3. Separate root cause, secondary errors, environmental constraints, and harmless warnings; assign confidence to each hypothesis.
4. Suggest the smallest reversible diagnostic experiment, keeping backups and preserving the current mod list.

## Required output
A concise crash diagnosis with key evidence, ranked hypotheses, missing data, and safe next experiment.

## Validation
- The conclusion cites the actual exception chain and relevant stack frames.
- A mod is not blamed solely because its class appears near the crash.
- The hypothesis has a falsifiable reproduction or isolation test.

## Guardrails
Never instruct users to remove random files or overwrite worlds; preserve backups and test copies.
