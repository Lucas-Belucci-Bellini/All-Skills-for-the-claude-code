---
name: runtime-log-redaction-boundary
description: Audit runtime diagnostics for secret/PII leakage and verify redaction occurs before logs, traces, bundles, or crash reports leave the process boundary.
---

# Runtime Log Redaction Boundary

## Goal

Preserve useful debugging evidence while minimizing accidental exposure of credentials, personal data, and private world/session state.

## Inputs to inspect

Logging calls, structured event schemas, tracing attributes, crash/report exporters, config snapshots and redaction rules.

## Workflow

1. Inventory sinks and outbound diagnostic paths, including logs, traces, telemetry exporters, support bundles and crash-report uploads.
2. Classify fields by sensitivity and identify values sourced from tokens, file paths, user content, identifiers, network payloads and configuration.
3. Verify redaction/allowlisting occurs before serialization/export, with tests covering nested objects, formatted messages, exception strings and encoded payloads.
4. Exercise malformed/unknown data and future schema fields to ensure new fields default to safe omission rather than automatic export.
5. Add static or runtime tests for known secret patterns and document exceptions where temporary access to sensitive diagnostics requires explicit authorization.

## Validation checklist

- [ ] Redaction is applied at the boundary before external sinks receive the payload.
- [ ] Unknown structured fields do not bypass allowlist rules.
- [ ] Redaction does not remove all context needed to correlate related events; safe stable identifiers remain available where justified.
- [ ] Tests include formatted messages and stack/error content, not only key-value maps.

## Required output

A diagnostic data-flow map, sensitive-field inventory, redaction regression suite and safe export policy.

## Boundaries and failure handling

Do not copy live secrets into test fixtures or diagnostic examples; use synthetic values and bounded samples.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
