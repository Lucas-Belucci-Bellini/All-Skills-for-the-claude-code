---
name: skill-broker-version-negotiation
description: "Negotiates a skill version supported by the requesting agent and project policy. Use when adapters expose different metadata or runtime capabilities."
---

# Skill Broker Version Negotiation

## Purpose

client capability declaration, skill version set, compatibility ranges, and project pin policy

## Required inputs

Resolve exact pins first, then allowed compatibility ranges, then policy-approved latest only when explicitly permitted.

## Workflow

1. Inspect the current canonical schema, relevant service/client boundary, and target environment before changing behavior.
2. Return the selected version and reason, or a structured incompatibility with alternatives.
3. A negotiation report showing requested range, available versions, selected result, and constraints.
4. Exercise positive, negative, unavailable, and malformed cases using test identities and fixture content; record actual outputs separately from expected outcomes.
5. Produce do not silently widen a pinned version range to force a match. and include exact contracts, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Inputs, outputs, and version assumptions are explicit.
- [ ] A positive path and at least one negative/failure path are tested.
- [ ] Authorization and integrity gates cannot be overridden by query relevance or client claims.
- [ ] Logs and fixtures contain no real credentials or unnecessary private content.
- [ ] Unrun runtime or provider checks are marked blocked/unverified.

## Required output

Do not silently widen a pinned version range to force a match.

## Boundaries and failure handling

An older agent cannot load the newest skill package format. When evidence or provider capability is missing, return a structured blocker instead of guessing. Do not execute publish, revoke, deploy, or destructive operations during a read-path test.

## Trigger examples

- **Positive:** The client and project already pin one exact known-compatible version.
- **Negative:** undefined
