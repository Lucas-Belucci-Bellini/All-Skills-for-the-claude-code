---
name: rust-profile-guided-optimization
description: Use reproducible Rust profiling and PGO workflows to improve release performance without sacrificing debuggability or portability.
---

# Rust Profile-Guided Optimization

## Goal

Apply profile-guided optimization only when representative workloads show a repeatable benefit and the build pipeline can reproduce it.

## Inputs to inspect

Cargo profiles, compiler/toolchain version, profile-generation workload, perf profiles, release artifacts and CI/release scripts.

## Workflow

1. Establish baseline release timings, binary size and profile data for representative workloads; record Rust version, target CPU and build flags.
2. Select a profile-generation workload that covers common and important rare paths, and separate training artifacts from production assets.
3. Build instrumented binaries, run the workload, merge or validate profile data as required, and rebuild with PGO using the same pinned toolchain.
4. Compare latency distribution, throughput, code size, startup time and behavior on both the training workload and a held-out workload.
5. Document when profile data must be regenerated and add reproducible build instructions plus a fallback build without PGO.

## Validation checklist

- [ ] Baseline and PGO builds use equivalent source, dependencies and target configuration.
- [ ] Training represents the intended deployment workload and does not encode accidental test-only behavior.
- [ ] Performance improvements repeat across runs and do not hide regressions in cold paths or startup.
- [ ] Builds remain debuggable, and CI artifacts make the toolchain/profile provenance traceable.

## Required output

A reproducible PGO recipe, profile provenance, baseline comparison, held-out workload result, and rollback criteria.

## Boundaries and failure handling

Do not claim PGO is beneficial from a single noisy run or distribute profile artifacts whose build/toolchain compatibility is unknown.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
