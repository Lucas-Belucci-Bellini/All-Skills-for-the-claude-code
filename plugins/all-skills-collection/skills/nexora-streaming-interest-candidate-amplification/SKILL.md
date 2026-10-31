---
name: nexora-streaming-interest-candidate-amplification
description: "Audits multi-source streaming candidate-set growth, overlap, and per-candidate source-scan amplification in NEXORA."
---

# NEXORA Streaming Interest Candidate Amplification

## Purpose

Use this workflow when a NEXORA streaming tick becomes expensive with multiple observers, when overlapping interest regions behave differently from disjoint regions, or when source-count and radius limits need a defensible work estimate.

This is a complexity and measurement workflow. It does not implement a scheduler optimization, change admission limits, or replace chunk-priority fairness, hysteresis, or world-generation budgets.

## Evidence boundary

The audited NEXORA snapshot is `19486829d18bd864fea00cac0711f519a5c07a70`.

In `engine/streaming/src/system.rs`:

- `desired_tiers()` seeds candidates with tracked targets and pinned targets.
- For each interest source, it enumerates every coordinate in the square `[-outer, outer] × [-outer, outer]` and inserts the corresponding chunk into a `BTreeSet`. Overlapping source areas are deduplicated for candidate storage.
- After candidate construction, the function iterates every candidate and scans every interest source to calculate the nearest distance and the best tier.
- `MAX_INTEREST_SOURCES` is 256.
- In `engine/streaming/src/interest.rs`, `MAX_RADIUS` is 127 and `LodRadii::outer()` returns the abstract-tier radius.
- A source at outer radius 127 enumerates a 255 × 255 square: at most 65,025 coordinate insert attempts for that source.

For the interest-generated candidate portion only, let:
- (S) = number of active interest sources, with (0 \le S \le 256);
- (R) = maximum outer radius among those sources, with (0 \le R \le 127);
- (A=(2R+1)^2) = coordinate positions enumerated per source at the common-radius upper bound;
- (C) = unique candidate count after deduplication, excluding pre-existing tracked/pinned targets.

Then:
- Raw source-coordinate insertion attempts are at most (S \times A).
- (C \le S \times A), with equality possible for sufficiently separated source squares.
- The candidate-scoring loop performs (C \times S) source visits.
- At the configured maxima, the disjoint-area upper bound is (256 \times 65,025 = 16,646,400) interest-generated candidates, and the corresponding source-scan upper bound is (16,646,400 \times 256 = 4,261,478,400) candidate/source visits.

These are structural upper bounds derived from loop bounds, not measured tick latency, actual memory consumption, or proof that a production workload reaches the bound. Tracked and pinned targets can add candidates beyond the interest-generated portion; count them separately. BTreeSet insertion and ordered-container costs are additional work.

Re-open the current source before applying this workflow. Constants, data structures, and loops may change. The audited SHA is evidence, not a permanent API guarantee.

## Required inputs

- Exact NEXORA commit SHA, Rust toolchain, build profile and machine description.
- `engine/streaming/src/system.rs`, `interest.rs`, `budget.rs` and relevant tests.
- Active source count, each source's center and outer radius.
- Tracked-target count and pinned-target count.
- Whether source areas are co-located, partially overlapping or disjoint.
- A deterministic workload seed and tick sequence.
- Instrumentation plan distinguishing counts from elapsed-time measurements.

## Workflow

1. **Pin the implementation.** Record the exact NEXORA SHA, toolchain, build profile, source paths and commands. Do not combine measurements from different revisions.
2. **Trace candidate construction.** Confirm which collections seed candidates, how each source enumerates its square, and where duplicate targets are removed.
3. **Trace candidate scoring.** Confirm whether every unique candidate scans every active source, and record each distance, tier and nearest-source operation in that loop.
4. **Calculate the bound.** For each source, compute its own ((2r_i+1)^2) enumeration area. Use the common-radius upper bound only when all sources can reach that radius. Keep the sum of insertion attempts separate from the unique union size.
5. **Model overlap.** Create co-located, partially overlapping and disjoint source layouts. Record raw insertion attempts, unique candidates and candidate/source visits separately. Do not assume that overlap reduces the scoring loop by the same ratio as it reduces unique candidates.
6. **Include non-interest candidates.** Add tracked and pinned targets to the candidate accounting. Avoid double-counting targets already present in the interest union.
7. **Audit container work.** Record BTreeSet insertion count, unique set size, BTreeMap traversal and sorting operations. State whether estimates are asymptotic, operation counts or measured timings.
8. **Run deterministic profiles.** Use source counts 1, 2, 16 and 256 where the environment permits; use radii 0, 1, 6 and 127 where valid and practical. Large maximum cases may be arithmetic-only if materializing them would be unsafe or prohibitively expensive.
9. **Measure only with controls.** If timing is collected, use release builds, warm-up, repeated samples, fixed hardware and identical inputs. Report distributions and exact commands. Never infer milliseconds from operation-count formulas.
10. **Report evidence.** Separate code-derived bounds, instrumented counts, benchmark timings, proposed experiments and runtime observations.

## Validation checklist

- [ ] Source count and each source's outer radius are recorded.
- [ ] Raw per-source coordinate insert attempts are counted separately from unique candidates.
- [ ] Tracked and pinned candidate contributions are reported separately and deduplicated correctly.
- [ ] Candidate/source visits are calculated from the actual scoring loop.
- [ ] Co-located, partially overlapping and disjoint layouts are compared.
- [ ] The 256-source and radius-127 theoretical bound is labeled as a structural upper bound, not a benchmark.
- [ ] BTreeSet/BTreeMap costs are described separately from source-scan visits.
- [ ] Timing results, if any, include build profile, hardware, repetitions and commands.
- [ ] No scheduler fairness, hysteresis or IO-budget behavior is attributed to candidate enumeration unless directly measured.

## Validation matrix

| Scenario | Expected accounting |
|---|---|
| No interest sources | Only tracked and pinned targets seed candidates |
| One source, radius 0 | One interest coordinate insertion attempt |
| One source, radius 1 | Nine coordinate insertion attempts before deduplication |
| Two co-located sources | Twice the raw attempts, substantially overlapping unique candidate area, and source scans across both sources |
| Two partially overlapping sources | Union size between the fully overlapping and disjoint cases |
| Two disjoint sources | Unique candidate count approaches the sum of source areas |
| 16 sources | Candidate/source visits scale with actual unique candidates multiplied by 16 |
| 256 sources, radius 127 | Arithmetic-only worst-case bound is 16,646,400 interest candidates and 4,261,478,400 candidate/source visits |
| Additional tracked/pinned targets | Candidate count increases only for targets not already in the set |
| Radius changes | Enumeration area changes quadratically with side length |

## Common failure modes

- Treating raw coordinate insertions as unique candidates.
- Assuming BTreeSet deduplication also eliminates per-candidate scans of all sources.
- Multiplying the maximum source count by the maximum radius without labeling the result as a theoretical bound.
- Ignoring tracked and pinned candidates or double-counting them.
- Confusing candidate/source visits with backend activations, generated columns or bytes.
- Presenting an operation-count estimate as a measured frame time.
- Comparing debug and release timings as if they were equivalent.
- Changing the source cap or radius before identifying which stage dominates.
- Duplicating fairness or priority analysis when the question is only candidate-set construction.

## Required output

Produce a short audit containing:

1. Pinned NEXORA SHA, toolchain and relevant source paths.
2. Source count, per-source radii, tracked count and pinned count.
3. Raw insertion attempts, unique candidate count and candidate/source visits.
4. Co-located, partially overlapping and disjoint workload comparison.
5. Formula assumptions and clearly labeled theoretical upper bounds.
6. Benchmark commands and results, if timing was actually measured.
7. Any evidence that the dominant cost lies in candidate insertion, source scanning, sorting or a later pipeline stage.
8. Explicit limits: this workflow does not implement runtime fixes or establish performance gains.

## Boundaries and failure handling

Do not modify NEXORA runtime code as part of a skill-only task. If measurement identifies a runtime bottleneck, open a separate NEXORA issue with reproducible workload inputs, profiling evidence and acceptance criteria. Do not present a theoretical upper bound as a production workload or performance regression. Do not reduce source/radius limits merely to hide unmeasured costs.

## Trigger examples

- **Positive:** A multiplayer world with many observers needs a cost model for the union of interest areas and the repeated source scan used to score each candidate.
- **Positive:** Two workloads have the same observer count but different spatial overlap, and their candidate counts and per-tick source visits need to be compared.
- **Negative:** A request is about which ready chunk should load first under a tight activation budget; use the chunk-priority/fairness workflow instead.
- **Negative:** A request is about radius-boundary thrashing, observer identity admission, or backend IO backpressure without a candidate-set amplification question.
