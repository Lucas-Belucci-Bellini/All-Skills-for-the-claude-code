---
name: agent-adapter-connector-timeout-retry
description: "Defines timeout/retry behavior for provider-to-broker calls. Use when network failures cause duplicate or hanging skill requests."
---

# Agent Adapter Connector Timeout and Retry

## Purpose

connector timeout settings, operation type, idempotency key, retryable errors, and end-to-end deadline

## Required inputs

Map errors to retryable, terminal, or human-action states and define a bounded end-to-end deadline.

## Workflow

1. Identify the exact target provider/version, package or connection path, and relevant official contract before relying on platform behavior.
2. Test timeout-before-response and timeout-after-server-commit separately for reads and mutations.
3. A retry matrix with timeout budgets, backoff, and side-effect guarantees.
4. Run the positive and negative conformance cases in an isolated environment, recording observed results and any untested capabilities.
5. Produce do not blindly retry state-changing operations that lack idempotency support. with provider/version, evidence, limitations, and the next safe action.

## Validation checklist

- [ ] Tested provider and environment versions are recorded.
- [ ] Supported, unsupported, and unverified capabilities are distinguishable.
- [ ] At least one success path and one negative or failure path are covered.
- [ ] Private data and credentials are excluded from fixture output.
- [ ] No compatibility claim exceeds the evidence from the target environment.

## Required output

Do not blindly retry state-changing operations that lack idempotency support.

## Boundaries and failure handling

An agent repeats a broker request after an HTTP timeout. If official documentation, workspace settings, or runtime evidence are unavailable, state the blocker and do not present integration as complete.

## Trigger examples

- **Positive:** The task is purely local and has no connector/network operation.
- **Negative:** undefined
