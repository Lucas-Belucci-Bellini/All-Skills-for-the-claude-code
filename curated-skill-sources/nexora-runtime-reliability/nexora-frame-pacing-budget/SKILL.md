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
9. Document rollback or safe fallback behavior..

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
