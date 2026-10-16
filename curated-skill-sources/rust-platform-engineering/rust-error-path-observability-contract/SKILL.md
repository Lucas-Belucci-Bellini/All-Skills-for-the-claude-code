---
name: rust-error-path-observability-contract
description: Audit Rust error propagation and diagnostics so failures retain causal context, stable classification, and redacted structured fields.
---

# Rust Error-Path Observability Contract

## Goal

Make errors actionable across crate and service boundaries without converting expected control flow into noisy logs or leaking sensitive values.

## Inputs to inspect

Result/error enums, anyhow/thiserror contexts, tracing events, API error mappings, retry policy and redaction boundary.

## Workflow

1. Map error sources from low-level operations through crate/service boundaries, distinguishing expected absence/retry conditions from invariant violations and fatal failures.
2. Check each transformation preserves causal source, operation context and a stable machine-readable error category where callers need to branch.
3. Review logging sites to avoid duplicate stack/context emission and ensure secrets, tokens and raw sensitive payloads are excluded before serialization.
4. Test representative failures including timeout, cancellation, parse errors, unavailable dependency, partial commit and nested source errors.
5. Add contract tests for public/API mappings and example diagnostic events so error code, severity, retryability and user-safe message stay aligned.

## Validation checklist

- [ ] Errors retain useful causal sources and are not flattened into generic strings too early.
- [ ] Retryability is based on semantics and does not infer safe retry from a generic error type.
- [ ] Logs and API responses have different exposure boundaries and are explicitly redacted.
- [ ] The same root error is not emitted repeatedly at every layer without added context.

## Required output

An error taxonomy, propagation map, redaction checks and contract tests for representative Rust failure paths.

## Boundaries and failure handling

Do not expose internal paths, credentials or raw exception details to untrusted callers; do not label a non-idempotent failure safely retryable.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
