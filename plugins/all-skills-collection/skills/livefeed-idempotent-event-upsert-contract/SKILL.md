---
name: livefeed-idempotent-event-upsert-contract
description: "Provides an evidence-driven workflow for livefeed idempotent event upsert contract, with concrete invariants, representative failure cases, and a reviewable validation artifact. Use when implementing, diagnosing, or changing this specific boundary."
---

# Livefeed Idempotent Event Upsert Contract

## Purpose

Provide a task-specific, reproducible workflow for livefeed idempotent event upsert contract; isolate the relevant contract and produce evidence another maintainer can review without relying on undocumented context.

## Required inputs

Target project or service and version; current configuration/data shape; expected behavior and invariant; minimal sanitized reproduction or fixture; toolchain/environment; and applicable safety, rollback, retention or approval requirements. Capture exact identifiers when useful, but do not include credentials or unnecessary personal data.

## Workflow

1. Capture provider contract/version, retrieval cursor or watermark, rate-limit state, source/event timestamps, ingestion timestamp and a redacted sample for livefeed idempotent event upsert contract.
2. Trace retries, pagination, deduplication, transformations, cache and persistence; define how the pipeline distinguishes empty data, stale data, provider outage and partial response.
3. Prepare fixtures for schema drift, duplicated/out-of-order events, clock skew, page-token expiry, quota exhaustion, deletion/tombstone events and interrupted replay.
4. Replay the fixture into a staging sink with bounded rate and idempotent writes; measure freshness, lag, duplicates, rejected records and checkpoint movement.
5. Publish a reconciliation report with source/ingest watermarks, failure classification, recovery steps and whether checks used synthetic or real provider data.

## Validation checklist

- [ ] The scope, assumptions, version and expected invariant for livefeed idempotent event upsert contract are explicit.
- [ ] Success and negative/boundary/failure cases are represented by a repeatable fixture or reviewable evidence.
- [ ] The procedure checks the relevant state/data/permission boundary and records expected versus observed results.
- [ ] Failure recovery, rollback or safe stop behavior is defined before irreversible actions.
- [ ] The report distinguishes verified, failed, blocked and untested claims and includes a named next action for remaining gaps.

## Required output

A livefeed idempotent event upsert contract evidence package containing context/version, reproduction/fixture, invariants, checks performed, measured or observed results, failure cases, recommended action, rollback/recovery notes and PASS / FAIL / UNVERIFIED status.

## Boundaries and failure handling

Respect provider terms and quotas; never use a live endpoint as an unbounded retry target. Label synthetic/stale/fallback data, keep credentials out of logs and preserve idempotent recovery semantics.
If the version, source contract or permission boundary cannot be confirmed, mark the result UNVERIFIED and stop before irreversible changes. Bound retries, preserve the smallest useful reproduction and escalate when evidence is ambiguous. Never claim a test, deployment, provider response, runtime behavior or approval occurred unless the result was actually observed.

## Trigger examples

- **Positive:** An engineer needs to investigate or change livefeed idempotent event upsert contract and must provide reproducible evidence, known limits and recovery steps.
- **Negative:** The request does not involve livefeed idempotent event upsert contract or a downstream contract affected by this exact boundary.
