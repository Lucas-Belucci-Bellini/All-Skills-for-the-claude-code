---
name: nexora-frame-time-regression-triage
description: "Compares clean NEXORA builds and reproducible workloads to detect, classify, and gate frame-time regressions without confusing CPU work, GPU execution, or presentation pacing."
---

# NEXORA Frame-Time Regression Triage

## Purpose

Use this workflow when a NEXORA change may have regressed frame pacing and the team needs a repeatable before/after decision. This skill owns the regression experiment, comparison record, triage decision, and release gate. It does not replace `nexora-frame-pacing-budget` for diagnosing per-frame attribution or `nexora-gpu-frame-timing-evidence` for GPU timestamp capability and asynchronous query design.

## Required inputs

- Exact baseline and candidate commit SHAs; both checkouts must be clean and built with recorded toolchain and flags.
- Target hardware, OS, graphics backend, adapter/driver, display refresh, power mode, resolution, window mode, and build profile.
- A deterministic or tightly controlled workload: world/save fixture, player/camera path, scene complexity, chunk radius, streaming state, and duration.
- Warm-up policy, sample count, capture interval, and any known environmental noise.
- Existing frame report schema and the metric ownership for wall time, CPU work, presentation wait, unattributed time, and GPU execution where supported.
- A project-approved regression tolerance. If none exists, report deltas and confidence without inventing a pass/fail threshold.

## Experiment protocol

1. **Pin the comparison.** Record baseline/candidate SHAs, dirty-tree status, build command, compiler/toolchain, features, assets, configuration, and benchmark harness revision. Reject comparisons where the source or workload differs without an explicit explanation.
2. **Control the environment.** Keep hardware, driver, backend, refresh rate, power profile, resolution, window state, background load, and thermal state as consistent as practical. Record unavoidable differences rather than silently treating them as equivalent.
3. **Define the workload identity.** Store fixture identifiers and hashes, world seed, camera/player path, chunk/LOD settings, asset set, streaming/network conditions, and scenario duration. A scenario name alone is not enough to prove equivalence.
4. **Separate warm-up from measurement.** State shader/pipeline compilation, cache warm-up, asset loading, and chunk residency policy. Do not mix cold-start and steady-state samples in one distribution. If cold-start behavior matters, report it as a separate scenario.
5. **Capture comparable samples.** Use the same frame count or elapsed interval for both commits. Preserve per-frame samples when possible; record dropped/invalid samples and explain why they were excluded. Never silently trim slow frames.
6. **Compare metric families independently.** Report wall frame time, CPU work, presentation wait, unattributed time, and GPU execution only when actually measured. Do not infer GPU time from FPS, CPU work, fence wait, or presentation wait. Keep headless and windowed runs separate.
7. **Report distributions and tails.** Include sample count, p50, p90, p95, p99, maximum, standard deviation or robust spread, and counts above the target frame interval. Include FPS only as a secondary derived view; average FPS cannot replace frame-time distributions.
8. **Quantify change.** For each metric, show baseline, candidate, absolute delta, relative delta, and the direction that is considered worse. Preserve units and distinguish milliseconds from frame intervals. If sample size or noise makes the result inconclusive, label it inconclusive.
9. **Check repeatability.** Run paired repetitions in alternating or randomized order when feasible. Report per-run deltas and their spread; do not treat adjacent frames as independent benchmark runs. Investigate thermal drift, background tasks, and run-order effects.
10. **Triage the responsible subsystem.** Use the attribution workflow to determine whether the change is in simulation, render preparation, submission, GPU execution, presentation pacing, streaming, allocation, synchronization, or an uncharged interval. Do not optimize a subsystem merely because total wall time rose.
11. **Set a regression decision.** Apply only a pre-approved threshold with an identified owner and rationale. Classify the result as `PASS`, `REGRESSION`, `IMPROVEMENT`, or `INCONCLUSIVE`; a missing GPU measurement is `UNAVAILABLE`, not a pass.
12. **Preserve an actionable artifact.** Store machine-readable raw samples and a concise report containing environment, commit IDs, workload identity, methodology, distributions, deltas, exclusions, decision, suspected cause, and reproduction command.
13. **Verify the fix and rollback.** Re-run the exact protocol after the proposed fix. If the result is not repeatable or the cause remains unknown, do not claim the regression is resolved; retain a rollback or feature-disable path when release risk warrants it.

## Required comparison table

For each scenario, provide at least:

| Metric | Baseline | Candidate | Delta | Decision / caveat |
|---|---:|---:|---:|---|
| Frame wall p50 / p95 / p99 / max | | | | |
| CPU work p50 / p95 / p99 / max | | | | |
| Presentation wait p50 / p95 / p99 / max | | | | |
| Unattributed time p50 / p95 / p99 / max | | | | |
| GPU execution p50 / p95 / p99 / max | | | | |
| Frames above target interval | | | | |

Omit unavailable metrics or mark them `UNAVAILABLE`; never fill them with estimates presented as measurements.

## Validation checklist

- [ ] Baseline and candidate commits are pinned and clean.
- [ ] Toolchain, build profile, hardware, backend, driver, display, and environment are recorded.
- [ ] Workload identity and fixture hashes match.
- [ ] Warm-up and cold-start policies are explicit and separated.
- [ ] Sample counts, dropped samples, and exclusions are disclosed.
- [ ] Wall, CPU work, presentation wait, unattributed time, and GPU execution remain distinct.
- [ ] Tail percentiles and outliers are reported, not only average FPS or median.
- [ ] Thresholds are approved and justified; otherwise the result is descriptive/inconclusive.
- [ ] Repeated runs support the conclusion.
- [ ] Raw data and a reproduction command are retained.
- [ ] The fix is re-tested with the same protocol before claiming resolution.

## Boundaries and failure handling

- Do not choose universal millisecond budgets without target-hardware measurements and product approval.
- Do not compare dirty local reports with clean release builds as if they were equivalent.
- Do not average headless and presented runs together.
- Do not call presentation wait GPU execution time.
- Do not suppress outliers, alter fixtures, or change benchmark settings to make a candidate pass.
- If the workload cannot be made equivalent, report the comparison as non-comparable and explain the missing control.
- If the result is noisy, preserve the raw evidence and mark it inconclusive instead of asserting a regression or improvement.

## Required output

Return the pinned environment and commits, workload definition, exact commands, raw artifact locations, baseline/candidate distributions, deltas, exclusions, regression classification, likely subsystem, next diagnostic action, and unresolved uncertainty.

## Trigger examples

- **Positive:** A rendering, simulation, streaming, or scheduling change needs a before/after performance gate.
- **Positive:** A release candidate must be checked for frame-time regressions on a fixed workload.
- **Negative:** The task is only to diagnose one frame's CPU/GPU attribution; use the frame-pacing budget workflow.
- **Negative:** The task is to implement RHI timestamp-query support; use the GPU frame-timing evidence workflow.
