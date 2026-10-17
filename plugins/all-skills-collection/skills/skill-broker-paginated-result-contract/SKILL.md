---
name: skill-broker-paginated-result-contract
description: "Defines deterministic pagination for large skill searches. Use when registry results exceed one response page."
---

# Skill Broker Paginated Result Contract

## Purpose

query filters, stable ordering key, cursor format, catalog version, and page size limits

## Required inputs

Specify cursor contents and ordering so the same catalog snapshot has stable page boundaries.

## Workflow

1. Inspect the current canonical schema, relevant service/client boundary, and target environment before changing behavior.
2. Test cursor reuse, invalid cursors, concurrent catalog changes, duplicate/missing entries, and maximum page sizes.
3. A pagination contract and fixture suite showing stable traversal behavior.
4. Exercise positive, negative, unavailable, and malformed cases using test identities and fixture content; record actual outputs separately from expected outcomes.
5. Produce do not allow a cursor to expose cross-tenant data or bypass query filters. and include exact contracts, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Inputs, outputs, and version assumptions are explicit.
- [ ] A positive path and at least one negative/failure path are tested.
- [ ] Authorization and integrity gates cannot be overridden by query relevance or client claims.
- [ ] Logs and fixtures contain no real credentials or unnecessary private content.
- [ ] Unrun runtime or provider checks are marked blocked/unverified.

## Required output

Do not allow a cursor to expose cross-tenant data or bypass query filters.

## Boundaries and failure handling

A registry search returns hundreds of candidate skills. When evidence or provider capability is missing, return a structured blocker instead of guessing. Do not execute publish, revoke, deploy, or destructive operations during a read-path test.

## Trigger examples

- **Positive:** The query returns one exact skill and pagination is unnecessary.
- **Negative:** undefined
