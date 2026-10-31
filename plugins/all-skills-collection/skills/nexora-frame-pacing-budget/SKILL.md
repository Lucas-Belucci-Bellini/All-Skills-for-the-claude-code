---
name: nexora-frame-pacing-budget
description: "Diagnoses frame-time spikes by separating CPU submission, simulation, GPU execution, and synchronization waits."
---

# nexora frame pacing budget

## Purpose

Use this workflow for NEXORA-scale engine work when frame pacing and frame-time regressions. Inspect the actual code and document unknowns; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, target platforms, resource budgets, and compatibility requirements.
- Existing tests, logs, representative fixtures, and reproduction steps where available.
- Known risks and unresolved assumptions.

## Workflow

1. Define target frame intervals and acceptable tail latency.
2. collect per-frame CPU/GPU timings with synchronized sampling.
3. separate simulation and rendering workloads.
4. inspect waits, queue stalls, allocation spikes, and shader compilation.
5. compare p50/p95/p99 across repeatable scenes.
6. identify one bottleneck before optimizing.
7. add a reproducible benchmark.
8. test under asset streaming and multiplayer load.
9. Document rollback or safe fallback behavior.

## NEXORA measurement path and presentation attribution

In the inspected NEXORA snapshot, use the actual frame-accounting contract rather than estimating presentation wait from FPS:

- `engine/runtime/src/frame.rs`: `FrameRun::record` charges ordered stages; `waited_for_presentation(stage, waited)` requires that stage to have been charged, rejects a wait longer than its stage, and permits only one presentation wait per frame.
- `FrameReport::wall()` is the host-measured whole-frame time; `presentation_wait()` is the declared wait; `work()` is `wall - presentation_wait` and is the value classified by the frame budget; `unattributed()` exposes time no stage claimed.
- `engine/rhi-wgpu/src/lib.rs`: `WgpuRhi::last_present_wait()` measures the backend's blocking time around surface acquisition and handoff to the queue. Do not call this GPU execution time; it includes display pacing and may include prior GPU work.
- `engine/client/src/lib.rs`: the client charges the Render stage, declares the backend wait inside that stage, and records wall/work/wait distributions.
- `scripts/local-validation.py`: `client_mode` captures frame wall, work, presentation wait, p95/max, unattributed time, and the scenario's streaming/render state. The benchmark separately exposes `window.present_chunk_16` and `window.present_wait_chunk_16`.

### Historical local evidence (not a current baseline guarantee)

The checked-in local report generated 2026-10-26 records an RX 6650 XT / Vulkan / AMD driver 26.10.1 run. Its `rhi_native` and `window` checks are PASS, with 11/11 conformance cases and observable upload/draw/presentation proofs. The 120-frame client sample reports wall median 9.83 ms, p95 10.74 ms; work median 0.68 ms, p95 1.15 ms; presentation-wait median 9.22 ms, p95 9.92 ms. This is a historical observation for that recorded environment, not a universal budget or proof for a newer commit.

Important caveat: that report records commit `daf14da1d4a844927deb9e1b45adbda951d696c2` with a dirty working tree (52 files). Treat it as useful diagnostic evidence, not a clean-commit reproducibility artifact. Re-run the local validation on a clean checkout of the target commit and run the report freshness check before using it as release evidence.

### Diagnosis sequence

1. Compare wall, work, presentation wait, and unattributed distributions before changing renderer code.
2. If wall is high but work is low and wait dominates, investigate display refresh, FIFO pacing, surface availability, and presentation scheduling first; do not optimize shaders based on that sample.
3. If work is high, inspect per-stage attribution, submission/fence waits, CPU render preparation, and separately measured GPU timestamps/probes. Never infer GPU execution from `work()` alone.
4. If unattributed time is material, find the uncharged lock, allocation, host callback, or missing stage before assigning the cost to simulation or rendering.
5. Repeat with a fixed scene, window size, refresh rate, power mode, build profile, warm-up, and sample count. Report p50/p95/p99/max and outlier counts, not only median/FPS.
6. Keep a headless/no-surface baseline separate from a windowed/presented run. They answer different questions and must not be averaged together.

## Validation checklist

- [ ] The invariant and measurable acceptance criteria are explicit.
- [ ] Ownership, lifecycle, and failure handling are documented.
- [ ] Tests cover normal, boundary, repeated, and failure cases.
- [ ] Source and bundle copies are byte-identical.
- [ ] Focused tests and static checks pass, or skipped checks are reported honestly.
- [ ] Performance and reliability claims include reproducible evidence.

## Required output

Report the decision, invariants, code paths reviewed or changed, tests and results, performance/compatibility implications, and unresolved risks.

## Boundaries and failure handling

The report identifies the dominant measured bottleneck and verifies the fix across repeated runs.

Do not infer GPU time from CPU submission duration alone. Avoid performance claims based only on average FPS.

## Trigger examples

- **Positive:** A code change or incident directly involves frame pacing and frame-time regressions and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The request is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The task is only documentation/content work with no runtime, reliability, or code behavior impact.
