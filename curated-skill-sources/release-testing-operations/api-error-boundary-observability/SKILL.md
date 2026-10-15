---
name: api-error-boundary-observability
description: Correlate API failures across request IDs, structured logs, traces, and user-safe error responses.
---

# Api Error Boundary Observability

## Goal

Make production failures diagnosable without exposing internal details or sensitive payloads.

## Inputs to inspect

API error mapping, logging middleware, tracing instrumentation, request identifiers, and dashboards.

## Workflow

1. Define an error taxonomy for validation, authentication, authorization, conflict, dependency failure, timeout, and unexpected defects.
2. Generate or validate a request/correlation ID at the trusted boundary and propagate it to logs, traces, async jobs, and downstream calls.
3. Log structured fields that explain operation, outcome, duration, dependency, and safe error category; keep tokens and raw sensitive bodies out of logs.
4. Map internal exceptions to safe client responses with correlation ID and stable error code; preserve causal chains in protected diagnostics.
5. Inject expected and unexpected faults to verify the same identifier joins the request, dependency span, job, and user-visible error.

## Validation checklist

- [ ] Every 5xx response can be correlated to an internal diagnostic record.
- [ ] Logs do not contain credentials, sensitive payloads, or unredacted personal data.
- [ ] Expected business failures are not miscounted as infrastructure incidents.
- [ ] Sampling and retention preserve high-value traces without unbounded cost.
- [ ] The client receives actionable safe information without stack traces.

## Required output

Deliver an error taxonomy, log/trace field contract, correlation example, redaction checklist, and failure-injection evidence.

## Boundaries and failure handling

Do not log full request bodies by default; do not expose internal exception messages or secret-bearing dependency URLs.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
