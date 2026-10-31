---
name: otel-queue-persistence-corruption-drill
description: "Provides an evidence-driven workflow for otel queue persistence corruption drill, with concrete invariants, representative failure cases, and a reviewable validation artifact. Use when implementing, diagnosing, or changing this specific boundary."
---

# Otel Queue Persistence Corruption Drill

## Purpose

Provide a task-specific, reproducible workflow for otel queue persistence corruption drill; isolate the relevant contract and produce evidence another maintainer can review without relying on undocumented context.

## Required inputs

Target project or service and version; current configuration/data shape; expected behavior and invariant; minimal sanitized reproduction or fixture; toolchain/environment; and applicable safety, rollback, retention or approval requirements. Capture exact identifiers when useful, but do not include credentials or unnecessary personal data.

## Workflow

1. Capture Collector distribution/version, enabled components, configuration revision, receiver/processor/exporter graph and baseline telemetry volume relevant to otel queue persistence corruption drill.
2. Trace data through the pipeline and document ordering, queueing, sampling, redaction, routing, retry and loss semantics; do not assume every processor sees the same attributes.
3. Create fixtures for high cardinality, malformed data, partial exporter failure, queue saturation, secret-like values, config reload, shutdown and version skew where relevant.
4. Validate configuration and exercise the failure in a local/staging Collector; observe accepted/rejected/dropped counts, queue depth, memory, export latency and recovery.
5. Deliver config diff, component versions, measured signal loss/cost, security implications and rollback plan; distinguish config lint from end-to-end telemetry delivery test.

## Validation checklist

- [ ] The scope, assumptions, version and expected invariant for otel queue persistence corruption drill are explicit.
- [ ] Success and negative/boundary/failure cases are represented by a repeatable fixture or reviewable evidence.
- [ ] The procedure checks the relevant state/data/permission boundary and records expected versus observed results.
- [ ] Failure recovery, rollback or safe stop behavior is defined before irreversible actions.
- [ ] The report distinguishes verified, failed, blocked and untested claims and includes a named next action for remaining gaps.

## Required output

A otel queue persistence corruption drill evidence package containing context/version, reproduction/fixture, invariants, checks performed, measured or observed results, failure cases, recommended action, rollback/recovery notes and PASS / FAIL / UNVERIFIED status.

## Boundaries and failure handling

Telemetry can contain credentials and personal data. Minimize collection, redact before export, cap cardinality and cost, and do not claim no data loss without reconciling accepted, dropped and exported records.
If the version, source contract or permission boundary cannot be confirmed, mark the result UNVERIFIED and stop before irreversible changes. Bound retries, preserve the smallest useful reproduction and escalate when evidence is ambiguous. Never claim a test, deployment, provider response, runtime behavior or approval occurred unless the result was actually observed.

## Trigger examples

- **Positive:** An engineer needs to investigate or change otel queue persistence corruption drill and must provide reproducible evidence, known limits and recovery steps.
- **Negative:** The request does not involve otel queue persistence corruption drill or a downstream contract affected by this exact boundary.
