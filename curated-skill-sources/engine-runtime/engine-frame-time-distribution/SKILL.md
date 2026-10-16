---
name: engine-frame-time-distribution
description: Analyze frame-time distributions and stutter frequency using percentiles, moving windows, consecutive outliers, and scenario tagging.
---

# Engine Frame-Time Distribution

## Goal

Evaluate smoothness beyond average FPS by measuring the frequency, severity and context of long frames.

## Inputs to inspect

Frame timestamps, render/simulation phase timings, workload scenario labels, refresh rate and capture metadata.

## Workflow

1. Capture frame intervals over stable and transition-heavy workloads and document dropped frames, sampling overhead and clock source.
2. Compute median, p90/p95/p99, maximum and counts of frames above named thresholds; include moving windows to expose bursts.
3. Tag outliers with scenario and phase metadata, correlating with streaming, shader compilation, allocation spikes, waits and presentation timing.
4. Compare two builds under equivalent conditions and report both distribution deltas and whether the tail events are repeatable.
5. Add scenario-specific budgets where noise is understood and retain traces for severe outliers rather than failing on a single unrepeatable sample.

## Validation checklist

- [ ] FPS summaries are derived consistently from the frame-interval data and not substituted for the distribution.
- [ ] Outlier thresholds are tied to target refresh/frame budgets and labeled with units.
- [ ] CPU/GPU overlap and presentation cadence are not double-counted.
- [ ] Warmup and scene transitions are either measured explicitly or excluded with a documented reason.

## Required output

A frame-time distribution report, tagged outlier list, build comparison and repeatable stutter regression workflow.

## Boundaries and failure handling

Do not claim the runtime is smooth from a good average if p99 or recurring long-frame counts regress.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
