---
name: minecraft-server-tick-profiling
description: Diagnose modded Minecraft server lag by separating tick workload, entity activity, chunk generation, and I/O bottlenecks.
---

# Minecraft Server Tick Profiling

## Goal

Identify the source of low TPS or long ticks in a heavily modded server with evidence rather than disabling mods at random.

## Inputs to inspect

Minecraft and loader versions, mod list, JVM flags, server logs, profiler reports, world age, player count, and reproduction steps.

## Workflow

1. Record the exact server build, modpack version, Java runtime, memory limits, player count, world state, and when the lag begins. Keep a baseline snapshot before changing settings.
2. Distinguish average TPS from individual long ticks and client FPS. Gather a compatible server profiler trace during both normal activity and the reported lag window.
3. Attribute cost to entities, block entities, automation networks, chunk generation/loading, scheduled tasks, garbage collection, storage, and networking where supported by the trace.
4. Reproduce the workload in a copy of the world or staging server. Change one variable at a time and keep configuration/mod-list diffs for each run.
5. Validate the suspected fix across idle, exploration, automation-heavy, and multi-player cases. Keep a rollback plan and a note of any gameplay behavior changed.

## Validation checklist

- [ ] The report identifies tick-time distribution and profiler evidence rather than relying on heap size alone.
- [ ] Client-side rendering load is not misdiagnosed as server TPS loss.
- [ ] The baseline and test environment use the same server build and comparable world activity.
- [ ] No mod is blamed solely because it appears in a stack sample; call frequency and context are considered.
- [ ] World backups exist before changes that affect automation, generation, or persistent data.

## Required output

Deliver a ranked bottleneck report, trace references, reproducible scenario, single-variable experiments, recommended settings or mod fixes, and rollback steps.

## Boundaries and failure handling

Do not delete mods or world data as a diagnostic shortcut; do not publish credentials, private player data, or unredacted tokens from logs.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
