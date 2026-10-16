---
name: modpack-client-startup-phase-profiler
description: "Use when a large modded client has slow startup and the expensive loading phase is unclear; not for crashes after entering a world."
---

# Modpack Client Startup Phase Profiler

## Purpose

Make long startup times comparable and narrow the expensive phase or mod cluster.

## Required inputs

Minecraft/loader/modpack versions, JVM/launcher settings, startup logs, phase timings, and baseline conditions.

## Workflow

1. Capture startup with exact versions and time process launch, mod discovery/dependency resolution, resource reload, and title screen.
2. Normalize cache state, memory settings, background load, and launcher; repeat measurements to separate noise.
3. Correlate phase duration with mod logs and compare one controlled change at a time.
4. Report dominant phase and candidates, including where logs cannot prove a single mod is responsible.

## Verification checklist

- [ ] Pack/environment fingerprint accompanies measurements.
- [ ] Cold and warm launches are labeled separately.
- [ ] A mod is not blamed solely by adjacent log lines.
- [ ] Conclusions distinguish repeated evidence from preliminary hints.

## Required output

A startup phase timeline, repeatability notes, bottleneck candidates, and regression baseline.

## Boundaries and failure handling

Do not delete user worlds/config during profiling or increase heap blindly for a CPU/disk bottleneck.

When evidence, permissions, or environment details are missing, stop at the supported analysis, record the missing prerequisite, and do not report unexecuted validation as passing.

## Trigger examples

- **Positive:** A modded client takes minutes to reach title screen after a mod addition.
- **Negative:** Diagnosing a deterministic crash only after world entry.
