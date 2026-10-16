---
name: deployment-canary-health-window
description: "Use when evaluating a staged or canary deployment over an observation window to decide promotion, pause, or rollback; not for generic release notes."
---

# Deployment Canary Health Window

## Purpose

Make rollout decisions from explicit health signals instead of a single green check.

## Required inputs

Release revision, traffic stages, baseline metrics, SLOs, observation window, alert thresholds, rollback authority.

## Workflow

1. Record revision, baseline, traffic split, observation window, and required health signals.
2. Compare error rate, latency percentiles, saturation, critical outcomes, and dependency health against baseline and absolute limits.
3. Check minimum traffic, telemetry freshness, missing signals, and unrelated incidents that may invalidate the sample.
4. Apply predeclared promote/pause/rollback criteria and link the decision to the evidence.

## Verification checklist

- [ ] Each stage has explicit decision thresholds.
- [ ] Metric freshness and minimum sample size are stated.
- [ ] Missing telemetry is not treated as healthy.
- [ ] Decision links to revision, time window, and observed metrics.

## Required output

A canary decision record with threshold comparisons, anomalies, and recommended next action.

## Boundaries and failure handling

Do not trigger production rollout/rollback unless authorized; do not silently change thresholds after seeing results.

When evidence, permissions, or environment details are missing, stop at the supported analysis, record the missing prerequisite, and do not report unexecuted validation as passing.

## Trigger examples

- **Positive:** A 10% rollout needs evidence before increasing to 50%.
- **Negative:** A generic post-release summary after full rollout.
