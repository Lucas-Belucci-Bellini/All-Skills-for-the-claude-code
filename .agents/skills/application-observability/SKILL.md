---
name: application-observability
description: "Adds useful logs, metrics, traces, and health signals to diagnose production behavior while respecting privacy and cost. Use when instrumenting a service, investigating incidents, or defining operational dashboards and alerts."
---

# Application Observability

## Goal
Make system behavior diagnosable through signals that connect user-visible symptoms to underlying causes.

## Workflow
1. Identify critical user journeys, service-level objectives, failure modes, and the questions operators need to answer.
2. Use structured logs with consistent severity, event names, request or trace correlation, and useful context.
3. Add metrics for traffic, errors, latency distributions, saturation, queue depth, and domain-specific outcomes.
4. Propagate trace context across service boundaries and asynchronous work where supported.
5. Define health checks that distinguish process liveness from readiness to serve traffic.
6. Design alerts around actionable symptoms and agreed thresholds; avoid paging on every transient anomaly.
7. Bound metric cardinality and log volume; avoid unbounded identifiers as metric labels.
8. Redact secrets and minimize personal or sensitive data in logs, traces, and telemetry payloads.
9. Test telemetry in failure paths, timeouts, retries, overload, and shutdown—not only successful requests.
10. Document dashboards, alert ownership, retention, sampling, costs, and incident investigation steps.

## Deliverable
- Instrumentation plan and signal definitions.
- Example dashboards/alerts and diagnostic queries.
- Privacy, retention, and operational ownership notes.

## Acceptance criteria
- Critical failures can be distinguished using available signals.
- Alerts are actionable and linked to a response procedure.
- Telemetry volume and sensitive data exposure are controlled.
- Health checks reflect the intended operational contract.

## Guardrails
- Do not log credentials, tokens, or unnecessary personal data.
- Do not use high-cardinality labels without evaluating cost.
- Do not claim observability coverage without checking emitted signals.

