---
name: skill-broker-exact-id-resolution
description: "Resolves a requested stable skill ID or version unambiguously. Use when agents require deterministic retrieval rather than fuzzy search."
---

# Skill Broker Exact ID Resolution

## Purpose

requested ID/version, aliases, immutable releases, and registry state

## Required inputs

Resolve stable ID and exact version selectors before considering aliases or human-readable names.

## Workflow

1. Inspect the current canonical schema, relevant service/client boundary, and target environment before changing behavior.
2. Return one exact result or a structured missing/ambiguous/revoked status with safe alternatives.
3. An exact-resolution test report with expected versus actual IDs and versions.
4. Exercise positive, negative, unavailable, and malformed cases using test identities and fixture content; record actual outputs separately from expected outcomes.
5. Produce never select the first fuzzy match when an exact id or pinned version was requested. and include exact contracts, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Inputs, outputs, and version assumptions are explicit.
- [ ] A positive path and at least one negative/failure path are tested.
- [ ] Authorization and integrity gates cannot be overridden by query relevance or client claims.
- [ ] Logs and fixtures contain no real credentials or unnecessary private content.
- [ ] Unrun runtime or provider checks are marked blocked/unverified.

## Required output

Never select the first fuzzy match when an exact ID or pinned version was requested.

## Boundaries and failure handling

An agent asks for a known skill ID at a pinned version. When evidence or provider capability is missing, return a structured blocker instead of guessing. Do not execute publish, revoke, deploy, or destructive operations during a read-path test.

## Trigger examples

- **Positive:** An agent asks for broad discovery without a specific identity.
- **Negative:** undefined
