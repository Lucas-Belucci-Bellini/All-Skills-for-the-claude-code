---
name: flaky-test-isolation
description: Diagnose intermittent test failures by separating shared-state leaks, timing assumptions, test order, environment drift, and real races.
---

# Flaky Test Isolation

## Goal

Restore trustworthy CI signals without disguising intermittent defects by permanently skipping tests.

## Inputs to inspect

Failing test names, CI logs, retry history, random seeds, execution order, dependency versions, and local reproduction capability.

## Workflow

1. Collect all failing and passing attempts with timestamps, environment metadata, random seeds, worker count, and preceding test order.
2. Classify likely causes: shared mutable state, non-deterministic ordering, wall-clock timing, external service dependence, resource leakage, concurrency race, or unstable assertion.
3. Reproduce under controlled variation: repeat the test alone, with the full suite, in shuffled order, with limited parallelism, and with recorded seeds.
4. Reduce the failure to the smallest deterministic reproduction. If isolation requires a temporary quarantine, assign an owner, reason, expiry date, and issue link.
5. Implement the narrowest fix and run both repeated isolated tests and the relevant full suite under CI-like conditions.

## Validation checklist

- [ ] Retries preserve logs and seeds rather than only reporting the final success.
- [ ] The root-cause hypothesis is supported by a reproducible observation.
- [ ] Quarantine is time-bounded and visible; it does not become the permanent fix.
- [ ] The final test includes the concurrency or order condition that previously exposed the defect.
- [ ] CI status distinguishes confirmed fixed, still flaky, quarantined, and unable to reproduce.

## Required output

Deliver a flake investigation record with evidence, reproduction steps, root-cause confidence, minimal fix, repeated-run results, and any quarantine owner/expiry.

## Boundaries and failure handling

Do not raise retry counts as the sole remedy; do not mark the suite healthy because one rerun passed.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
