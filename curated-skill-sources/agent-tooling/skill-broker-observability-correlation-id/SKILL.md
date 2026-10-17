---
name: skill-broker-observability-correlation-id
description: "Tracks one broker request across client, index, storage, and adapter logs. Use when diagnosing retrieval inconsistencies."
---

# Skill Broker Observability Correlation ID

## Purpose

request ID policy, service boundaries, log schema, and redaction requirements

## Required inputs

Generate or validate a bounded correlation ID at the request boundary and propagate it through calls.

## Workflow

1. Inspect the current canonical schema, relevant service/client boundary, and target environment before changing behavior.
2. Verify that errors and metrics can be joined by correlation ID without placing secrets or prompt bodies in logs.
3. A traceability report with sample request path and missing propagation points.
4. Exercise positive, negative, unavailable, and malformed cases using test identities and fixture content; record actual outputs separately from expected outcomes.
5. Produce a correlation id is not authorization and must not contain secrets or user prompts. and include exact contracts, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Inputs, outputs, and version assumptions are explicit.
- [ ] A positive path and at least one negative/failure path are tested.
- [ ] Authorization and integrity gates cannot be overridden by query relevance or client claims.
- [ ] Logs and fixtures contain no real credentials or unnecessary private content.
- [ ] Unrun runtime or provider checks are marked blocked/unverified.

## Required output

A correlation ID is not authorization and must not contain secrets or user prompts.

## Boundaries and failure handling

A skill request fails between search and content fetch. When evidence or provider capability is missing, return a structured blocker instead of guessing. Do not execute publish, revoke, deploy, or destructive operations during a read-path test.

## Trigger examples

- **Positive:** The task has no distributed calls or diagnostic logging.
- **Negative:** undefined
