---
name: runtime-observability-smoke-test
description: Verify that essential runtime metrics, logs, traces, health signals, and redaction controls work end to end in a deployed test environment.
---

# Runtime Observability Smoke Test

## Goal

Catch observability pipelines that silently fail, mislabel runtime state, or leak sensitive fields before a release is deployed broadly.

## Inputs to inspect

Metrics exporters, log sinks, trace propagation, health endpoints, sample diagnostic events and redaction rules.

## Workflow

1. Define a small set of known synthetic events for startup, normal operation, a handled error, degraded mode and shutdown.
2. Run the test workload and confirm each expected signal reaches the intended sink with stable names, units, correlation IDs and bounded dimensions.
3. Trigger one controlled error and verify traces/logs point to the same event while secret-bearing synthetic test values are redacted at export boundaries.
4. Simulate sink unavailability, backpressure and partial exporter failure; verify runtime behavior stays bounded and signal loss is observable.
5. Capture a concise pass/fail report keyed to the exact build/config and add the smoke test to release qualification.

## Validation checklist

- [ ] Expected signals are validated at the receiving sink, not merely at the local logging call.
- [ ] Metric units and label dimensions match the declared schema.
- [ ] Redaction is tested through the actual serialization/export path.
- [ ] Exporter failure does not deadlock or exhaust frame/runtime resources.

## Required output

An observability smoke-test plan, synthetic event results, redaction evidence and release gate for signal-path health.

## Boundaries and failure handling

Do not send real credentials or user content to test telemetry; synthetic test values should be used.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
