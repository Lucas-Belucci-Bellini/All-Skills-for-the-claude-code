---
name: runtime-health-signal-contract
description: Define stable health/readiness signals for runtime subsystems and validate that they reflect useful capability rather than process existence.
---

# Runtime Health Signal Contract

## Goal

Make health checks actionable for engine hosts, dedicated servers and automation by expressing readiness, degraded modes and unrecoverable faults consistently.

## Inputs to inspect

Health endpoints/status objects, subsystem initialization, background workers, persistence queues, memory pressure and shutdown state.

## Workflow

1. List critical and optional capabilities and define the exact conditions for healthy, starting, degraded, unhealthy and shutting-down states.
2. Connect each state to authoritative evidence such as worker progress, persistence availability, critical resource readiness and fatal error flags.
3. Test startup races, partial subsystem failure, queue saturation, storage outage, memory pressure and graceful shutdown to verify emitted state transitions.
4. Check that a transient metric blip does not flap health state without hysteresis, while a critical stuck condition is not hidden by a process-alive signal.
5. Document consumers, polling intervals, thresholds and recovery semantics; add tests that compare health state with the capability the caller actually needs.

## Validation checklist

- [ ] Readiness is distinct from liveness and from overall service health.
- [ ] Optional feature failures can produce degraded capability without masking critical persistence/authority failures.
- [ ] Health signals are cheap, bounded and do not recursively depend on the failing subsystem.
- [ ] State transitions include a reason code suitable for logs/metrics without leaking sensitive data.

## Required output

A health-state schema, capability mapping, failure-transition tests and operator-facing reason-code documentation.

## Boundaries and failure handling

Do not report healthy merely because the process responds; validate the functions downstream callers depend on.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
