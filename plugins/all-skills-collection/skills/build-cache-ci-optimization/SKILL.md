---
name: build-cache-ci-optimization
description: "Finds high-value build and CI speedups without weakening correctness gates. Use when monorepo tests or builds are expensive, flaky, or repeat redundant work."
---

# Build Cache Ci Optimization

## Use when
CI duration is high but proposed fixes disable tests or add caches without proving correctness and cache validity.

## Workflow
1. Collect per-step duration, cache hit/miss rate, flaky retry rate, critical path, environment variance, and parallel resource contention.
2. Separate deterministic cacheable work from network, secret, timestamp, or environment-dependent steps.
3. Change one bottleneck at a time; validate cache keys against source, lockfiles, toolchain, target, and relevant configuration.
4. Compare median and tail CI times alongside test coverage, false-pass risk, and failure diagnosis quality.

## Required output
A measured bottleneck report, cache-key design, candidate optimizations, and before/after reliability metrics.

## Validation
- No correctness gate is removed merely to reduce duration.
- Cache invalidation covers every input that can change the output.
- Cold-cache and warm-cache builds both work.

## Guardrails
Never cache credentials or mutable external state into build outputs, and never conceal failing checks as successful retries.
