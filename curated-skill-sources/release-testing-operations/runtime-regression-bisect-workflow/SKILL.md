---
name: runtime-regression-bisect-workflow
description: Design a reproducible binary-search workflow to locate runtime regressions using pinned builds, stable workloads, and explicit inconclusive results.
---

# Runtime Regression Bisect Workflow

## Goal

Reduce the time needed to locate a regression while avoiding false blame from changing environments, nondeterministic workloads or broken intermediate builds.

## Inputs to inspect

Known-good and bad revisions, test workload, build scripts, runtime health/performance metric and dependency cache policy.

## Workflow

1. Define a machine-verifiable pass/fail criterion and preserve the exact workload, seed/input, environment and dependency/toolchain versions for both endpoints.
2. Check whether revisions between endpoints can be built and exercised consistently; identify dependency or configuration changes that make some revisions incomparable.
3. Automate midpoint build/run, preserving logs and artifacts, and classify outcomes as pass, fail, build failure or inconclusive instead of forcing a binary result.
4. Repeat noisy/inconclusive measurements using a bounded policy and verify the boundary commits with full runs after narrowing the interval.
5. Report the culprit range, evidence, excluded/inconclusive revisions and next manual investigation steps; create a minimized regression test when possible.

## Validation checklist

- [ ] Pass/fail thresholds are defined before bisection begins and use identical workload conditions.
- [ ] Build failures and nondeterministic results are not silently classified as regression failures.
- [ ] The final candidate is confirmed with repeated endpoint runs.
- [ ] Artifacts are tied to exact revision and build configuration.

## Required output

A bisect recipe/script outline, pinned test manifest, per-revision result ledger and verified suspect range.

## Boundaries and failure handling

Do not claim one commit caused the bug when intermediate revisions were inconclusive or the endpoint environment changed.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
