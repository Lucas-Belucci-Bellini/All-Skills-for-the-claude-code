---
name: engine-frame-pacing-jitter
description: Measure frame-to-frame timing variance and isolate pacing jitter caused by scheduling, synchronization, uploads or presentation.
---

# Engine Frame Pacing Jitter

## Goal

Improve perceived smoothness by explaining irregular frame intervals rather than optimizing average FPS alone.

## Inputs to inspect

Frame timestamps, CPU/GPU timings, presentation mode, vsync settings, job queues, upload traces and target display rate.

## Workflow

1. Capture frame-start, simulation, submission, GPU completion and presentation timestamps with clock-domain assumptions documented.
2. Compute interval distributions, percentiles, consecutive outliers and cadence patterns for stable scenes and transition-heavy scenes.
3. Correlate spikes with waits, shader compilation, asset uploads, GC/allocator activity, job-queue stalls or presentation scheduling.
4. Toggle or modify one suspected source at a time and repeat capture under the same refresh rate, scene and power settings.
5. Define a jitter budget and store a compact trace or benchmark that reports both average throughput and frame-interval stability.

## Validation checklist

- [ ] Timestamps from different clock domains are aligned before correlation.
- [ ] The analysis distinguishes CPU work time, GPU execution and display/present interval.
- [ ] Warm-up and shader/cache effects are represented explicitly.
- [ ] Averages do not conceal repeated long frames or cadence oscillations.

## Required output

A frame-cadence report, correlated event trace, likely jitter sources, and reproducible verification steps.

## Boundaries and failure handling

Do not attribute every long presented frame to GPU shader cost; verify the critical path with captured timing evidence.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
