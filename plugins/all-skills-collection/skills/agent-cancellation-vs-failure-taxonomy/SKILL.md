---
name: agent-cancellation-vs-failure-taxonomy
description: "Separates requested cancellation, deadline expiry, policy stop, worker loss, and execution failure. Use when retries and user-facing reports depend on why a run stopped."
---

# Agent Cancellation versus Failure Taxonomy

## Purpose

Make stop reasons actionable for retry, billing, compensation, and clear user reporting.

## Required inputs

Run events, stop initiators, deadline policy, error classes, worker liveness, and recovery rules.

## Workflow

1. Define distinct terminal reasons for user cancellation, policy denial, deadline, provider cancellation, worker loss, validation failure, and execution error.
2. Record initiator, attempt, sequence, and whether the worker acknowledged the stop request.
3. Separate the coordinator stopping its wait from evidence that the underlying work terminated.
4. Map each reason to retry eligibility, compensation need, and user-facing status.
5. Prevent retries after intentional cancellation unless a new authorization starts a new attempt.
6. Test races among success, cancellation, timeout, policy denial, and ambiguous remote outcomes.

## Validation checklist

- [ ] Cancellation, timeout, policy stop, and failure are distinct values.
- [ ] Stop initiator and acknowledgment evidence are preserved.
- [ ] Unknown remote execution is not called terminated.
- [ ] Retry and compensation rules depend on the reason.
- [ ] User-facing status matches observed evidence.

## Required output

A terminal-reason enum, recovery matrix, race fixtures, and status mapping.

## Boundaries and failure handling

Providers may collapse stop reasons; preserve original codes and mark normalization uncertain where necessary.

## Trigger examples

- **Positive:** A user cancels a workflow while a remote child call may still run.
- **Negative:** A synchronous local validation has one explicit response.
