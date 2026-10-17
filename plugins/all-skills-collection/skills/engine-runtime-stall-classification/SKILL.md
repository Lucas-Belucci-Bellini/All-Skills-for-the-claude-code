---
name: engine-runtime-stall-classification
description: Classify runtime stalls by CPU execution, lock wait, job dependency, I/O, GPU synchronization, allocator pressure, and presentation pacing.
---

# Engine Runtime Stall Classification

## Goal

Route investigations to the responsible subsystem instead of mislabeling every slow frame or frozen runtime as a performance regression.

## Inputs to inspect

Frame/tick traces, thread states, wait-for graphs, I/O timing, GPU markers, allocator metrics and presentation timestamps.

## Workflow

1. Define a stall taxonomy and the minimum evidence needed to distinguish execution cost from waiting or external scheduling.
2. Capture a reproducible stall window with correlated CPU/GPU clocks where possible, worker states, task dependencies and event IDs.
3. Identify the critical path and classify each interval as running, runnable-but-not-scheduled, blocked on resource, waiting for I/O/GPU or waiting for present.
4. Compare against a healthy capture under equivalent workload and separate root cause from downstream symptoms such as a growing queue.
5. Produce a diagnosis confidence level, missing evidence and a targeted next measurement or narrow regression test.

## Validation checklist

- [ ] CPU wall time is not treated as CPU execution time when the thread was blocked or descheduled.
- [ ] GPU duration comes from supported GPU timing rather than CPU submission duration.
- [ ] Several plausible causes are preserved when instrumentation cannot distinguish them.
- [ ] The classification identifies the critical path and earliest divergence when possible.

## Required output

A stall timeline, evidence-backed classification, confidence/unknowns and targeted reproduction or instrumentation recommendations.

## Boundaries and failure handling

Do not attribute a stall to the most visible subsystem without tracing what the blocked critical path was waiting on.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
