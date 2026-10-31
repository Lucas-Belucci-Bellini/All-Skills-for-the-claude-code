---
name: nexora-profiler-overhead-calibration
description: "Measures and bounds the observer effect of NEXORA profiling, tracing, counters, and debug instrumentation before using their data for optimization decisions."
---

# NEXORA Profiler Overhead Calibration

## Purpose

Use this workflow before relying on profiler or trace data to make NEXORA performance decisions, especially when instrumentation adds per-frame events, allocations, locks, timestamps, GPU readbacks, or file I/O. It measures how much the measurement system changes the workload and records the fidelity limits of the resulting evidence.

This workflow owns calibration of measurement overhead and trace integrity. Use `nexora-gameplay-tick-profiler` for gameplay-tick attribution, `nexora-frame-pacing-budget` for frame-stage diagnosis, and `nexora-performance-benchmark-contract` for benchmark workload design. Do not duplicate those workflows or assume a particular profiler backend exists.

## Required inputs

- Pinned NEXORA commit, toolchain, build profile, target OS, hardware, graphics backend and driver.
- Exact workload fixture, seed, scene/world state, camera/player path, asset set, duration and warm-up policy.
- Instrumentation modes available in the active checkout: disabled, sampling, scoped events, counters, full trace, GPU queries, allocation tracking, or other modes.
- Profiler configuration: sample frequency, enabled event classes, stack depth, buffer capacity, flush interval, symbolization, compression and output destination.
- Expected capture window and the maximum acceptable measurement overhead approved for the experiment.
- Existing raw trace format, event-loss counters, timestamp source, clock domain and trace-export path.

## Calibration protocol

1. **Pin the measurement implementation.** Inspect the actual profiler hooks, event macros, sampling timer, clock source, per-thread buffers, allocation behavior, synchronization, export and shutdown paths. Record what is present and what is absent; do not infer backend behavior from a UI label.
2. **Define a repeatable workload.** Use the same fixture and scenario for every run. Record all inputs that affect work volume, including world seed, active chunk count, entity count, draw workload, streaming state and window configuration where applicable.
3. **Build matched variants.** Compare the same optimized build with instrumentation disabled and enabled. If instrumentation changes compile flags or code generation, record that as a separate factor rather than attributing the whole delta to runtime event collection.
4. **Establish a no-capture baseline.** Run the workload with profiler hooks disabled or at the lowest available no-op mode. Capture frame wall, CPU work, presentation wait, memory, allocations and workload throughput using an independent low-overhead measurement path where possible.
5. **Measure instrumentation tiers.** Enable one instrumentation family at a time: sampling, scoped events, counters, allocation tracking, stack capture, full trace, GPU timing and export. Then test the intended combined configuration. This isolates expensive event classes.
6. **Vary sampling and event density.** Test a small, documented set of sample frequencies and event rates. Record event count per second, active threads, stack depth, and bytes written. Do not assume that a higher sampling rate improves useful accuracy linearly.
7. **Separate capture from export.** Measure steady-state capture with output disabled or buffered, then measure flush, symbolization, compression and disk/network export independently. Synchronous export must not be mistaken for workload cost.
8. **Inspect memory and allocation overhead.** Record per-thread buffer capacity, high-water mark, overflow behavior, allocations per frame or tick, retained trace bytes and peak RSS. Verify whether buffers are bounded and whether overflow drops, blocks, reallocates or overwrites events.
9. **Detect event loss and clock problems.** Check dropped-event counters, sequence gaps, buffer-overrun markers, timestamp monotonicity, cross-thread ordering and clock-domain conversion. If the format cannot reveal event loss, mark trace completeness as unknown.
10. **Compare workload impact.** Report baseline versus each instrumentation tier using p50/p95/p99/max frame time, CPU work, throughput, memory and allocation deltas. Repeat runs and disclose run-order, thermal and background-load effects.
11. **Set a capture budget.** Select the least expensive instrumentation configuration that answers the diagnostic question. Record its measured overhead and accepted uncertainty; do not set a universal percentage without target-hardware evidence and owner approval.
12. **Validate diagnostic fidelity.** Confirm that the profiler still captures the events needed to locate the target bottleneck at the chosen rate. A low-overhead trace that misses short-lived work is not a valid substitute for a more complete capture.
13. **Preserve the calibration artifact.** Store the exact config, build IDs, workload identity, raw samples, event-loss counters, trace sizes, comparison report and reproduction command. Recalibrate after profiler, allocator, threading, clock, or trace-format changes.

## Required report

Include:

| Capture mode | Event/sample rate | p95 CPU/frame delta | p95 wall-frame delta | Peak memory delta | Dropped events | Trace bytes |
|---|---:|---:|---:|---:|---:|---:|
| Instrumentation off | | | | | N/A | N/A |
| Sampling | | | | | | |
| Scoped events | | | | | | |
| Full trace | | | | | | |
| Combined selected mode | | | | | | |

Also report the target hardware/build, workload identity, repetitions, warm-up, export method, clock source, and whether the trace is complete enough for the intended diagnosis. Mark unavailable measurements as `UNAVAILABLE`; do not substitute estimates.

## Validation checklist

- [ ] Profiler implementation and active instrumentation hooks were inspected.
- [ ] Baseline and capture variants use equivalent builds and workloads.
- [ ] Instrumentation tiers were measured separately before combined capture.
- [ ] Capture overhead is separated from export and symbolization cost.
- [ ] Buffer capacity, overflow policy, memory and allocation behavior are known.
- [ ] Event loss, timestamp monotonicity and clock-domain assumptions are checked.
- [ ] Repeated runs report distributions and disclose environmental variance.
- [ ] The chosen configuration answers the diagnostic question at measured cost.
- [ ] Calibration artifacts and exact reproduction commands are retained.

## Boundaries and failure handling

- Do not claim a profiler is zero-cost because its hooks are asynchronous or lock-free.
- Do not treat profiler output as ground truth when event loss or timestamp validity is unknown.
- Do not compare a profiled debug build with an unprofiled optimized build and call the delta instrumentation overhead.
- Do not use profiler-generated frame timing as an independent baseline for its own overhead.
- If the profiler cannot be disabled, use the lowest-overhead mode as a relative baseline and disclose the residual instrumentation.
- If capture overhead changes the bottleneck, state that the observed profile may describe the instrumented workload rather than the uninstrumented engine.
- If buffer overflow blocks producers or loses events, treat the trace as compromised and repeat with a safer capture configuration.

## Required output

Return the pinned source/build, workload, profiler configuration, calibration matrix, baseline and capture distributions, event-loss/clock-integrity findings, selected capture budget, raw artifact locations, reproduction command and unresolved fidelity risks.

## Trigger examples

- **Positive:** A performance investigation depends on profiler, trace, allocation, or GPU timing data and the observer effect is unknown.
- **Positive:** Full tracing causes frame spikes, memory growth, or dropped events and the team needs to identify which capture feature is responsible.
- **Negative:** The task is only to locate a gameplay tick bottleneck; use the gameplay tick profiler workflow.
- **Negative:** The task is only to compare two release commits; use the frame-time regression triage workflow.
