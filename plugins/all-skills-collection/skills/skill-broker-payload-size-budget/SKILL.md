---
name: skill-broker-payload-size-budget
description: "Enforces response size budgets without truncating required instructions. Use when agents request multiple skills or packages exceed context limits."
---

# Skill Broker Payload Size Budget

## Purpose

client context budget, skill sizes, dependency closure, required policy metadata, and retrieval priorities

## Required inputs

Estimate the payload including skill content, dependency metadata, and adapter overhead.

## Workflow

1. Inspect the current canonical schema, relevant service/client boundary, and target environment before changing behavior.
2. Reduce the selection by removing optional candidates or loading references on demand; preserve required safety steps and report omissions.
3. A payload budget report with bytes/tokens estimated, included items, and omissions.
4. Exercise positive, negative, unavailable, and malformed cases using test identities and fixture content; record actual outputs separately from expected outcomes.
5. Produce never truncate the middle or end of safety-critical instructions to meet a size target. and include exact contracts, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Inputs, outputs, and version assumptions are explicit.
- [ ] A positive path and at least one negative/failure path are tested.
- [ ] Authorization and integrity gates cannot be overridden by query relevance or client claims.
- [ ] Logs and fixtures contain no real credentials or unnecessary private content.
- [ ] Unrun runtime or provider checks are marked blocked/unverified.

## Required output

Never truncate the middle or end of safety-critical instructions to meet a size target.

## Boundaries and failure handling

An agent asks for a set of large skills exceeding its available context. When evidence or provider capability is missing, return a structured blocker instead of guessing. Do not execute publish, revoke, deploy, or destructive operations during a read-path test.

## Trigger examples

- **Positive:** The selected single skill already fits within the configured limit.
- **Negative:** undefined
