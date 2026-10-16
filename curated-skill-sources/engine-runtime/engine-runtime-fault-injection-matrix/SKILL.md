---
name: engine-runtime-fault-injection-matrix
description: Plan and execute controlled fault injection across runtime initialization, task scheduling, resource loading, persistence, and shutdown boundaries.
---

# Engine Runtime Fault Injection Matrix

## Goal

Verify that failures produce bounded recovery and actionable evidence instead of corrupting state or hanging the runtime.

## Inputs to inspect

Subsystem dependency graph, injectable failure points, cleanup contracts, health signals, persistence transactions and runtime logs.

## Workflow

1. List critical boundaries and failure classes: allocation failure, unavailable service, I/O errors, worker panic, timeout, device loss, cancellation and malformed input.
2. Define the expected state transition for each injected fault, including what must remain valid, what can be retried and what must abort safely.
3. Inject one fault at a time at deterministic checkpoints, then test selected combinations where dependencies interact or recovery ordering matters.
4. Capture recovery time, resource/task residue, state invariants and emitted diagnostics; repeat the same scenario to confirm stable behavior.
5. Convert confirmed defects into focused regression tests and track untested high-risk combinations instead of expanding chaos randomly.

## Validation checklist

- [ ] Faults are injected only in controlled test environments with bounded side effects.
- [ ] The expected outcome is specified before injection; otherwise the test cannot distinguish acceptable recovery from accidental success.
- [ ] No test claims recovery if authoritative state was lost or corrupted without explicit reporting.
- [ ] Cleanup of partially initialized resources is validated.

## Required output

A failure-point inventory, fault/outcome matrix, recovery measurements and regression tickets/tests for confirmed gaps.

## Boundaries and failure handling

Do not run destructive fault injection against production data or shared live environments; use disposable fixtures and explicit isolation.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
