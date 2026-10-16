---
name: circuit-breaker-recovery-probe
description: "Test closed, open and half-open circuit-breaker transitions, concurrency limits and safe recovery when a dependency becomes healthy again."
---

# Circuit Breaker Recovery Probe

## Purpose

Verify that a circuit breaker limits damage during failure and recovers without flooding a dependency or remaining open indefinitely.

## Required inputs

Breaker implementation, failure/success thresholds, open duration, half-open probe limit, dependency timeout and fallback behavior.

## Workflow

1. Document state transitions and which outcomes count as failure, success, timeout, cancellation or ignored.
2. Confirm the open state fails fast according to contract and fallback behavior is bounded and observable.
3. Simulate the open timeout and verify half-open admits only intended probe concurrency.
4. Test successful/failed probes, slow success, cancellation and concurrent transitions; ensure late results cannot incorrectly reset state.
5. Observe recovery time while gradually restoring dependency capacity instead of releasing full load at once.

## Validation checklist

- [ ] State thresholds and duration are documented.
- [ ] Open state reduces load on the failed dependency.
- [ ] Half-open probe count is bounded under concurrency.
- [ ] Late results cannot produce invalid transitions.
- [ ] Recovery does not cause a synchronized retry surge.

## Required output

A state-transition table, fault-injection results, race findings and recovery guidance.

## Boundaries and failure handling

A breaker does not replace request timeouts or capacity limits. Do not run high-volume failure experiments against production without authorization and an abort plan.

## Trigger examples

- **Positive:** A recovering dependency is flooded by too many simultaneous half-open probes.
- **Negative:** Deciding whether an HTTP status belongs in an API schema.
