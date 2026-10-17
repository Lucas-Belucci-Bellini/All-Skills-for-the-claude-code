---
name: skill-broker-request-validation
description: "Validates agent requests before search or skill fetch. Use when a broker accepts structured requests from multiple clients."
---

# Skill Broker Request Validation

## Purpose

request schema, caller identity, payload limits, and current contract version

## Required inputs

Validate schema version, required fields, field types, maximum lengths, and allowed enumerations before querying the registry.

## Workflow

1. Inspect the current canonical schema, relevant service/client boundary, and target environment before changing behavior.
2. Reject malformed, unsupported, oversized, or security-sensitive undeclared fields with normalized error codes.
3. A request validation report with valid/invalid fixtures and exact rejection reasons.
4. Exercise positive, negative, unavailable, and malformed cases using test identities and fixture content; record actual outputs separately from expected outcomes.
5. Produce do not silently coerce a malformed request into a different task or remove required security context. and include exact contracts, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Inputs, outputs, and version assumptions are explicit.
- [ ] A positive path and at least one negative/failure path are tested.
- [ ] Authorization and integrity gates cannot be overridden by query relevance or client claims.
- [ ] Logs and fixtures contain no real credentials or unnecessary private content.
- [ ] Unrun runtime or provider checks are marked blocked/unverified.

## Required output

Do not silently coerce a malformed request into a different task or remove required security context.

## Boundaries and failure handling

A broker endpoint receives a structured skill lookup request. When evidence or provider capability is missing, return a structured blocker instead of guessing. Do not execute publish, revoke, deploy, or destructive operations during a read-path test.

## Trigger examples

- **Positive:** The task is a local answer that makes no broker request.
- **Negative:** undefined
