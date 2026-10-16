---
name: multiplayer-client-prediction-divergence-triage
description: "Use when a predicted local state diverges from server-authoritative state and causes repeated corrections; not for interpolation tuning."
---

# Multiplayer Client Prediction Divergence Triage

## Purpose

Classify prediction divergence into input, simulation, timing, snapshot, or reconciliation causes.

## Required inputs

Client/server inputs, authoritative snapshots, prediction history, tick timing, deterministic settings, reproducible scenario.

## Workflow

1. Capture a scenario with tick numbers, input IDs, predicted/authoritative state, and reconciliation events.
2. Locate the earliest divergent frame and compare inputs/parameters before later visual corrections.
3. Classify missing/reordered input, timestep mismatch, nondeterminism, stale snapshot, or rollback-window defect.
4. Add a deterministic regression scenario and verify the fix without widening correction thresholds to hide errors.

## Verification checklist

- [ ] Diagnosis begins at first divergence.
- [ ] Inputs, server tick and client tick are traceable together.
- [ ] Threshold tuning does not hide wrong authoritative state.
- [ ] Regression covers latency and correction paths with controlled timing.

## Required output

A divergence timeline, root-cause class, minimal reproduction, and before/after correction metrics.

## Boundaries and failure handling

Use test clients; do not infer cheating from divergence alone.

When evidence, permissions, or environment details are missing, stop at the supported analysis, record the missing prerequisite, and do not report unexecuted validation as passing.

## Trigger examples

- **Positive:** A player snaps backward despite modest latency and packet loss.
- **Negative:** Choosing smoothing curves for already-correct snapshots.
