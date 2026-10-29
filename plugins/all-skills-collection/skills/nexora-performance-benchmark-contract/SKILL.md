---
name: nexora-performance-benchmark-contract
description: "Defines reliable benchmarks for engine hot paths with repeatable workload and measurement semantics."
---

# nexora performance benchmark contract

## Purpose

Use this workflow for NEXORA-scale engine work when engine performance benchmarking. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Choose a representative workload and stable input dataset.
2. define warm-up, repetition, and measurement boundaries.
3. record hardware, OS, compiler, flags, and build mode.
4. measure tail latency and memory as well as throughput.
5. isolate setup from timed work.
6. check benchmark overhead and noise.
7. compare against a versioned baseline.
8. define regression thresholds from variance.
9. publish raw samples and reproduction instructions.

## Validation checklist

- [ ] The invariant and measurable acceptance criteria are explicit.
- [ ] Ownership, lifecycle, and failure handling are documented.
- [ ] Tests cover normal, boundary, repeated, and failure cases.
- [ ] Changes preserve source/plugin byte parity and catalog uniqueness.
- [ ] Focused tests, formatting, and applicable static checks pass; skipped checks are listed.
- [ ] Performance and reliability claims include reproducible evidence.

## Required output

Provide the decision and scope, invariants, code paths reviewed or changed, tests and results, compatibility implications, and unresolved risks.

## Boundaries and failure handling

Benchmark results are comparable and include enough context to reproduce them.

Do not compare debug and release builds or use a single sample as proof of improvement.

## Trigger examples

- **Positive:** A code change or incident directly involves engine performance benchmarking and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
