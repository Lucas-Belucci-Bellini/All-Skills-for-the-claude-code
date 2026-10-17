---
name: skill-broker-request-timeout-contract
description: "Sets deadline behavior for search, fetch, indexing, and proposal requests. Use when agents retry because broker operations hang."
---

# Skill Broker Request Timeout Contract

## Purpose

operation class, end-to-end deadline, client timeout, server timeouts, and retry semantics

## Required inputs

Allocate one end-to-end deadline across queue, search, storage, and serialization rather than independent unbounded waits.

## Workflow

1. Inspect the current canonical schema, relevant service/client boundary, and target environment before changing behavior.
2. Return normalized timeout status and define whether the client may safely retry each operation.
3. A timeout budget by operation class with failure fixtures and retry conditions.
4. Exercise positive, negative, unavailable, and malformed cases using test identities and fixture content; record actual outputs separately from expected outcomes.
5. Produce do not retry state-changing requests blindly when the client cannot tell whether the original completed. and include exact contracts, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Inputs, outputs, and version assumptions are explicit.
- [ ] A positive path and at least one negative/failure path are tested.
- [ ] Authorization and integrity gates cannot be overridden by query relevance or client claims.
- [ ] Logs and fixtures contain no real credentials or unnecessary private content.
- [ ] Unrun runtime or provider checks are marked blocked/unverified.

## Required output

Do not retry state-changing requests blindly when the client cannot tell whether the original completed.

## Boundaries and failure handling

A broker fetch hangs and the agent needs a bounded failure response. When evidence or provider capability is missing, return a structured blocker instead of guessing. Do not execute publish, revoke, deploy, or destructive operations during a read-path test.

## Trigger examples

- **Positive:** The task uses only local file reads with no remote operation.
- **Negative:** undefined
