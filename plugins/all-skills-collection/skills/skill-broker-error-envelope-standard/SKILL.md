---
name: skill-broker-error-envelope-standard
description: "Standardizes broker error responses across adapters. Use when different agents need consistent handling of missing, denied, stale, or invalid requests."
---

# Skill Broker Error Envelope Standard

## Purpose

endpoint errors, status taxonomy, adapter mappings, and diagnostic privacy policy

## Required inputs

Define stable error codes, safe human messages, retryability, correlation ID, and optional remediation metadata.

## Workflow

1. Inspect the current canonical schema, relevant service/client boundary, and target environment before changing behavior.
2. Map provider-specific errors to the canonical envelope while retaining internal causes only in protected logs.
3. An error schema and mapping table with positive/negative fixtures.
4. Exercise positive, negative, unavailable, and malformed cases using test identities and fixture content; record actual outputs separately from expected outcomes.
5. Produce do not expose private registry existence, credentials, stack traces, or internal urls to unauthorized callers. and include exact contracts, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Inputs, outputs, and version assumptions are explicit.
- [ ] A positive path and at least one negative/failure path are tested.
- [ ] Authorization and integrity gates cannot be overridden by query relevance or client claims.
- [ ] Logs and fixtures contain no real credentials or unnecessary private content.
- [ ] Unrun runtime or provider checks are marked blocked/unverified.

## Required output

Do not expose private registry existence, credentials, stack traces, or internal URLs to unauthorized callers.

## Boundaries and failure handling

Codex and Claude adapters need to distinguish no match from access denied. When evidence or provider capability is missing, return a structured blocker instead of guessing. Do not execute publish, revoke, deploy, or destructive operations during a read-path test.

## Trigger examples

- **Positive:** A one-off local skill returns a simple human-readable message without an API contract.
- **Negative:** undefined
