---
name: skill-broker-readonly-safe-defaults
description: "Defines default behavior for discovery clients that only need to retrieve skills. Use when adding new agents or integrations."
---

# Skill Broker Read-Only Safe Defaults

## Purpose

API surface, client roles, endpoint effects, and permission policy

## Required inputs

Classify all operations as read, propose, approve, publish, revoke, or administer.

## Workflow

1. Inspect the current canonical schema, relevant service/client boundary, and target environment before changing behavior.
2. Default new adapters to retrieval-only scope and require explicit elevation for proposal or release operations.
3. A permissions table and tests proving read-only clients cannot mutate registry state.
4. Exercise positive, negative, unavailable, and malformed cases using test identities and fixture content; record actual outputs separately from expected outcomes.
5. Produce never make write/publish permission a side effect of connecting an agent. and include exact contracts, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Inputs, outputs, and version assumptions are explicit.
- [ ] A positive path and at least one negative/failure path are tested.
- [ ] Authorization and integrity gates cannot be overridden by query relevance or client claims.
- [ ] Logs and fixtures contain no real credentials or unnecessary private content.
- [ ] Unrun runtime or provider checks are marked blocked/unverified.

## Required output

Never make write/publish permission a side effect of connecting an agent.

## Boundaries and failure handling

A new adapter only needs to search and fetch approved skills. When evidence or provider capability is missing, return a structured blocker instead of guessing. Do not execute publish, revoke, deploy, or destructive operations during a read-path test.

## Trigger examples

- **Positive:** A trusted release service has a separately authorized publish operation.
- **Negative:** undefined
