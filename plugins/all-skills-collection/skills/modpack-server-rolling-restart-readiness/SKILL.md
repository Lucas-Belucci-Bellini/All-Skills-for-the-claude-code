---
name: modpack-server-rolling-restart-readiness
description: "Use when restarting/updating a modded Minecraft server while preserving world safety and avoiding traffic before readiness; not for backup drills."
---

# Modpack Server Rolling Restart Readiness

## Purpose

Make modded server restarts observable, bounded, and safe for player/world persistence.

## Required inputs

Loader/server version, stop method, player notices, save/flush behavior, readiness probes, supervisor, rollback plan.

## Workflow

1. Document stop sequence, warning window, flush signal, process deadline, and supervisor behavior.
2. Test graceful stop, timeout escalation, crash during stop, missing dependency at startup, and restart loops on a copied world.
3. Define readiness using loader completion and world availability, not merely an open TCP port.
4. Verify deployment sequencing prevents two world writers and only reopens player traffic after readiness passes.

## Verification checklist

- [ ] Player notification and graceful stop are explicit.
- [ ] Two processes cannot write the same world simultaneously.
- [ ] Readiness includes mod loading/world initialization.
- [ ] Failed start paths preserve logs and avoid infinite restart loops.

## Required output

A restart state machine, pre/post checklist, fault-test results, and operator runbook.

## Boundaries and failure handling

Use staging/copied worlds; do not experiment on a live server without approved maintenance and backup.

When evidence, permissions, or environment details are missing, stop at the supported analysis, record the missing prerequisite, and do not report unexecuted validation as passing.

## Trigger examples

- **Positive:** A large modded server needs a safe maintenance restart.
- **Negative:** Sizing player capacity from tick-time metrics.
