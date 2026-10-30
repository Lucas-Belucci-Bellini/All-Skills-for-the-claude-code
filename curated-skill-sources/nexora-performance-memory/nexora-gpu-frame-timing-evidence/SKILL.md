---
name: nexora-gpu-frame-timing-evidence
description: "Plans and validates non-blocking GPU execution timing for NEXORA, from optional RHI timestamp capability through frame-correlated query resolution and honest benchmark reporting."
---

# NEXORA GPU Frame Timing Evidence

## Purpose

Use this workflow when NEXORA needs to measure GPU execution time separately from CPU submission time, frame wall time, and presentation wait. It addresses the documented gap in DEBT-0041: the current RHI does not expose timestamp queries, so the frame report cannot yet attribute GPU-side execution.

This is a NEXORA-specific integration workflow, not a generic query-pool implementation guide. Reuse `engine-renderer-gpu-timestamp-query-pooling` for pool sizing and reuse, `nexora-frame-pacing-budget` for CPU work versus presentation wait, and `nexora-performance-benchmark-contract` for repeatable workload design.

## Verified NEXORA snapshot

Re-check the active checkout before applying these observations. They describe the inspected NEXORA snapshot `eed3dbcb68c7540decf08b3d55f2fae7feae8833`:

- `engine/rhi/src/api.rs` defines the backend-neutral RHI operations, command submission, fences and presentation; it has no timestamp-query creation, write, resolve, or readback contract.
- `engine/rhi/src/desc.rs` exposes device capabilities but no timestamp-query capability or timestamp-period metadata.
- `engine/rhi-wgpu/Cargo.toml` pins `wgpu = 30.0.1` with Vulkan, Direct3D 12, Metal, WGSL and std features.
- `engine/rhi-wgpu/src/lib.rs` builds render passes with `timestamp_writes: None` and `occlusion_query_set: None` in the inspected path.
- `engine/benchmark/src/gpu.rs` measures adapter/device open, fences, texture/buffer uploads, and off-screen draw work. Its correctness proof runs before timing, but it does not report GPU timestamp duration.
- `engine/benchmark/src/suites.rs` owns benchmark suites and their deterministic workloads.
- `docs/plans/NEXORA TECHNICAL DEBT REGISTER.md`, DEBT-0041, explicitly records that the GPU side of the frame is unmeasured because the RHI has no timestamp queries.
- The local validation report distinguishes frame work from presentation wait. Those values are not GPU execution time and must not be relabeled as such.

These facts describe a gap, not an implemented feature. Do not claim timestamp queries, GPU frame timing, or a GPU-side frame budget exists until the active source and evidence prove it.

## Required inputs

- Pinned NEXORA commit, Rust toolchain, wgpu version, target OS, backend and adapter.
- Current RHI trait, capability descriptor, native backend, command submission/fence lifecycle and benchmark reporting schema.
- DEBT-0041, frame-pacing report, local validation JSON/Markdown, and current benchmark workload definitions.
- Backend feature/capability documentation and adapter-specific timestamp support/period information.
- Acceptance criteria for measurement overhead, latency, dropped samples and unsupported-device behavior.

## Workflow

1. **Pin and map the measurement boundary.** Trace frame begin → CPU update/encoding → queue submission → GPU execution → completion/readback → surface presentation. Identify which clock and subsystem owns each interval. Never subtract unrelated measurements to infer GPU time.
2. **Define an optional backend-neutral capability.** Add timestamp-query support as an explicit capability with a documented unsupported path. Do not make timestamp queries a mandatory requirement for every RHI backend or for NullRhi.
3. **Specify timestamp units and validity.** Document the backend timestamp period, valid-bit width or equivalent precision limits, wraparound handling, conversion to a stable duration unit, and behavior when metadata is unavailable. Never assume all adapters use identical timestamp resolution.
4. **Keep command semantics explicit.** Decide how timestamp writes are represented in the RHI command/pass contract and how begin/end pairs map to the actual GPU command encoder. Validate ordering and reject malformed, nested, duplicated, or unmatched markers according to the chosen contract.
5. **Separate GPU execution from queue and presentation waits.** A timestamp interval measures only the GPU work bracketed by its markers. CPU encode time, queue submission overhead, fence wait, surface acquisition, FIFO/present wait, and monitor refresh remain separate report fields.
6. **Resolve asynchronously.** Use a bounded readback/query ring associated with submitted work and fences. Do not synchronously map or wait for query results in the render loop. Define how many frames may remain unresolved, what happens when the ring is full, and how old samples are discarded or reported.
7. **Correlate samples to frame identity.** Attach a monotonic frame sequence and workload/pass labels to every query pair. Do not associate a late result with the frame currently being rendered. Handle skipped, retried, minimized, and failed frames without shifting sample ownership.
8. **Bound overhead and storage.** Reuse the generic timestamp-query pooling workflow, but derive NEXORA pool capacity from the active number of measured passes, frames in flight, and backend limits. Avoid unbounded allocation, per-frame heap churn, or query reuse before completion.
9. **Handle unsupported and disjoint results honestly.** If an adapter lacks timestamp support, precision metadata, or valid results, report `UNSUPPORTED`, `UNAVAILABLE`, or `INVALID` with a reason. Do not substitute CPU frame time and label it GPU time.
10. **Keep NullRhi deterministic.** The null backend should expose the capability as unsupported (or an equally explicit no-hardware result) and must not fabricate timestamp values. Conformance tests should verify the unsupported behavior and resource-lifecycle rules.
11. **Integrate with the benchmark harness.** Add GPU timing as a separately named measurement family, preserving existing correctness-before-timing checks and adapter identity. Compare identical workload, resolution, pass set, warmup, sample count and power/thermal conditions.
12. **Avoid misleading aggregation.** Report per-pass and whole-submission GPU intervals separately. Do not sum overlapping intervals or infer total GPU occupancy from nested markers. State whether intervals include dependencies or only the commands between markers.
13. **Validate calibration and drift.** Check timestamp period conversion against backend documentation and repeat measurements across stable workloads. Record adapter/backend/driver, timestamp precision, sample count and measurement overhead.
14. **Test lifecycle and failure paths.** Cover query exhaustion, delayed completion, device loss, device recreation, resource retirement, resize/minimize, no surface, invalid marker sequences, wraparound and shutdown with unresolved samples.
15. **Use evidence tiers.** Separate compile/unit tests, NullRhi tests, software/virtual CI adapters, physical GPU runs, and manual observations. A lavapipe result is not physical GPU evidence; one vendor's result is not universal compatibility.
16. **Update DEBT-0041 only with proof.** Keep the debt open while the RHI lacks a capability or the target hardware has not produced valid measurements. Close only when the capability contract, native implementation, CI coverage, physical-device evidence and report semantics meet acceptance criteria.
17. **Publish an auditable report.** Include commit, adapter/backend/driver, timestamp period and precision, measured pass labels, frame IDs, CPU work, presentation wait, GPU intervals, unresolved/dropped sample counts, overhead, test commands and unsupported cases.

## Validation checklist

- [ ] Timestamp support is optional and represented in backend capabilities.
- [ ] Timestamp units, precision, wraparound and invalid-result behavior are explicit.
- [ ] GPU time is distinct from CPU work, queue/fence wait and presentation wait.
- [ ] Query allocation and readback are bounded and non-blocking in the frame loop.
- [ ] Samples remain correlated with the frame that produced them.
- [ ] Query reuse waits for completion and survives device-loss lifecycle correctly.
- [ ] NullRhi reports unsupported rather than fabricating measurements.
- [ ] Benchmarks retain correctness checks and identify adapter/backend/driver.
- [ ] Software CI and physical GPU evidence are reported separately.
- [ ] DEBT-0041 status reflects actual evidence, not a proposed design.

## Boundaries and failure handling

- Do not duplicate generic query pooling; use `engine-renderer-gpu-timestamp-query-pooling`.
- Do not replace CPU frame-work or presentation-wait measurements from `nexora-frame-pacing-budget`.
- Do not change frame budgets or thresholds without repeatable measurements on representative workloads.
- Do not block the render thread to obtain query results.
- Do not invent GPU timings when a backend or adapter lacks timestamp support.
- Do not treat a successful query API call as proof that timestamps are correctly correlated or meaningful.
- Do not claim DEBT-0041 is resolved until native and target-hardware evidence exists.

## Trigger examples

- **Positive:** Add optional GPU timestamp measurement to the NEXORA RHI without breaking NullRhi.
- **Positive:** Investigate why GPU timing results arrive late, wrap, or attach to the wrong frame.
- **Positive:** Separate GPU execution from CPU work and FIFO/presentation wait in benchmark reports.
- **Positive:** Decide whether DEBT-0041 can be closed based on adapter-specific evidence.
- **Negative:** The task is only query-pool allocation and reuse mechanics; use the generic GPU timestamp-query pooling skill.
- **Negative:** The task is only CPU frame pacing or presentation-wait attribution; use `nexora-frame-pacing-budget`.
