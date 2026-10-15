---
name: modpack-server-capacity-planning
description: "Estimates server resource requirements for a modded Minecraft workload. Use when planning hosted or self-hosted servers for a specified pack and player count."
---

# Modpack Server Capacity Planning

## Use when
RAM and CPU are chosen from a generic rule of thumb without measuring the specific modpack, exploration rate, or concurrent workload.

## Workflow
1. Record pack/version, mod count and heavy systems, server CPU characteristics, Java memory policy, expected players, view/simulation distance, and exploration behavior.
2. Separate heap memory from total process/container memory and distinguish CPU single-thread limits from parallel chunk work.
3. Run a representative load test with expected simultaneous players, chunk generation, automation, mobs, and backups.
4. Choose an initial allocation with headroom, record observed GC pauses/tick duration, then adjust one capacity variable at a time.

## Required output
An assumptions table, initial resource range, load-test plan, monitoring checklist, and scaling triggers.

## Validation
- Recommendations use measured or pack-specific evidence rather than mod count alone.
- MSPT/TPS, heap/GC, CPU saturation, disk latency, and network are monitored together.
- A backup/restore and update plan is included alongside capacity.

## Guardrails
Do not guarantee a fixed RAM number or player capacity without actual workload data and a clear hardware profile.
